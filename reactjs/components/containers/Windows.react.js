var React = require('react');
var StartMenuWidget = require('../widgets/StartMenuWidget.react');
var WinSettingsStore =require('../../stores/WinSettingsStore');
var Widget = require('../base/Widget.react');
var Window = require('../base/Window.react');
var Windows = React.createClass({
  getInitialState: function() {
    return { 
        windows:WinSettingsStore.getWindows(),
        display:{
            height:1080-46,
            width:1920
        }
    };
  },
  render: function() {
        var divStyle = {
            width:"100%",
            height:"100%"
        };
        return (
            <div style={divStyle}>
                {
                    this.state.windows.map(function(result) {
                        var content = result.content;
                        var Child = result.content?React.createElement(content.render, content.config, content.children):null;
                        if(result.render=="StartMenuWidget") result.render=StartMenuWidget;
                        if(result.render=="Widget") result.render=Widget;
                        if(result.render=="Window") result.render=Window;
                        return React.createElement(
                                result.render,  {position:result.position,where:result.where,height:result.height,width:result.width,key:result.id},  Child
                        );
                    })
                }
            </div>
        );
  }
});
module.exports = Windows;