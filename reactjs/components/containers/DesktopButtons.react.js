var React = require('react');
var WinSettingsStore = require('../../stores/WinSettingsStore');
var DesktopButton = require('../buttons/DesktopButton.react');
var DesktopButtons = React.createClass({
  getInitialState: function() {
    return { 
        buttons:WinSettingsStore.getDesktopBars(),
        display:{
            height:1080-46,
            width:1920
        }
    };
  },
  render: function() {
        var taskStyle = {
            height:this.props.height?this.props.height : this.state.display.height,
            width:this.props.width?this.props.width:this.state.display.width, 
            position:"absolute",
            left:"0",
            top:"0",
            margin:"0px",
            padding:"0px"
        }
        var order = -1;
        var parentWidth=this.state.display.width;
        var parentHeight=this.state.display.height;
        return (
            <ul style={taskStyle}>
                {
                    this.state.buttons.map(function(result) {
                        order+=1;
                        return <DesktopButton parentWidth={parentWidth}
                                parentHeight={parentHeight}
                                key={ result.id }  order={order} button={result} />;
                    })
                }
            </ul>
        );
  }
}); 
module.exports = DesktopButtons;