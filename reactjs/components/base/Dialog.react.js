var React = require('react');
// BaseView
var  Dialog = React.createClass({
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
                cursor:"pointer",
                borderRadius:"3px",
                backgroundColor:"rgba(0,120,240,0.5)",
                zIndex:999,
                position:"absolute",
                width:this.state.display.width,
                height:this.state.display.height,
                padding:"10px",
                border:"1px solid #333",
                boxShadow:"inset 0px 0px 3px #fff",
                overflow:"hidden"
            };
            parentStyle[this.props.where[0]] = this.props.position.y;
            parentStyle[this.props.where[1]] = this.props.position.x;
            var contentStyle = {
                backgroundColor:"#fff",
                width:this.state.display.width,
                height:this.state.display.height,
                border:"1px solid #666",
                boxShadow:"0px 0px 3px #fff"
            }
            return (
                <div style={parentStyle}>
                    <div style={contentStyle}>
                            {this.props.children}
                    </div>
                </div>
            );
        }
    });
module.exports = Dialog;