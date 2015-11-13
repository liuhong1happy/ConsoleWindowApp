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
        var sysApps = this.state.SystemApps;
        var cusApps = this.state.CustemApps;
        return (
            <div className="appmanage-form">
                    <div className="system-apps">
                            <div>系统应用</div>
                            {
                                sysApps.map(function(app){
                                    
                                    return (<div>{app.name}</div>)
                                })
                            }
                    </div>
                    <div className="custom-apps">
                            <div>我的应用</div>
                            {
                                cusApps.map(function(app){
                                    return (<div>{app.name}</div>)
                                })
                            }
                    </div>
                    <div className="my-apps">
                            <div>我发布的应用</div>
                            <div>您暂时没有发布的应用</div>
                    </div>
            </div>
        );
  }
});
module.exports = AppManageForm;
