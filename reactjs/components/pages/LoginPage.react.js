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
            image:"url(static/images/login.png)",
            size:"100%"
        },
        display:{
            width:1920,
            height:1080
        },
        logo:{
            image:"url(static/images/user.png)",
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
        var logoStyle = {
            position:"absolute",
            bottom:"10px",
            left:"0px",
            height:70,
            lineHeight:"70px",
            textAlign:"center",
            width:"100%",
            margin:"0px"
        }
        var imgStyle = {
            width:64,
            height:64,
            backgroundImage:this.state.logo.image,
            display:"inline-block",
            position:"absolute",
            left:this.state.display.width/2-180
        }
        var textStyle = {
            height:48,
            fontSize:"40px",
            lineHeight:"48px",
            color:"#fff",
            fontFamily:"Arial",
            display:"inline-block",
            position:"absolute",
            left:this.state.display.width/2-100,
            bottom:10
        }
        return (
            <div style={desktopStyle}>
                <LoginForm />
                <div style={logoStyle}>
                    <div style={imgStyle}></div>
                    <div style={textStyle }>Windows 7</div>
                </div>
            </div>
        );
  }
});
module.exports = LoginPage;