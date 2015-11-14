var React = require('react');
var Button = require('../base/Button.react');
var StartMenuButton = React.createClass({
    getInitialState: function() {
        return { 
            content:this.props.name,
            app_id:this.props.app_id?this.props.app_id:""
        };
    },
    handleClick:function(){
        if(this.props.onClick){
            this.props.onClick(this.state.app_id);
        }
    },
    render: function() {
        var pStyle={
            margin:"0px",
            paddingLeft:"10px"
        }
        return (
            <Button className="btn btn-start-menu"  onClick={this.handleClick}>
                <p style={pStyle}>{this.state.content}</p>
            </Button>
        );
    }
});

module.exports = StartMenuButton;