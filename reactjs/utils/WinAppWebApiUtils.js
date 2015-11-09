
var WinSettingsActionCreators = require('../actions/WinSettingsActionCreators');
module.exports = {
  getWinSettings: function() {
      $.ajax({
          url:"/v1/u/settings",
          type:"get",
          dataType:"json",
          success:function(res){
              if(res && res.ID){
                    var winSettings = JSON.parse(res.win_settings);
                    WinSettingsActionCreators.receiveWinSettings(winSettings);
              }else{
                    var winSettings = JSON.parse(localStorage.getItem('winSettings'));
                    WinSettingsActionCreators.receiveWinSettings(winSettings);
              }
          },
          error:function(e,err){
                var winSettings = JSON.parse(localStorage.getItem('winSettings'));
                winSettings.login = false;
                WinSettingsActionCreators.receiveWinSettings(winSettings);
          }
      });
  },
  saveWinSettings:function(settings){
      $.ajax({
          url:"/v1/u/settings",
          type:"post",
          dataType:"json",
          data:{
              "win_settings":JSON.stringify(settings)
          },
          success:function(res){
              alert("自动保存成功");
          },
          error:function(e,err){
              alert("自动保存失败");
          }
      });
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
