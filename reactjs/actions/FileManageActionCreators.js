var WinAppDispatcher = require('../dispatcher/WinAppDispatcher');
var WinAppConstants = require('../constants/WinAppConstants');


// ActionCreators是WebAPI和Store之间沟通的桥梁

var ActionTypes = WinAppConstants.ActionTypes;
module.exports = {
    receivedFileSystem:function(fileSystem){
            WinAppDispatcher.dispatch({
                type: ActionTypes.RECEIVED_FILE_SYSTEM,
                data:fileSystem
            });
    }
};