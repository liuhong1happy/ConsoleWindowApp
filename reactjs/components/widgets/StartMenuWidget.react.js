var React = require('react');
var Widget = require('../base/Widget.react');
var WinSettingsStore = require('../../stores/WinSettingsStore');
var CloseSystemButton = require('../buttons/CloseSystemButton.react');
var StartMenuButton = require('../buttons/StartMenuButton.react');
var IconButton = require('../buttons/IconButton.react');
var Splitter = require('../base/Splitter.react');
var WinSettingsActionCreators = require('../../actions/WinSettingsActionCreators')
var StartMenuWidget = React.createClass({
    getInitialState: function() {
        return { 
            buttons: WinSettingsStore.getStartMenuButtons(),
            apps:WinSettingsStore.getStartMenuBars(),
            display:{
                height:this.props.height?this.props.height:540,
                width:this.props.width?this.props.width:440
            },
            position:{
                x:0,
                y:0
            },
            where:this.props.where?this.props.where:["bottom","left"]
        };
    },
    handleClick:function(app_id){
      var app = WinSettingsStore.getAppById(app_id);
      if(app) WinSettingsActionCreators.openWindow(app);
    },
    render: function() {
        var parentStyle = { width:this.state.display.width, height:this.state.display.height, display:this.props.show?"inline-block":"none"};
        parentStyle[this.props.where[0]] = this.props.position.y;
        parentStyle[this.props.where[1]] = this.props.position.x;
        var handleClick =  this.handleClick;
        var supportButtons = {
            "StartMenuButton":StartMenuButton,
            "CloseSystemButton":CloseSystemButton,
            "Splitter":Splitter
        }
        
        return (
            <div className="widget-startmenu" style={parentStyle}>
                <div className="icon-buttons">
                        {
                            this.state.apps.map(function(result) {     
                                return React.createElement(
                                       IconButton,  {
                                            where:result.where,
                                            height:36,
                                            size:32,
                                            width:282,
                                            key:result.id,
                                            app_id:result.id,
                                            name:result.name,
                                            image:result.image,
                                            onClick:handleClick
                                        },  null
                                );
                            })
                        }
                </div>
                <div className="startmenu-buttons">
                        {
                            this.state.buttons.map(function(result) {
                                var name = result.name;
                                return React.createElement(
                                        supportButtons[result.render],  {
                                            where:result.where,
                                            height:result.height,
                                            width:result.width,
                                            key:result.id,
                                            app_id:result.id,
                                            name:name,
                                            onClick:handleClick
                                        },  null
                                );
                            })
                        }
                </div>
                <Widget where={["bottom","left"]} position={{x:340,y:520}} width="64" height="64" >
                    <img src="static/images/user.png" />
                </Widget>
            </div>
        );
    }
});
module.exports = StartMenuWidget;