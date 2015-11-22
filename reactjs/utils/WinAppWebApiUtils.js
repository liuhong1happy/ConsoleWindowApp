var WinSettingsActionCreators = require('../actions/WinSettingsActionCreators');
var AppManagerActionCreators = require('../actions/AppManagerActionCreators');
var FileManageActionCreators =  require('../actions/FileManageActionCreators');
/**
1. WebApi在ActionCreators中调用
2. 调用成功返回结果给ActionCreators
3. 命名规范如下:
    a. 函数驼峰式命名,首字母小写.
    b. 获取数据以fetch作为前缀.
    c. 保存数据[POST/PUT]以submitXxxForm\saveXxxData\updateXxxData\作为前缀
    d. 删除数据以delete作为前缀.
**/

module.exports = {
      fetchWinSettings: function() {
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
      submitLoginForm:function(formData){
          $.ajax({
              url:"/v1/u/login",
              type:"post",
              dataType:"json",
              data:formData,
              success:function(res){
                  WinSettingsActionCreators.loginToDesktop(res.data)
              },
              error:function(e,err){
                  // 走统一错误处理
                  
              }
          })
      },
      fetchStoreApps:function(){
                var storeApps = JSON.parse(localStorage.getItem('storeApps'));
                AppManagerActionCreators.receiveStoreApps(storeApps);
      },
      fetchFileSystem:function(){
                var fileSystem = JSON.parse(localStorage.getItem('fileSystem'));
                FileManageActionCreators.receivedFileSystem(fileSystem);
      }
};