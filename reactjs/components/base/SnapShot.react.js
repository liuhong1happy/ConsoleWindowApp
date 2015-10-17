var React = require('react');
var SnapShot = React.createClass({
    getInitialState: function() {
        return {
            hover:false,
        };
    },
    handleHover: function() {
        this.setState({hover: true});
    },
    handleUnhover: function() {
        this.setState({hover: false});
    },
    handleFocus:function(){
        this.setState({focus: true});
    },
    render: function() {
        return (
            <div>
            </div>
        );
    }
});
module.exports = SnapShot;