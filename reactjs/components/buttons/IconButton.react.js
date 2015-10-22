var React = require('react');
var Button = require('../base/Button.react');
var IconButton = React.createClass({
    getInitialState: function() {
        return { 
            size:32,
            image:this.props.image?this.props.image:"images/winlogo.png",
            name:this.props.name?this.props.name:"windows 7"
        };
    },
    render: function() {
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
            <Button className="btn btn-icon" onClick={this.props.onClick}
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