var React = require('react');
var IconButton = React.createClass({
    getInitialState: function() {
        return { 
            hover:false,
            size:32,
            display:{
                height:this.props.height?this.props.height:36,
                width:this.props.width?this.props.width:200
            },
            image:this.props.image?this.props.image:"images/winlogo.png",
            name:this.props.name?this.props.name:"windows 7"
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