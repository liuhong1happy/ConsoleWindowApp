
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
    render: function() {

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
                            <div className="dir-tree"></div>
                            <div className="dir-content"></div>
                    </div>
                    <div className="statusbar">
                    </div>
                </div>
        );
  }
});
module.exports = FileManageForm;