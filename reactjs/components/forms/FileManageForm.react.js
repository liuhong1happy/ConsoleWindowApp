
var React = require('react');
var FileManageStore = require('../../stores/FileManageStore');
var FileManageActionCreators = require('../../actions/FileManageActionCreators');

var TreeView = require('../base/TreeView.react');

var FileManageForm = React.createClass({
    getInitialState:function(){
        return {
            FileSystemTree:FileManageStore.getFileSystemTree(),
            FavoriteTree:FileManageStore.getFavoriteTree(),
            lastActive:null,
            curActive:null
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
            curActive:curActive
        })
        console.log(target);
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
    render: function() {
        var root = this.getTreeData();
        var fileTree = this.genFileTree(root);
        
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
                            <div className="dir-content"></div>
                    </div>
                    <div className="statusbar">
                    </div>
                </div>
        );
  }
});
module.exports = FileManageForm;
