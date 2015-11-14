var React = require('react');
var Splitter = React.createClass({
        getInitialState: function() {
            return { 
                color:this.props.color?this.props.color:"rgba(0,0,0,0.2)"
            };
        },
        render: function() {
            var parentStyle = {
                height:"1px",
                border:"0px solid transparent",
                borderTop:"1px solid "+this.state.color,
                backgroundColor: "rgba(255,255,255s,0.3)",
                margin:"0px",
                marginBottom:"5px"
            };
            return (
                <hr style={parentStyle} />
            );
        }
    });
module.exports = Splitter;