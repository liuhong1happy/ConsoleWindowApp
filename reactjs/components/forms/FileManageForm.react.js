
var React = require('react');
var FileManageStore = require('../../stores/WinSettingsStore');
var WinSettingsActionCreators = require('../../actions/WinSettingsActionCreators');

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
            
                </div>
        );
  }
});
module.exports = FileManageForm;
