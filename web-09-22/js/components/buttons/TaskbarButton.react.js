var React = require('react');
var TaskBarButton = React.createClass({
    getInitialState: function() {
        return { 
            focus:false,
            hover:false,
            order:this.props.order,
            button:this.props.button,
            hoverBackground:"url(images/taskbarhover.png)",
            display:{
                height:41,
                width:57
            },
            position:{
                left:this.props.order*65,
                bottom:3
            }
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
        var divStyle = {
            height:this.state.display.height,
            width:this.state.display.width,
            position:"absolute",
            left:this.state.position.left,
            bottom:this.state.position.bottom,
            cursor:"pointer",
            textAlign:"center",
            backgroundImage:this.state.hover?this.state.hoverBackground:"",
            borderRadius:"0px",
            backgroundColor:"",
        }
        if(this.state.focus){
            divStyle.backgroundImage = "";
            divStyle.borderRadius = "5px";
            divStyle.backgroundColor = this.state.hover?"rgba(255,255,255,0.7)":"rgba(255,255,255,0.4)";
            divStyle.boxShadow=this.state.hover?"inset 0px 0px 3px #fff":"inset 0px -1px 3px #fff";
            divStyle.border = "1px solid rgba(255,255,255,0.4)";
        }
        var imgStyle = {
            margin:"4px 12px",
            width:33,
            height:32
        }
        return (
                <div style={divStyle} 
                      onMouseEnter={this.handleHover}
                      onMouseLeave={this.handleUnhover}
                      onClick={this.handleFocus}
                >
                <img src={this.state.button.image} style={imgStyle} />
            </div>
        );
    }
});
module.exports = TaskBarButton;