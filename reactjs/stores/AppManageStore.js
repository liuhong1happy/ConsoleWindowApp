var assign = require('object-assign');
var WinAppDispatcher = require('../dispatcher/WinAppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var WinAppWebApiUtils = require('../utils/WinAppWebApiUtils');
var WinAppObjectUtils = require('../utils/WinAppObjectUtils');
var WinAppConstants = require('../constants/WinAppConstants');
var ActionTypes = WinAppConstants.ActionTypes;

var StoreApps = [];
var AppManageStore = assign({},EventEmitter.prototype,{
    emitChange: function(event) {
        this.emit(event);
    },
    addChangeListener: function(event,callback) {
        this.on(event, callback);
    },
    removeChangeListener: function(event,callback) {
        this.removeListener(event, callback);
    }
});
WinSettingsStore.dispatchToken = WinAppDispatcher.register(function(action) {
    switch(action.type) {
        case ActionTypes.RECEIVE_WIN_SETTINGS:
          WinSettings = action.data;
            WinSettingsStore.emitChange(WinAppConstants.EventTypes.PAGES);
          break;
        default:
          // do nothing
    }
    
    
});
module.exports = AppManageStore;