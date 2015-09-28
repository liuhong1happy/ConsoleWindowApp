var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    CLICK_THREAD: null,
    CREATE_MESSAGE: null,
    RECEIVE_RAW_CREATED_MESSAGE: null,
    RECEIVE_RAW_MESSAGES: null
  }),
  EventTypes:keyMirror({
    WIN_SETTINS: null,
    DESKTOP_BUTTONS: null,
    TASK_BARS: null,
    START_MENU_APPS: null,
    START_MENU_BUTTONS:null,
    WINDOWS:null,
    APPS:null
  }),
};