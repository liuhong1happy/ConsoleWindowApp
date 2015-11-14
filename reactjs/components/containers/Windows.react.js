var React = require('react');
var StartMenuWidget = require('../widgets/StartMenuWidget.react');
var WinSettingsStore =require('../../stores/WinSettingsStore');
var Widget = require('../base/Widget.react');
var Window = require('../base/Window.react');
var AppManageForm = require('../forms/AppManageForm.react');
var WinAppConstants = require('../../constants/WinAppConstants');
var Windows = React.createClass({
  getInitialState: function() {
    return { 
        windows:WinSettingsStore.getWindows()
    };
  },
  componentDidMount: function() {
        WinSettingsStore.addChangeListener(WinAppConstants.EventTypes.WIN_SETTINS,this._onChange);
        WinSettingsStore.addChangeListener(WinAppConstants.EventTypes.WINDOWS,this._onChange);
  },
  componentWillUnmount: function() {
        WinSettingsStore.removeChangeListener(WinAppConstants.EventTypes.WIN_SETTINS,this._onChange);
        WinSettingsStore.removeChangeListener(WinAppConstants.EventTypes.WINDOWS,this._onChange);
  },
  _onChange:function(){
        this.setState({ 
            windows:WinSettingsStore.getWindows()
        });
    },
  render: function() {
       var supportForm = {
            "iframe":"iframe",
            "AppManageForm":AppManageForm
       };
      var supportWindow = {
          "Window":Window,
          "StartMenuWidget":StartMenuWidget,
          "Widget":Widget
      }

        return (
            <div className="windows-container">
                {
                    this.state.windows.map(function(result) {
                        var content = result.content;
                        var Child = result.content?React.createElement( supportForm[content.render] , content.config, content.children):null;
                        return React.createElement(
                               supportWindow[result.render],  {
                                    position:result.position,
                                    where:result.where,
                                    height:result.height,
                                    width:result.width,
                                    key:result.id,
                                    id:result.id,
                                    show:result.show,
                                    app_id:result.app_id,
                                    image:result.image,
                                    name:result.name,
                                    type:result.type
                                },  Child
                        );
                    })
                }
            </div>
        );
  }
});
module.exports = Windows;