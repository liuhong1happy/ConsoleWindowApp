var React = require('react');
var Button = require('../base/Button.react');
var HoverMixin = require('../mixins/HoverMixin.react');

var StartMenuButton = React.createClass({
    mixins:[HoverMixin],
    getInitialState: function() {
        return { 
            display:{
                height:this.props.height?this.props.height:30,
                width:this.props.width?this.props.width:140
            },
            content:this.props.name
        };
    },
    render: function() {
        var parentStyle = {
            cursor:"pointer",
            borderRadius:"5px",
            background:this.state.hover?"linear-gradient(rgba(240,240,240,0.3) 0%,rgba(240,240,240,0.3) 45%,rgba(0,120,240,1) 46%,rgba(0,120,240,0.7) 96%,rgba(240,240,240,0.4) 100%)":"transparent",
            width:this.state.display.width,
            height:this.state.display.height,
            padding:"0px",
            border:this.state.hover?"1px solid #333":"1px solid transparent",
            boxShadow:this.state.hover?"inset 0px 0px 3px #fff,0px 0px 3px #fff":"",
            overflow:"hidden",
            marginBottom:"5px",
            color:"#fff",
            lineHeight:this.state.display.height+"px"
        };
        var pStyle={
            margin:"0px",
            paddingLeft:"10px"
        }
        return (
            <Button style={parentStyle} 
                        onMouseEnter={this.handleHover}
                        onMouseLeave={this.handleUnhover} 
                        onClick={this.props.onClick}
            >
                <p style={pStyle}>{this.state.content}</p>
            </Button>
        );
    }
});

module.exports = StartMenuButton;