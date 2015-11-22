var assign = require('object-assign');
var WinAppDispatcher = require('../dispatcher/WinAppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var WinAppWebApiUtils = require('../utils/WinAppWebApiUtils');
var WinAppObjectUtils = require('../utils/WinAppObjectUtils');
var WinAppConstants = require('../constants/WinAppConstants');
var ActionTypes = WinAppConstants.ActionTypes;

var FileSystem = {
    tree:{},
    favorite:[]
};

var FileManageStore = assign({},EventEmitter.prototype,{
    emitChange: function(event) {
        this.emit(event);
    },
    addChangeListener: function(event,callback) {
        this.on(event, callback);
    },
    removeChangeListener: function(event,callback) {
        this.removeListener(event, callback);
    },
    getFileSystemTree:function(){
        return FileSystem.tree;
    },
    getFavoriteTree:function(){
        return FileSystem.favorite;
    }
});

FileManageStore.dispatchToken = WinAppDispatcher.register(function(action) {
    switch(action.type) {
        case ActionTypes.RECEIVED_FILE_SYSTEM:
            FileSystem = action.data;
            FileManageStore.emitChange(WinAppConstants.EventTypes.FILE_SYSTEM);
          break;
        default:
          // do nothing
    }
});
module.exports = AppManageStore;