var keyMirror = require('keymirror');

module.exports = {
  ActionTypes: keyMirror({
        RECEIVE_WIN_SETTINGS: null,
        SAVE_WIN_SETTINGS: null,

        OPEN_WINDOW:null,
        TOGGLE_WINDOW:null,
        CLOSE_WINDOW:null,

        SHOW_WINDOW:null,
        MIN_WINDOW:null,
        MAX_WINDOW:null,
      
        SHOW_SNAP_SHOT:null,
        USER_LOGIN:null,
      
        RECEIVE_STORE_APPS:null,
        RECEIVE_MY_STORE_APPS:null,
        ADD_STORE_APP:null,
  }),
  EventTypes:keyMirror({
    WIN_SETTINS: null,
    DESKTOP_BUTTONS: null,
    TASK_BARS: null,
    START_MENU_APPS: null,
    START_MENU_BUTTONS:null,
    WINDOWS:null,
    PAGES:null,
    APPS:null,
    SNAPSHOTS:null,
    STORE_APPS:null,
    MY_STORE_APPS:null
  }),
};