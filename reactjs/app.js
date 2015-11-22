var WinApp = require('./components/WinApp.react');
var WinAppServerActionCreators = require('./actions/WinAppServerActionCreators');

var WinAppLocalStorage = require('./WinAppLocalStorage');
var React = require('react');
window.Env = "dev";
WinAppLocalStorage.init();

WinAppServerActionCreators.fetchWinSettings();
WinAppServerActionCreators.fetchStoreApps();
WinAppServerActionCreators.fetchFileSystem();

React.render( <WinApp />, document.body);