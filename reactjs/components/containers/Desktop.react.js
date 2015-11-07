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
        }
    };
  },
  render: function() {
        var divStyle = {
            height:this.props.height?this.props.height : this.state.display.height,
            width:this.props.width?this.props.width:this.state.display.width, 
        }
        return (
            <div style={divStyle} className="desktop">
                <DesktopButtons height={this.state.display.height} width={this.state.display.width} />
                <Windows height={this.state.display.height} width={this.state.display.width} />
                <SnapShots />
            </div>
        );
  }
});
module.exports = Desktop;