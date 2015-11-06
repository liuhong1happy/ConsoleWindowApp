var React = require('react');
var DesktopPage = require('./pages/DesktopPage.react');
var LoginPage = require('./pages/LoginPage.react');
var WinSettingsStore = require('../stores/WinSettingsStore');
var WinAppConstants = require('../constants/WinAppConstants');
var WinApp = React.createClass({
  getInitialState: function() {
    return { 
        login:WinSettingsStore.getLoginState()
    };
  },
  componentDidMount: function() {
        WinSettingsStore.addChangeListener(WinAppConstants.EventTypes.PAGES,this._onChange);
  },
  componentWillUnmount: function() {
        WinSettingsStore.removeChangeListener(WinAppConstants.EventTypes.PAGES,this._onChange);
  },
  _onChange:function(){
        this.setState({ 
           login:WinSettingsStore.getLoginState()
        });
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