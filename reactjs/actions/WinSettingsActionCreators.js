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
  }
};