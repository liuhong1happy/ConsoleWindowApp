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
  openSystemWindow:function(window){
    WinAppDispatcher.dispatch({
      type: ActionTypes.OPEN_SYSTEM_WINDOW,
      data: window
    });
  },
  toggleSystemWindow:function(window){
    WinAppDispatcher.dispatch({
      type: ActionTypes.TOGGLE_SYSTEM_WINDOW,
      data: window
    });
  },
};