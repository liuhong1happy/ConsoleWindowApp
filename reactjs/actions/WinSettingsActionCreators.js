var WinAppDispatcher = require('../dispatcher/WinAppDispatcher');
var WinAppConstants = require('../constants/WinAppConstants');
var ActionTypes = WinAppConstants.ActionTypes;
module.exports = {
  receiveWinSettings: function(winSettings) {
    WinAppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_WIN_SETTINGS,
      data: winSettings
    });
  },
  saveWinSettings: function(winSettings) {
    WinAppDispatcher.dispatch({
      type: ActionTypes.SAVE_WIN_SETTINGS,
      data: winSettings
    });
  },
    
  openWindow:function(app){
    WinAppDispatcher.dispatch({
      type: ActionTypes.OPEN_WINDOW,
      data: app
    });
  },
  toggleWindow:function(window){
    WinAppDispatcher.dispatch({
      type: ActionTypes.TOGGLE_WINDOW,
      data: window
    });
  },
  showWindow:function(window){
        WinAppDispatcher.dispatch({
          type: ActionTypes.SHOW_WINDOW,
          data: window
        });
  },
  minWindow:function(window){
        WinAppDispatcher.dispatch({
          type: ActionTypes.MIN_WINDOW,
          data: window
        });
  },
  maxWindow:function(window){
        WinAppDispatcher.dispatch({
          type: ActionTypes.MAX_CUSTOM_WINDOW,
          data: window
        });
  },
  closeWindow:function(window){
        WinAppDispatcher.dispatch({
          type: ActionTypes.CLOSE_WINDOW,
          data: window
        });
  },
  showSnapshot:function(snapshot){
      WinAppDispatcher.dispatch({
        type:ActionTypes.SHOW_SNAP_SHOT,
        data:snapshot
      });
  },
  loginToDesktop:function(password){
      WinAppDispatcher.dispatch({
        type:ActionTypes.USER_LOGIN,
        data:password
      });
  }
};