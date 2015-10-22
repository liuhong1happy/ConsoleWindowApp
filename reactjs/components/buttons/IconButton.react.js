var React = require('react');
var Button = require('../base/Button.react');
var HoverMixin = require('../mixins/HoverMixin.react');
var IconButton = React.createClass({
    mixins:[HoverMixin],
    getInitialState: function() {
        return { 
            size:32,
            display:{
                height:this.props.height?this.props.height:36,
                width:this.props.width?this.props.width:200
            },
            image:this.props.image?this.props.image:"images/winlogo.png",
            name:this.props.name?this.props.name:"windows 7"
        };
    },
    render: function() {
        var parentStyle = {
            cursor:"pointer",
            borderRadius:"5px",
            backgroundColor:this.state.hover?"rgba(0,120,240,0.3)":"transparent",
            width:this.state.display.width-4,
            height:this.state.display.height,
            padding:"0px",
            border:this.state.hover?"1px solid rgba(0,120,240,0.7)":"1px solid transparent",
            boxShadow:this.state.hover?"inset 0px 0px 30px rgba(0,120,240,0.1), 0px 0px 3px rgba(0,120,240,0.3)":"",
            overflow:"hidden",
            marginBottom:"5px",
            color:"#fff",
            margin:"2px",
            lineHeight:this.state.display.height+"px"
        };
        var pStyle={
            margin:"0px",
            verticalAlign:"middle",
            color:"#000",
            padding:"0px 5px"
        }
        var imgStyle={
            verticalAlign:"middle",
            width:this.state.size,
            height:this.state.size
        }
        return (
            <Button style={parentStyle} 
                        onMouseEnter={this.handleHover}
                        onMouseLeave={this.handleUnhover} 
                        onClick={this.props.onClick}
            >
                <p style={pStyle}>
                    <img src={this.state.image} style={imgStyle} />
                    <span style={pStyle}>{this.state.name}</span>
                </p>
            </Button>
        );
    }
});
module.exports = IconButton;