var assign = require('object-assign');
var WinAppDispatcher = require('../dispatcher/WinAppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var WinAppWebApiUtils = require('../utils/WinAppWebApiUtils');
var WinAppObjectUtils = require('../utils/WinAppObjectUtils');
var WinAppConstants = require('../constants/WinAppConstants');
var ActionTypes = WinAppConstants.ActionTypes;

var StoreApps = {
    storeApps:[],
    myStoreApps:[]
};
var AppManageStore = assign({},EventEmitter.prototype,{
    emitChange: function(event) {
        this.emit(event);
    },
    addChangeListener: function(event,callback) {
        this.on(event, callback);
    },
    removeChangeListener: function(event,callback) {
        this.removeListener(event, callback);
    },
    getStoreApps:function(){
        return StoreApps.storeApps;
    },
    getMyStoreApps:function(){
        return StoreApps.myStoreApps;
    }
});

AppManageStore.dispatchToken = WinAppDispatcher.register(function(action) {
    switch(action.type) {
        case ActionTypes.RECEIVE_STORE_APPS:
            StoreApps.storeApps = action.data;
            AppManageStore.emitChange(WinAppConstants.EventTypes.STORE_APPS);
          break;
        default:
          // do nothing
    }
});
module.exports = AppManageStore;