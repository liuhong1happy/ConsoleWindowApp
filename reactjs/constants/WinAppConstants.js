var keyMirror = require('keymirror');

module.exports = {
  ActionTypes: keyMirror({
    RECEIVE_WIN_SETTINGS: null,
    SAVE_WIN_SETTINGS: null,
      
    OPEN_SYSTEM_WINDOW:null,
    TOGGLE_SYSTEM_WINDOW:null,
    HIDE_SYSTEM_WINDOW:null,
    CLOSE_SYSTEM_WINDOW:null,
      
    MIN_CUSTOM_WINDOW:null,
    MAX_CUSTOM_WINDOW:null,
    CLOSE_CUSTOM_WINDOW:null
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