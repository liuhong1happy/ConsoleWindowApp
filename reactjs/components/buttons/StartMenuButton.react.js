var React = require('react');
var Button = require('../base/Button.react');
var StartMenuButton = React.createClass({
    getInitialState: function() {
        return { 
            content:this.props.name
        };
    },
    render: function() {
        var pStyle={
            margin:"0px",
            paddingLeft:"10px"
        }
        return (
            <Button className="btn btn-start-menu"  onClick={this.props.onClick}>
                <p style={pStyle}>{this.state.content}</p>
            </Button>
        );
    }
});

module.exports = StartMenuButton;