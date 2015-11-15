
var WinAppDispatcher = require('../dispatcher/WinAppDispatcher');
var WinAppConstants = require('../constants/WinAppConstants');
var ActionTypes = WinAppConstants.ActionTypes;
module.exports = {
      receiveStoreApps: function(storeApps) {
            WinAppDispatcher.dispatch({
                type: ActionTypes.RECEIVE_STORE_APPS,
                data:storeApps
            });
      },
      receiveMyStoreApps:function(myStoreApps) {
            WinAppDispatcher.dispatch({
                type: ActionTypes.RECEIVE_MY_STORE_APPS,
                data: myStoreApps
            });
      },
      addStoreApp:function(app){
            WinAppDispatcher.dispatch({
              type: ActionTypes.ADD_STORE_APP,
              data:app
            });
      }
};