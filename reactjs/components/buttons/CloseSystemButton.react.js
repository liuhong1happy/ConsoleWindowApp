var React = require('react');
var Button = require('../base/Button.react');
var HoverMixin = require('../mixins/HoverMixin.react');
var CloseSystemButton = React.createClass({
    mixins:[HoverMixin],
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