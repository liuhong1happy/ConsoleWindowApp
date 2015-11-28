var WinApp = require('./components/WinApp.react');
var WinAppServerActionCreators = require('./actions/WinAppServerActionCreators');

var WinAppLocalStorage = require('./WinAppLocalStorage');
var React = require('react');
var ReactDOM = require('react-dom');
window.Env = "dev";
WinAppLocalStorage.init();

WinAppServerActionCreators.fetchWinSettings();
WinAppServerActionCreators.fetchStoreApps();
WinAppServerActionCreators.fetchFileSystem();

ReactDOM.render( <WinApp />, document.getElementById("react"));