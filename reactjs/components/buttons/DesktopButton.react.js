var React = require('react');
var HoverMixin = require('../mixins/HoverMixin.react');
var DesktopButton = React.createClass({
    mixins:[HoverMixin],
    getInitialState: function() {
        return { 
            button:this.props.button,
            order:this.props.order,
            background:{
                color:"rgba(0,120,240,0.5)"
            },
            display:{
                height:this.props.height?this.props.height:100,
                width:this.props.width?this.props.width:80
            }
        };
    },
    render: function() {
        var order = this.state.order;
        var grid = {
                row: parseInt(this.props.parentHeight/this.state.display.height),
                col: parseInt(this.props.parentWidth/this.state.display.width)
        };
        var position = {
            left: parseInt(order/grid.row)*this.state.display.width,
            top: (order%grid.row)*this.state.display.height
        };
        var liStyle = {
            height:this.state.display.height,
            width:this.state.display.width,
            position:"absolute",
            left:position.left,
            top:position.top,
            zIndex:1
        };
        var divStyle = {
            margin:"10px 4px",
            cursor:"pointer",
            borderRadius:"3px",
            backgroundColor:this.state.hover?"rgba(255,255,255,0.4)":"transparent",
            border:this.state.hover?"2px solid rgba(255,255,255,0.4)":"2px solid transparent"
        };
        var pStyle={
            margin:"0px",
            padding:"0px",
            textAlign:"center",
            width:"100%",
            color:"#fff",
            marginTop:"5px",
            fontSize:"12px"
        };
        var imgStyle={
            width:40,
            height:40,
            margin:"0px 14px",
            backgroundImage:"url("+this.state.button.image+")",
            backgroundRepeat:"no-repeat",
            backgroundSize:"100% 100%"
        };
        return (
            <li style={liStyle}>
                <div style={divStyle}
                        onMouseEnter={this.handleHover}
                        onMouseLeave={this.handleUnhover} >
                    <div style={imgStyle}></div>
                    <div style={pStyle}>{this.state.button.name}</div>
                </div>
            </li>
        );
    }
}); 
module.exports = DesktopButton;