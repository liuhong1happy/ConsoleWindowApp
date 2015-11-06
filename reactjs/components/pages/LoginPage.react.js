var React = require('react');
var LoginForm = require('../forms/LoginForm.react');
var LoginPage = React.createClass({
  getInitialState: function() {
    return { 
        constant:{
           BACK_SIZES:{
               "100%":"100% 100%",
               "cover":"cover",
               "contain":"contain"
           }  
        },
        background:{
            image:"url(static/images/win7bg.jpg)",
            size:"100%"
        },
        display:{
            width:1920,
            height:1080
        },
        taskbar:{
            height:46
        }
    };
  },
  render: function() {
        var desktopStyle = {
            width:this.state.display.width,
            height:this.state.display.height,
            backgroundImage:this.state.background.image,
            backgroundSize:this.state.constant.BACK_SIZES[this.state.background.size],
            backgroundRepeat:"no-repeat",
            position:"absolute",
            left:"0",
            top:"0"
        }
        return (
            <div style={desktopStyle}>
                <LoginForm />
            </div>
        );
  }
});
module.exports = LoginPage;