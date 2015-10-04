var React = require('react');
var WinSettingsStore = require('../../stores/WinSettingsStore');
var DesktopButton = require('../buttons/DesktopButton.react');
var WinAppConstants = require('../../constants/WinAppConstants');
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
  componentDidMount: function() {
    WinSettingsStore.addChangeListener(WinAppConstants.EventTypes.WIN_SETTINS,this._onChange);
  },
  componentWillUnmount: function() {
    WinSettingsStore.removeChangeListener(WinAppConstants.EventTypes.WIN_SETTINS,this._onChange);
  },
  _onChange:function(){
    this.setState({buttons:WinSettingsStore.getDesktopBars()});
  },
  render: function() {
        var buttonStyle = {
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
        if(this.state.buttons.length==0){
            return ( <div style={buttonStyle}></div> );
        }
        return (
            <ul style={buttonStyle}>
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