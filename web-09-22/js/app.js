var WinApp = require('./componets/WinApp.react');
var WinAppWebAPIUtils = require('./utils/WinAppWebAPIUtils');
var WinAppLocalStorage = require('./WinAppLocalStorage');
var React = require('react');
window.React = React;
WinAppLocalStorage.init();
WinAppWebAPIUtils.getWinSettings();
React.render( <WinApp />, document.body);