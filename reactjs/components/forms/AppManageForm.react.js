var React = require('react');
var WinSettingsStore = require('../../stores/WinSettingsStore');


var AppManageForm = React.createClass({
    getInitialState:function(){
        return {
            SystemApps:WinSettingsStore.getSystemApps(),
            CustomApps:WinSettingsStore.getCustomApps()
        };
    },
    render: function() {
        return (
            <div className="appmanage-form">
                    <div className="system-apps">
                            
                    </div>
                    <div className="system-apps"></div>
                    <div className="my-apps"></div>
            </div>
        );
  }
});
module.exports = AppManageForm;