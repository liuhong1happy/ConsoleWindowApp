var React = require('react');
var DesktopPage = require('./pages/DesktopPage.react');
var LoginPage = require('./pages/LoginPage.react');
var WinSettingsStore = require('../../stores/WinSettingsStore');

var WinApp = React.createClass({
  getInitialState: function() {
    return { 
        login:WinSettingsStore.getLoginState()
    };
  },
  render: function() {
        if(this.state.login){
            return (<DesktopPage />)
        }else{
            return (<LoginPage />)
        }
  }
});
module.exports = WinApp;