var React = require('react');
var WinSettingsStore = require('../../stores/WinSettingsStore');
var TaskBarButton = require('../buttons/TaskbarButton.react');
var WinAppConstants = require('../../constants/WinAppConstants');
var WinSettingsActionCreators = require('../../actions/WinSettingsActionCreators');
var TaskBarButtons = React.createClass({
  getInitialState: function() {
    return { 
        buttons:WinSettingsStore.getTaskBars(),
        display:{width:this.props.width?this.props.width:1920-57}
    };
  },
  componentDidMount: function() {
    WinSettingsStore.addChangeListener(WinAppConstants.EventTypes.WIN_SETTINS,this._onChange);
    WinSettingsStore.addChangeListener(WinAppConstants.EventTypes.TASK_BARS,this._onChange);
  },
  componentWillUnmount: function() {
    WinSettingsStore.removeChangeListener(WinAppConstants.EventTypes.WIN_SETTINS,this._onChange);
    WinSettingsStore.removeChangeListener(WinAppConstants.EventTypes.TASK_BARS,this._onChange);
  },
  _onChange:function(){
    this.setState({buttons:WinSettingsStore.getTaskBars()});
  },
  handleClick:function(app_id){
      var app = WinSettingsStore.getAppById(app_id);
      if(app) WinSettingsActionCreators.openWindow(app);
  },
  render: function() {
        var taskStyle = {width:this.state.display.width}
        var order = -1;
        if(this.state.buttons.length==0){
            return (<div style={taskStyle}></div>);
        }
        return (
            <div className="taskbar-buttons" style={taskStyle}>
                {
                    this.state.buttons.map(function(result) {
                        order+=1;
                        return <TaskBarButton key={ result.id }  order={order} button={result} onClick={this.handleClick} />;
                    })
                }
            </div>
        );
  }
});
module.exports = TaskBarButtons;