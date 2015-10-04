var React = require('react');
var WinSettingsStore = require('../../stores/WinSettingsStore');
var TaskBarButton = require('../buttons/TaskbarButton.react');
var WinAppConstants = require('../../constants/WinAppConstants');

var TaskBarButtons = React.createClass({
  getInitialState: function() {
    return { 
        buttons:WinSettingsStore.getTaskBars(),
        display:{
            height:46,
            width:1920-57
        },
        position:{
            bottom:0,
            left:57
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
    this.setState({buttons:WinSettingsStore.getTaskBars()});
  },
  render: function() {
        var taskStyle = {
            height:this.state.display.height,
            width:this.state.display.width,
            position:"absolute",
            left:this.state.position.left,
            bottom:this.state.position.bottom
        }
        var order = -1;
        if(this.state.buttons.length==0){
            return (<div style={taskStyle}></div>);
        }
        return (
            <div style={taskStyle}>
                {
                    this.state.buttons.map(function(result) {
                        order+=1;
                        return <TaskBarButton key={ result.id }  order={order} button={result} />;
                    })
                }
            </div>
        );
  }
});
module.exports = TaskBarButtons;