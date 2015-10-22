var React = require('react');
var Button = require('../base/Button.react');
var HoverMixin = require('../mixins/HoverMixin.react');
var CloseSystemButton = React.createClass({
    mixins:[HoverMixin],
    getInitialState: function() {
        return { 
            display:{
                height:this.props.height?this.props.height:24,
                width:this.props.width?this.props.width:100
            },
            content:this.props.name
        };
    },
    render: function() {
        var parentStyle = {
            cursor:"pointer",
            borderRadius:"5px",
            background:"linear-gradient(rgba(240,240,240,0.3) 0%,rgba(240,240,240,0.3) 45%,rgba(0,120,240,1) 46%,rgba(0,120,240,0.7) 96%,rgba(240,240,240,0.4) 100%)",
            width:this.state.display.width,
            height:this.state.display.height,
            padding:"0px",
            border:"1px solid #333",
            boxShadow:this.state.hover?"inset 0px 0px 20px #fff,0px 0px 3px #fff":"inset 0px 0px 3px #fff,0px 0px 3px #fff",
            overflow:"hidden",
            textAlign:"center",
            marginBottom:"10px",
            marginTop:"80px",
            color:"#fff",
            lineHeight:this.state.display.height+"px"
        };
        return (
            <Button style={parentStyle} 
                        onMouseEnter={this.handleHover}
                        onMouseLeave={this.handleUnhover} 
                        onClick={this.props.onClick}
            >
                {this.state.content}
            </Button>
        );
    }
});
module.exports = CloseSystemButton;