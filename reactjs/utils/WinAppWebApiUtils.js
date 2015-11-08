
var WinSettingsActionCreators = require('../actions/WinSettingsActionCreators');
module.exports = {
  getWinSettings: function() {
    var winSettings = JSON.parse(localStorage.getItem('winSettings'));
    WinSettingsActionCreators.receiveWinSettings(winSettings);
  },
  userLogin:function(user_name,user_pwd,callback){
      $.ajax({
          url:"/v1/u/login",
          type:"post",
          dataType:"json",
          data:{
                user_name:user_name,
                user_pwd:user_pwd
          },
          success:function(res){
              callback("success",res);
          },
          error:function(e,err){
              callback("error",e,err);
          }
      })
  }
};
