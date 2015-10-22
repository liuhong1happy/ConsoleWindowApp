var React = require('react');
var Button = require('../base/Button.react');
var CloseSystemButton = React.createClass({
    getInitialState: function() {
        return { 
            content:this.props.name
        };
    },
    render: function() {
        return (
            <Button  className="btn btn-start-menu btn-close-system" onClick={this.props.onClick}>
                {this.state.content}
            </Button>
        );
    }
});
module.exports = CloseSystemButton;