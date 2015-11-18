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
      if(app.window){
          WinSettingsActionCreators.showWindow(app.window);
          return;
      }
      if(app.windows){
          for(var w in app.windows){
              var _window = app.windows[w];
              _window.id = w;
              WinSettingsActionCreators.showWindow(app.windows[w]);
              break;
          }
          return;
      } 
      WinSettingsActionCreators.openWindow(app);
  },
  render: function() {
        var taskStyle = {width:this.state.display.width}
        var order = -1;
        if(this.state.buttons.length==0){
            return (<div style={taskStyle}></div>);
        }
        var handleClick = this.handleClick;
        return (
            <div className="taskbar-buttons" style={taskStyle}>
                {
                    this.state.buttons.map(function(result) {
                        order+=1;
                        return <TaskBarButton key={ result.id }  order={order} button={result} onClick={handleClick} />;
                    })
                }
            </div>
        );
  }
});
module.exports = TaskBarButtons;