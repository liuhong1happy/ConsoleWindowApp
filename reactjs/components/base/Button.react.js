var React = require("react")
var Button = React.createClass({
        getInitialState: function() {
            return { 
                style:{
                    cursor:"pointer",
                    borderRadius:"10px",
                    background:"linear-gradient(rgba(0,120,240,0.4) 0%,rgba(0,120,240,0.3) 40%,rgba(0,120,240,0.6) 41%,rgba(0,120,240,0.3) 100%)",
                    height:30,
                    width:120,
                    padding:"10px",
                    border:"1px solid #333",
                    boxShadow:"inset 0px 0px 3px #fff,0px 0px 3px #fff",
                    overflow:"hidden",
                    color:"#fff",
                    lineHeight:"30px",
                    fontSize:"12px"
                }
            };
        },
        render: function() {
            if(!this.props.style){
                 this.props.style = this.state.style;
            };
            return (
                <div style={this.props.style}  
                    onMouseEnter={this.props.onMouseEnter} 
                    onMouseLeave={this.props.onMouseLeave} 
                    onClick={this.props.onClick}
                >
                            {this.props.children}
                </div>
            );
        }
    });
module.exports = Button;