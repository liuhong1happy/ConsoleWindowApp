var WinApp = require('./components/WinApp.react');
var WinAppWebApiUtils = require('./utils/WinAppWebApiUtils');
var WinAppLocalStorage = require('./WinAppLocalStorage');
var React = require('react');
window.Env = "dev";
WinAppLocalStorage.init();
WinAppWebApiUtils.getWinSettings();
React.render( <WinApp />, document.body);