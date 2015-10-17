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
  minCustomWindow:function(window){
        WinAppDispatcher.dispatch({
          type: ActionTypes.MIN_CUSTOM_WINDOW,
          data: window
        });
  },
  maxCustomWindow:function(window){
        WinAppDispatcher.dispatch({
          type: ActionTypes.MAX_CUSTOM_WINDOW,
          data: window
        });
  },
  closeCustomWindow:function(window){
        WinAppDispatcher.dispatch({
          type: ActionTypes.CLOSE_CUSTOM_WINDOW,
          data: window
        });
  },
  showSnapshot:function(snapshot){
      WinAppDispatcher.dispatch({
        type:ActionTypes.SHOW_SNAP_SHOT,
        data:snapshot
      });
  }
};