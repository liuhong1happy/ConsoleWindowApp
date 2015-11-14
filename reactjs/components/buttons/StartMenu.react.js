var React = require('react');
var WinSettingsStore = require('../../stores/WinSettingsStore');
var WinSettingsActionCreators = require('../../actions/WinSettingsActionCreators');

var StartMenu = React.createClass({
    getInitialState: function() {
        return { 
            button:WinSettingsStore.getStartMenu()
        };
    },
    handleClick:function(){
        var _window = WinSettingsStore.getWindowById(this.state.button.window.id);
        WinSettingsActionCreators.toggleWindow(_window);
    },
    render: function() {
        var defaultStyle = { backgroundImage:"url("+this.state.button.image+")"};
        return (
            <div className="startmenu"  style={defaultStyle}  onClick={this.handleClick} >
            </div>
        );
    }
});
module.exports = StartMenu;