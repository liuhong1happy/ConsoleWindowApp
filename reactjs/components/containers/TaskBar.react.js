var React = require('react');
var StartMenu = require('../buttons/StartMenu.react');
var TaskBarButtons = require('./TaskBarButtons.react');
var TaskBar  = React.createClass({
  getInitialState: function() {
    return { 
        background:{
            color:"rgba(0,120,240,0.5)"
        },
        display:{
            height:46
        }
    };
  },
  render: function() {
        var taskStyle = {
            height:this.state.display.height,
            width:"100%",
            backgroundColor:this.state.background.color,
            position:"absolute",
            left:"0",
            bottom:"0",
            boxShadow:"inset 0px 0px 2px #fff",
            borderTop:"1px solid #333"
        }
        return (
            <div style={taskStyle}>
                <StartMenu />
                <TaskBarButtons />
            </div>
        );
  }
});
module.exports = TaskBar;