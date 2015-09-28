var React = require('react');
var Button = require('../base/Button.react');
// View
var StartMenuButton = React.createClass({
    getInitialState: function() {
        return { 
            hover:false,
            display:{
                height:this.props.height?this.props.height:30,
                width:this.props.width?this.props.width:140
            },
            content:this.props.name
        };
    },
    handleHover: function() {
        this.setState({hover: true});
    },
    handleUnhover: function() {
        this.setState({hover: false});
    },
    render: function() {
        var parentStyle = {
            cursor:"pointer",
            borderRadius:"5px",
            backgroundColor:this.state.hover?"rgba(255,255,255,0.1)":"transparent",
            width:this.state.display.width,
            height:this.state.display.height,
            padding:"0px",
            border:this.state.hover?"1px solid #333":"1px solid transparent",
            boxShadow:this.state.hover?"inset 0px 0px 3px #fff":"",
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