
var WinSettingsActionCreators = require('../actions/WinSettingsActionCreators');
module.exports = {
  getWinSettings: function() {
      $.ajax({
          url:"/v1/u/settings",
          type:"get",
          dataType:"json",
          success:function(res){
              if(res && res.ID){
                   if(window.Env =="dev"){
                        var winSettings = JSON.parse(localStorage.getItem('winSettings'));
                   }else{
                       var winSettings = JSON.parse(res.win_settings);
                   }    
                   WinSettingsActionCreators.receiveWinSettings(winSettings);
              }else{
                    var winSettings = JSON.parse(localStorage.getItem('winSettings'));
                    WinSettingsActionCreators.receiveWinSettings(winSettings);
              }
          },
          error:function(e,err){
                var winSettings = JSON.parse(localStorage.getItem('winSettings'));
                winSettings.UserInfos.login = false;
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
              console.log("autosave:"+new Date())
          },
          error:function(e,err){
                settings.UserInfos.login = false;
                WinSettingsActionCreators.receiveWinSettings(settings);
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