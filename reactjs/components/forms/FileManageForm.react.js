
var React = require('react');
var FileManageStore = require('../../stores/FileManageStore');
var FileManageActionCreators = require('../../actions/FileManageActionCreators');

var FileManageForm = React.createClass({
    getInitialState:function(){
        return {
            FileSystemTree:FileManageStore.getFileSystemTree(),
            FavoriteTree:FileManageStore.getFavoriteTree()
        };
    },
    genFileTree:function(){
        var tree = this.state.FileSystemTree,favorite = this.state.FavoriteTree;
        var root = {
            name:"Root",label:"文件系统",image:"",type:"root",children:[
                {
                    name:"Favorite",label:"收藏夹",image:"/static/images/store.ico",type:"favorite",children:favorite,
                }
            ]
        }
        root.children = root.children.concat([tree]);
        var   genTree = function(root){
            var imgStyle = {
                    "backgroundImage":"url("+root.image+")",
            }    
            if(root.children){
                    return (<div className={"tree-root "+root.type}>
                            <div className="tree-name">
                                <span className="toggle-show"></span>
                                <span className="tree-img" style={imgStyle}></span>
                                <span>{root.label}</span>
                            </div>
                            <div className="tree-children">
                            {
                                root.children.map(function(ele){
                                    var tree = genTree(ele);
                                    return tree;
                                })
                            }
                            </div>
                    </div>)
            }else{
                return (<div className={root.name}>
                                <div className="tree-name">
                                    <span className="toggle-show"></span>
                                    <span className="tree-img" style={imgStyle}></span>
                                    <span>{root.label}</span>
                                </div>
                        </div>)
            }
        };
        
        var imgStyle = {
                "width":"22px",
                "height":"22px",
                "backgroundImage":"url("+root.image+")",
                "display": "inline-block",
                "backgroundSize": "cover"
        }                
        return (<div className={root.type}>
                            {
                                root.children.map(function(ele){
                                    var tree = genTree(ele);
                                    return tree;
                                })
                            }
                    </div>)
    },
    render: function() {
        
        var fileTree = this.genFileTree();
        
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
