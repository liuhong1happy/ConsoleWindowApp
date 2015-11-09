var React = require('react');
var Button = require('../base/Button.react');
var WinSettingsActionCreators = require('../../actions/WinSettingsActionCreators');
var WinAppWebApiUtils = require('../../utils/WinAppWebApiUtils');

var LoginForm = React.createClass({
  getInitialState: function() {
    return { 
        submit:{
           image :"static/images/arrow_right.png"
        },
        user:{
           image :"static/images/user.png"
        }
    };
  },
  handleKeyPress:function(e){
    e = e || event;
    var keyCode = e.keyCode ||  e.which;
    if(keyCode==13){
      this.submitLoginForm();
      return false; 
    }
  },
  submitLoginForm:function(){
      var $password = this.refs.password.getDOMNode();
      
      WinAppWebApiUtils.userLogin("admin",$password.value,function(type,data,error){
          if(type=="success" && data.ID){
              WinSettingsActionCreators.loginToDesktop($password.value);
          }else{
              alert("user login error");
          }
      })
  },
  render: function() {
        return (
            <div className="login-form">
                <div className="login-form-container">
                    <div className="login-form-row hight-row">
                            <Button  className="btn login-form-user-image">
                                <div className="login-form-image-container">
                                    <img src={this.state.user.image} /> 
                                </div>
                            </Button>
                    </div>
                    <div className="login-form-row">
                            <span className="login-form-user">Administrator</span>
                    </div>
                    <div className="login-form-row">
                            <input  type="password" className="login-form-password" ref="password" onKeyPress={this.handleKeyPress}/>
                            <Button  className="btn login-form-submit" onClick={this.submitLoginForm}>
                                <img src={this.state.submit.image} /> 
                            </Button>
                    </div>
                    <div className="login-form-row">
                        <span className="first-loading">
                          首次加载，需要等几秒钟才能进入系统。
                        </span>
                        <span className="css3-loading"></span>
                    </div>
                </div>
            </div>
        );
  }
});
module.exports = LoginForm;
