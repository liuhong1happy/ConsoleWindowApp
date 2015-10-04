var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    RECEIVE_WIN_SETTINGS: null,
    SAVE_WIN_SETTINGS: null
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