var React = require('react');
var ReactDOM = require('react-dom');
var Button = require('../base/Button.react');
var WinAppServerActionCreators = require('../../actions/WinAppServerActionCreators');


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
      
      var $password = ReactDOM.findDOMNode(this.refs.password);
      var formData = {
          "user_name":"admin",
          "user_pwd":$password.value
      }
      WinAppServerActionCreators.submitLoginForm(formData);
  },
  render: function() {
        var loadingStyle = {
            display:"none",
            width:240,
            verticalAlign:"middle",
            lineHeight: "40px",
            paddingLeft:"5px"
        };
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
                        <span ref="loading" style={loadingStyle} className="css3-loading"></span>
                    </div>
                </div>
            </div>
        );
  }
});
module.exports = LoginForm;
