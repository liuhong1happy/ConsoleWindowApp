var React = require('react');
var Button = require('../base/Button.react');
var CloseSystemButton = React.createClass({
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
            backgroundColor:"rgba(0,120,240,0.5)",
            width:this.state.display.width,
            height:this.state.display.height,
            padding:"0px",
            border:"1px solid #333",
            boxShadow:"inset 0px 0px 3px #fff",
            overflow:"hidden",
            textAlign:"center",
            marginBottom:"10px",
            marginTop:"80px",
            color:"#fff",
            lineHeight:this.state.display.height+"px"
        };
        return (
            <Button style={parentStyle} >
                {this.state.content}
            </Button>
        );
    }
});
module.exports = CloseSystemButton;