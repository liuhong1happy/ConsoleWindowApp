var React = require('react');
var StartMenu = require('../buttons/StartMenu.react');
var TaskBarButtons = require('./TaskbarButtons.react');
var TaskBar  = React.createClass({
  render: function() {
        return (
            <div className="taskbar">
                <StartMenu />
                <TaskBarButtons />
            </div>
        );
  }
});
module.exports = TaskBar;