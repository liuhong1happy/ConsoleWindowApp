var React = require('react');
var WinSettingsStore = require('../../stores/WinSettingsStore');
var WinSettingsActionCreators = require('../../actions/WinSettingsActionCreators');

var StartMenu = React.createClass({
    getInitialState: function() {
        return { 
            button:WinSettingsStore.getStartMenu(),
            display:{
                height:46,
                width:57
            }
        };
    },
    handleClick:function(){
        var _window = WinSettingsStore.getWindowById(this.state.button.window.id);
        WinSettingsActionCreators.toggleWindow(_window);
    },
    render: function() {
        var defaultStyle = {
            height:this.props.height?this.props.height : this.state.display.height,
            width:this.props.width?this.props.width:this.state.display.width, 
            backgroundImage:"url("+this.state.button.image+")",
            backgroundPosition:this.state.hover?"0 -114px":"0 -6px",
            position:"absolute",
            left:"0",
            bottom:"0",
            cursor:"pointer"
        };
        return (
            <div  

            style={defaultStyle} 
                      onClick={this.handleClick}
            >
            </div>
        );
    }
});
module.exports = StartMenu;