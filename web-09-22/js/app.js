var WinApp = require('./componets/WinApp.react');
var WinAppWebAPIUtils = require('./utils/WinAppWebAPIUtils');
var React = require('react');
window.React = React;
WinAppWebAPIUtils.getWinSettings();
React.render( <WinApp />, document.body);