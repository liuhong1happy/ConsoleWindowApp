var WinAppDispatcher = require('../dispatcher/WinAppDispatcher');
var WinAppConstants = require('../constants/WinAppConstants');
var WinAppWebApiUtils = require('../utils/WinAppWebApiUtils');

// ActionCreators是WebAPI和Store之间沟通的桥梁

var ActionTypes = WinAppConstants.ActionTypes;
module.exports = {
        fetchFileSystem:function(){
                WinAppWebApiUtils.fetchFileSystem();
        },
        fetchWinSettings:function(){
               WinAppWebApiUtils.fetchWinSettings();
        },
        fetchStoreApps:function(){
              WinAppWebApiUtils.fetchStoreApps();
        },
        submitLoginForm:function(formData){
              WinAppWebApiUtils.submitLoginForm(formData);
        },
        saveWinSettings: function(winSettings) {
                WinAppWebApiUtils.saveWinSettings(winSettings);
        }
};