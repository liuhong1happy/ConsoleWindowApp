var React = require('react');
var DesktopButtons = require('./DesktopButtons.react');
var Windows = require('./Windows.react');
var SnapShots = require('./SnapShots.react');

var Desktop = React.createClass({
  getInitialState: function() {
    return { 
        display:{
            height:1080-46,
            width:1920
        },
        position:{
            bottom:50,
            left:0
        }
    };
  },
  render: function() {
        var divStyle = {
            height:this.props.height?this.props.height : this.state.display.height,
            width:this.props.width?this.props.width:this.state.display.width, 
            position:"absolute",
            left:"0",
            top:"0"
        }
        return (
            <div style={divStyle}>
                <DesktopButtons height={this.state.display.height} width={this.state.display.width} />
                <Windows height={this.state.display.height} width={this.state.display.width} />
                <SnapShots />
            </div>
        );
  }
});
module.exports = Desktop;