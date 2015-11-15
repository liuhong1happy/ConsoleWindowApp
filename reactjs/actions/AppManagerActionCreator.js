
var WinAppDispatcher = require('../dispatcher/WinAppDispatcher');
var WinAppConstants = require('../constants/WinAppConstants');
var ActionTypes = WinAppConstants.ActionTypes;
module.exports = {
      getStoreApps: function() {
            WinAppDispatcher.dispatch({
              type: ActionTypes.RECEIVE_STORE_APPS
            });
      },
      getMyStoreApps:function() {
            WinAppDispatcher.dispatch({
              type: ActionTypes.RECEIVE_MY_STORE_APPS
            });
      },
      addStoreApp:function(app){
            WinAppDispatcher.dispatch({
              type: ActionTypes.ADD_STORE_APP,
              data:app
            });
      }
};