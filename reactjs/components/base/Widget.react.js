var React = require('react');
var Widget = React.createClass({
        getInitialState: function() {
            return { 
                display:{
                    height:this.props.height?this.props.height:100,
                    width:this.props.width?this.props.width:100
                },
                position:{
                    x:100,
                    y:100
                },
                where:this.props.where?this.props.where:["top","left"]
            };
        },
        render: function() {
            var parentStyle = {
                width:this.state.display.width,
                height:this.state.display.height,
            };
            parentStyle[this.props.where[0]] = this.props.position.y;
            parentStyle[this.props.where[1]] = this.props.position.x;
            var contentStyle = {
                width:this.state.display.width,
                height:this.state.display.height,
            }
            return (
                <div className="win widget" style={parentStyle}>
                    <div className="win-content" style={contentStyle}>
                            {this.props.children}
                    </div>
                </div>
            );
        }
    })
module.exports = Widget;