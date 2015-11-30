
var React = require('react');
var FileManageStore = require('../../stores/FileManageStore');
var FileManageActionCreators = require('../../actions/FileManageActionCreators');
var FileUploadUtils = require('../../utils/FileUploadUtils');

var TreeView = require('../base/TreeView.react');

var DirFileItem = React.createClass({
    handleDoubleClick:function(){
        if(this.props.onDoubleClick){
            this.props.onDoubleClick(this.props.item);
        }
    },
    render:function(){
        var item = this.props.item;
                return (<div className="list-item" onDoubleClick={this.handleDoubleClick}>
                                                            <div className="item-img">
                                                                <img src={item.image} width={80} height={80}/>
                                                            </div>
                                                            <div className="item-label">
                                                                {item.label}
                                                            </div>
                    </div>)
    }
})

var FileManageForm = React.createClass({
    getInitialState:function(){
        return {
            FileSystemTree:FileManageStore.getFileSystemTree(),
            FavoriteTree:FileManageStore.getFavoriteTree(),
            lastActive:null,
            curActive:null,
            targetItem:null,
            statusTool:null
        };
    },
    getTreeData:function(){
        var tree = this.state.FileSystemTree,favorite = this.state.FavoriteTree;
        var root = {
            name:"Root",label:"文件系统",image:"",type:"root",children:[
                {
                    name:"Favorite",label:"收藏夹",image:"/static/images/store.ico",type:"favorite",children:favorite,
                }
            ]
        }
        root.children = root.children.concat([tree]);
        return root;
    },
    handleFocus:function(item,target){
        var lastActive = this.state.curActive;
        var curActive = item;

        this.setState({
            lastActive:lastActive,
            curActive:curActive,
            targetItem:target
        })
    },
    openDir:function(item){
        this.setState({targetItem:item});
    },
    genDirContent:function(){
       var targetItem = this.state.targetItem;
        var openDir = this.openDir;
        if(targetItem && targetItem.children){
            return (<div className="dir-list">
                            {
                                    targetItem.children.map(function(ele){
                                            return (<DirFileItem item={ele} onDoubleClick={openDir} />)
                                    })
                    }
                    </div>)
        }else{
                     return (<div></div>)
        }
    },
    genFileTree:function(root){
        var handleFocus = this.handleFocus,lastActive = this.state.lastActive,curActive = this.state.curActive;
        
        return (<div className={root.type}>
                            {
                                root.children.map(function(ele){
                                    if(lastActive && lastActive.name==ele.name)  ele.active = false;
                                    if(curActive && curActive.name==ele.name) ele.active = true;
                                    return (<TreeView key={ele.name} ref={ele.name} root={ele} active={ele.active} onFocus={handleFocus}/>);
                                })
                            }
                    </div>)
    },
    genStatus:function(){
        var targetItem = this.state.targetItem;
        var statusTool = this.state.statusTool;
        
        if(targetItem){
            if(statusTool){
                    return (<div className="statusbar">
                            <div className="target-item">
                                <div className="item-img">
                                        <img src={targetItem.image} width={40} height={40}/>
                                </div>
                            </div>
                            <div className="progress">
                                    <div className="label">{statusTool.label}</div>
                                    <div className="percent">{statusTool.percent+"%"}</div>
                            </div>
                    </div>)
            }else{
                    return (<div className="statusbar">
                            <div className="target-item">
                                <div className="item-img">
                                        <img src={targetItem.image} width={40} height={40}/>
                                </div>
                                <div className="item-content">
                                    <div className="item-type">{targetItem.type}</div>
                                    <div className="item-label">{targetItem.label}</div>
                                </div>
                            </div>
                    </div>)   
            }
        }else{
            return (<div className="statusbar"></div>)
        }
    },
    handleDragOver:function(e){
        e = e || event;
        e.preventDefault();
    },
    handleDrop:function(e){
        e = e || event;
        e.preventDefault();
        var fileList = e.dataTransfer.files;
        console.log(fileList);
        var _self = this;
        FileUploadUtils.uploadFileList(fileList,function(status,percent){
            _self.setState({
                statusTool:{
                    percent:percent,
                    label:status
                }
            });
        },function(status,filesResult){
            var result = "[";
            for(var i=0;i<filesResult.length;i++){
                var fileRes = filesResult[i];
                result += "{"+fileRes.file.name+":"+fileRes.result+"},";
            }
            result += "]";
            
            _self.setState({
                statusTool:{
                    percent:100,
                    label:status+":"+result
                }
            });
        });
        return false;
    },
    render: function() {
        var root = this.getTreeData();
        var fileTree = this.genFileTree(root);
        var dirContent = this.genDirContent();
        var statusContent = this.genStatus();
        return (
                <div className="filemanage-form">
                    <div className="input-group">
                            <div className="arrow-left">
                                <img src="static/images/arrow_left.png"  />
                            </div>
                            <div className="arrow-right">
                                <img src="static/images/arrow_right.png"  />
                            </div>
                            <div className="nav-input">
                                <img src="static/images/dir.ico"  />
                                <input type="text" />
                            </div>
                            <div className="search-input">
                                        <input type="text" />
                                        <img src="static/images/dir.ico"  />
                            </div>
                    </div>
                    <div className="menu-bar">
                            <div className="menu">文件(F)</div>
                            <div className="menu">编辑(E)</div>
                            <div className="menu">视图(V)</div>
                    </div>
                    <div className="toolbar">
                            <div className="tool-button">属性</div>
                            <div className="tool-button">系统属性</div>
                            <div className="tool-button">控制面板</div>
                    </div>
                    <div className="main-content">
                            <div className="dir-tree">
                                    {fileTree}
                            </div>
                            <div className="dir-content" onDragOver={this.handleDragOver} onDrop={this.handleDrop}>
                                {dirContent}
                            </div>
                    </div>
                    {statusContent}
                </div>
        );
  }
});
module.exports = FileManageForm;