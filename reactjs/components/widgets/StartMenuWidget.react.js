var React = require('react');
var Widget = require('../base/Widget.react');
var WinSettingsStore = require('../../stores/WinSettingsStore');
var CloseSystemButton = require('../buttons/CloseSystemButton.react');
var StartMenuButton = require('../buttons/StartMenuButton.react');
var IconButton = require('../buttons/IconButton.react');
var Splitter = require('../base/Splitter.react');
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
    handleClick:function(){
        alert("H");
    },
    render: function() {
        var parentStyle = {
            cursor:"pointer",
            borderRadius:"10px 10px 0px 0px",
            backgroundColor:"rgba(0,120,240,0.9)",
            zIndex:1000,
            position:"absolute",
            width:this.state.display.width,
            height:this.state.display.height,
            padding:"10px",
            border:"1px solid #333",
            boxShadow:"inset 0px 0px 3px #fff",
        };
        parentStyle[this.props.where[0]] = this.props.position.y;
        parentStyle[this.props.where[1]] = this.props.position.x;
        var contentStyle = {
            backgroundColor:"#fff",
            width:this.state.display.width*0.6+20,
            height:this.state.display.height,
            border:"1px solid #666",
            boxShadow:"0px 0px 3px #fff",
            display:"inline-block",
            borderRadius:"5px",
            overflow:"hidden"
        };
        var buttonsStyle = {
            backgroundColor:"transparent",
            margin:"0px",
            padding:"10px",
            height:"100%",
            display:"inline-block",
            width:this.state.display.width*0.4-42
        };
        var handleClick =  this.handleClick;
        return (
            <div style={parentStyle}>
                <div style={contentStyle}>
                        {
                            this.state.apps.map(function(result) {     
            
                                return React.createElement(
                                       IconButton,  {
                                            where:result.where,
                                            height:36,
                                            size:32,
                                            width:282,
                                            key:result.id,
                                            name:result.name,
                                            image:result.image,
                                            onClick:handleClick
                                        },  null
                                );
                            })
                        }
                </div>
                <div style={buttonsStyle}>
                        {
                            this.state.buttons.map(function(result) {
                                var name = result.name;
                                if(result.render=="StartMenuButton") result.render=StartMenuButton;
                                if(result.render=="CloseSystemButton") result.render=CloseSystemButton;
                                if(result.render=="Splitter") result.render=Splitter;
                                return React.createElement(
                                        result.render,  {
                                            where:result.where,
                                            height:result.height,
                                            width:result.width,
                                            key:result.id,
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