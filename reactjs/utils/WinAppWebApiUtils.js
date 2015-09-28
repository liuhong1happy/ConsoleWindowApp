
var WinSettingsActionCreators = require('../actions/WinSettingsActionCreators');
module.exports = {
  getWinSettings: function() {
    var winSettings = JSON.parse(localStorage.getItem('winSettings'));
    WinSettingsActionCreators.receiveWinSettings(winSettings);
  }
};
