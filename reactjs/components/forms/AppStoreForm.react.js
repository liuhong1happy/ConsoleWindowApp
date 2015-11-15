var React = require('react');
var WinSettingsStore = require('../../stores/WinSettingsStore');

var AppStoreForm = React.createClass({
    getInitialState:function(){
        return {
            SystemApps:WinSettingsStore.getSystemApps(),
            CustomApps:WinSettingsStore.getCustomApps()
        };
    },
    _openAppStore:function(){

    },
    _openAddApp:function(){
        alert("Demo 演示暂且不能发布应用");
    },
    render: function() {
        var sysApps = this.state.SystemApps;
        var cusApps = this.state.CustomApps;
        var openAppStore = this._openAppStore;
        var openAddApp = this._openAddApp;
        return (
            <div className="appmanage-form">
                    <div className="apps system-apps">
                            <div className="app-type">系统应用</div>
                            {
                                sysApps.map(function(app){
                                    return (
                                        <div className="app-content">
                                            <div className="app-icon" style={ { "background-image" :"url("+app.image+")"} }></div>
                                            <div className="app-item">{app.name}</div>
                                        </div>
                                    )
                                })
                            }
                    </div>
                    <div className="apps custom-apps">
                            <div className="app-type">我的应用</div>
                            {
                                cusApps.map(function(app){
                                    return (
                                        <div className="app-content">
                                            <div className="app-icon" style={ { "background-image" :"url("+app.image+")"} }></div>
                                            <div className="app-item">{app.name}</div>
                                        </div>
                                    )
                                })
                            }
                            <div className="app-content" onClick={ openAppStore }>
                                <div className="app-icon" style={ { "background-image" :"url('/static/images/update.png')"} }></div>
                                <div className="app-item add-app">+添加应用</div>
                            </div>
                    </div>
                    <div className="apps my-apps">
                            <div className="app-type">我发布的应用</div>
                            <div className="no-my-apps">
                                您暂时没有发布的应用，点击[<a className="btn-add-myapp" onClick={ openAddApp }>这里</a>]发布应用。
                            </div>
                    </div>
            </div>
        );
  }
});
module.exports = AppStoreForm;
