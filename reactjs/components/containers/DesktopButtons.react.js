var React = require('react');
var WinSettingsStore = require('../../stores/WinSettingsStore');
var DesktopButton = require('../buttons/DesktopButton.react');
var WinAppConstants = require('../../constants/WinAppConstants');
var WinSettingsActionCreators = require('../../actions/WinSettingsActionCreators');

var DesktopButtons = React.createClass({
  getInitialState: function() {
    return { 
        buttons:WinSettingsStore.getDesktopBars(),
        display:{
            height:this.props.height?this.props.height:1080-46,
            width:this.props.width?this.props.width:1920
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
  handleClick:function(app_id){
      var app = WinSettingsStore.getAppById(app_id);
      if(app) WinSettingsActionCreators.openWindow(app);
  },
  render: function() {
        var order = -1;
        var parentWidth=this.state.display.width;
        var parentHeight=this.state.display.height;
        if(this.state.buttons.length==0){
            return ( <div  className="desktop-buttons"></div> );
        }
       var handleClick =  this.handleClick;
        return (
            <ul  className="desktop-buttons">
                {
                    this.state.buttons.map(function(result) {
                        order+=1;
                        return <DesktopButton parentWidth={parentWidth} parentHeight={parentHeight} key={ result.id }  order={order} button={result} onClick={ handleClick }/>;
                    })
                }
            </ul>
        );
  }
}); 
module.exports = DesktopButtons;