
var WinSettingsActionCreators = require('../actions/WinSettingsActionCreators');
module.exports = {
  getAllMessages: function() {
    var winSettings = JSON.parse(localStorage.getItem('winSettings'));
    WinSettingsActionCreators.receiveWinSettings(winSettings);
  }
};
