var assign = require('object-assign');
var WinAppDispatcher = require('../dispatcher/WinAppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var WinAppWebApiUtils = require('../utils/WinAppWebApiUtils');
var WinAppObjectUtils = require('../utils/WinAppObjectUtils');
var WinAppConstants = require('../constants/WinAppConstants');
var ActionTypes = WinAppConstants.ActionTypes;
var isNull = WinAppObjectUtils.isNull;

var WinSettings = {
    UserInfos:[],
    Preloads:[],
    SystemApps:[],
    CustomApps:[],
    SystemWins:[],
    CustomWins:[],
    SnapShot:{}
}
var WinSettingsStore = assign({},EventEmitter.prototype,{
    emitChange: function(event) {
        this.emit(event);
    },
    addChangeListener: function(event,callback) {
        this.on(event, callback);
    },
    removeChangeListener: function(event,callback) {
        this.removeListener(event, callback);
    },
    getTaskBars:function(){
        var sysApps = WinSettings.SystemApps;
        var cusApps = WinSettings.CustomApps;
        var bars = [];
        for(var i=0;i<sysApps.length;i++){
            var appWhere = sysApps[i].where;
            var appRender = sysApps[i].render;
            if(appWhere.indexOf("taskbar")>=0 && appRender == "Button"){
                bars.push(sysApps[i]);
            }
        }
        for(var i=0;i<cusApps.length;i++){
            var appWhere = cusApps[i].where;
            var appRender = cusApps[i].render;
            if(appWhere.indexOf("taskbar")>=0 && appRender == "Button"){
                bars.push(cusApps[i]);
            }
        }
        return bars;
    },
    getStartMenu:function(){
        var sysApps = WinSettings.SystemApps;
        var startMenu = { id:3,name:"开始菜单",image:"static/images/start.png",where:["taskbar"],render:"StartMenu",fixed:true};
        for(var i=0;i<sysApps.length;i++){
            var appWhere = sysApps[i].where;
            var appRender = sysApps[i].render;
            if(appWhere.indexOf("taskbar")>=0 && appRender == "StartMenu"){
                startMenu = sysApps[i];
            }
        }
        return startMenu;
    },
    getDesktopBars:function(){
        var sysApps = WinSettings.SystemApps;
        var cusApps = WinSettings.CustomApps;
        var bars = [];
        for(var i=0;i<sysApps.length;i++){
            var appWhere = sysApps[i].where;
            var appRender = sysApps[i].render;
            if(appWhere.indexOf("desktop")>=0 && appRender == "Button"){
                bars.push(sysApps[i]);
            }
        }
        for(var i=0;i<cusApps.length;i++){
            var appWhere = cusApps[i].where;
            var appRender = cusApps[i].render;
            if(appWhere.indexOf("desktop")>=0 && appRender == "Button"){
                bars.push(cusApps[i]);
            }
        }
        return bars;
    },
    getStartMenuBars:function(){
        var sysApps = WinSettings.SystemApps;
        var cusApps = WinSettings.CustomApps;
        var bars = [];
        for(var i=0;i<sysApps.length;i++){
            var appWhere = sysApps[i].where;
            var appRender = sysApps[i].render;
            if(appWhere.indexOf("startmenu")>=0 && appRender == "Button"){
                bars.push(sysApps[i]);
            }
        }
        for(var i=0;i<cusApps.length;i++){
            var appWhere = cusApps[i].where;
            var appRender = cusApps[i].render;
            if(appWhere.indexOf("startmenu")>=0 && appRender == "Button"){
                bars.push(cusApps[i]);
            }
        }
        return bars;
    },
    getWindows:function(){
        var SystemWins = WinSettings.SystemWins;
        var CustomWins = WinSettings.CustomWins;
        var windows = [];
        for(var i=0;i<SystemWins.length;i++){
            windows.push(SystemWins[i]);
        }
        for(var i=0;i<CustomWins.length;i++){
            windows.push(CustomWins[i]);
        }
        return windows;
    },
    getWindowById:function(id){
        var SystemWins = WinSettings.SystemWins;
        var CustomWins = WinSettings.CustomWins;
        var wins = SystemWins.filter(function(ele,pos){
            return ele.id == id;   
        })
        if(wins.length>0){
            return wins[0];
        }
        var wins = CustomWins.filter(function(ele,pos){
            return ele.id == id;   
        })
        if(wins.length>0){
            return wins[0];
        }else{
            return null;
        }
    },
    getStartMenuButtons:function(){
        return WinSettings.StartMenuButtons
    },
    getByIdAndType:function(id,type){
        var findObj = null;
        switch(type){
            case "SystemApp":
                var filterArr = WinSettings.SystemApps.filter(function(ele,pos){
                    return ele.id==id;
                });
                if(filterArr.length>0){
                    findObj = filterArr[0];
                }
                break;
            case "CustomApp":
                var filterArr = WinSettings.CustomApps.filter(function(ele,pos){
                    return ele.id==id;
                });
                if(filterArr.length>0){
                    findObj = filterArr[0];
                }
                break;
        }
        return findObj;
    },
    getAppById:function(id){
        var SystemApps = WinSettings.SystemApps;
        var CustomApps = WinSettings.CustomApps;
        var apps = SystemApps.filter(function(ele,pos){
            return ele.id == id;   
        })
        if(apps.length>0){
            return apps[0];
        }
        var apps = CustomApps.filter(function(ele,pos){
            return ele.id == id;   
        })
        if(apps.length>0){
            return apps[0];
        }else{
            return null;
        }
    },
    getSnapShot:function(){
        if(!isNull(WinSettings.SnapShot)){
            return WinSettings.SnapShot;
        }else{
            return {
                app:{},
                snapshots:[]
            };
        }
    },
    addWindow:function(win){
        win.id = win.app_id+"-"+WinAppObjectUtils.genID();
        if(win.type=="CustomWin"){
            WinSettings.CustomWins.push(win);
            var CustomApps = WinSettings.CustomApps;
            var apps = CustomApps.filter(function(ele,pos){
                return ele.id == win.app_id;   
            })
            if(apps[0].windows==null) apps[0].windows = [];
            apps[0].windows[win.id] = {snapshot:null};
        }
        if(win.type=="SystemWin"){
            WinSettings.SystemWins.push(win);
            var SystemApps = WinSettings.SystemApps;
            var apps = SystemApps.filter(function(ele,pos){
                return ele.id == win.app_id;   
            })
            if(apps[0].windows==null) apps[0].windows = [];
            apps[0].windows[win.id] = { snapshot:null };
        }
        
    },
    getLoginState:function(){
        return !!WinSettings.UserInfos.login;
    },
    getSystemApps:function(){
        return WinSettings.SystemApps;
    },
    getCustomApps:function(){
        return WinSettings.CustomApps;
    }
});



WinSettingsStore.dispatchToken = WinAppDispatcher.register(function(action) {
    switch(action.type) {
        case ActionTypes.RECEIVE_WIN_SETTINGS:
          WinSettings = action.data;
            WinSettingsStore.emitChange(WinAppConstants.EventTypes.PAGES);
          break;
        case ActionTypes.TOGGLE_WINDOW:
            var window = action.data;
            if(window.type=="SystemWin"){
                var findWins = WinSettings.SystemWins.filter(function(ele,pos){
                    return ele.id == window.id;
                });
                if(findWins.length>0){
                    findWins[0].show = !findWins[0].show;
                    WinSettingsStore.emitChange(WinAppConstants.EventTypes.WINDOWS);
                };
            }
            if(window.type=="CustomWin"){
                var findWins = WinSettings.CustomWins.filter(function(ele,pos){
                    return ele.id == window.id;
                });
                if(findWins.length>0){
                    findWins[0].show = !findWins[0].show;
                    WinSettingsStore.emitChange(WinAppConstants.EventTypes.WINDOWS);
                };
            }
            break;
        case ActionTypes.SHOW_WINDOW:
            var _window = action.data;
            if(_window.type==undefined){
                _window = WinSettingsStore.getWindowById(_window.id);
            }
            if(_window.type=="SystemWin"){
                var findWins = WinSettings.SystemWins.filter(function(ele,pos){
                    return ele.id == _window.id;
                });
                if(findWins.length>0){
                    findWins[0].show = true;
                    WinSettingsStore.emitChange(WinAppConstants.EventTypes.WINDOWS);
                };
            }
            if(_window.type=="CustomWin"){
                var findWins = WinSettings.CustomWins.filter(function(ele,pos){
                    return ele.id == _window.id;
                });
                if(findWins.length>0){
                    findWins[0].show = true;
                    WinSettingsStore.emitChange(WinAppConstants.EventTypes.WINDOWS);
                };
            }
            break;
        case ActionTypes.MIN_WINDOW:
            var window = action.data;
            var findWins = [],findApps=[];
            if(window.type=="SystemWin"){
                findWins = WinSettings.SystemWins.filter(function(ele,pos){
                    return ele.id == window.id;
                });
                findApps = WinSettings.SystemApps.filter(function(ele,pos){
                    return ele.id == window.app_id;
                });
            }
            if(window.type=="CustomWin"){
                findWins = WinSettings.CustomWins.filter(function(ele,pos){
                    return ele.id == window.id;
                });
                findApps = WinSettings.CustomApps.filter(function(ele,pos){
                    return ele.id == window.app_id;
                });
            }
            if(findWins.length>0 && findApps.length>0){
                findWins[0].show = false;
                if(!findApps[0].windows[window.id]) findApps[0].windows[window.id] = findWins[0];
                findApps[0].windows[window.id].snapshot = window.snapshot;
                if(!findApps[0].config) findApps[0].config = {}
                findApps[0].config.position={y:window.position.y,x:window.position.x};
                findApps[0].width=window.width;
                findApps[0].height=window.height;
                WinSettingsStore.emitChange(WinAppConstants.EventTypes.WINDOWS);
            }
            break;
        case ActionTypes.CLOSE_WINDOW:
            var window = action.data;
            if(window.type=="SystemWin"){
                var m_pos = -1;
                var findWins = WinSettings.SystemWins.filter(function(ele,pos){
                    if(ele.id == window.id) m_pos=pos;
                    return ele.id == window.id;
                });
                var findApps = WinSettings.SystemApps.filter(function(ele,pos){
                    return ele.id == window.app_id;
                });
                if(findWins.length>0 && findApps.length>0){
                    if(findApps[0].windows[window.id]){
                        delete findApps[0].windows[window.id];
                        if(isNull(findApps[0].windows)){
                            findApps[0].windows = null;
                        }
                    }else{
                        findApps[0].window = null;
                    }
                    WinSettings.SystemWins.splice(m_pos,1);
                    if(!findApps[0].config) findApps[0].config = {}
                    findApps[0].config.position={y:window.position.y,x:window.position.x};
                    findApps[0].width=window.width;
                    findApps[0].height=window.height;
                    WinSettingsStore.emitChange(WinAppConstants.EventTypes.WINDOWS);
                    WinSettingsStore.emitChange(WinAppConstants.EventTypes.TASK_BARS);
                }
            }
            if(window.type=="CustomWin"){
                var m_pos = -1;
                var findWins = WinSettings.CustomWins.filter(function(ele,pos){
                    if(ele.id == window.id) m_pos=pos;
                    return ele.id == window.id;
                });
                var findApps = WinSettings.CustomApps.filter(function(ele,pos){
                    return ele.id == window.app_id;
                });
                if(findWins.length>0 && findApps.length>0){
                    if(findApps[0].windows[window.id]){
                        delete findApps[0].windows[window.id];
                        if(isNull(findApps[0].windows)){
                            findApps[0].windows = null;
                        }
                    }else{
                        findApps[0].window = null;
                    }
                    WinSettings.CustomWins.splice(m_pos,1);
                    if(!findApps[0].config) findApps[0].config = {};
                    findApps[0].config.position={y:window.position.y,x:window.position.x};
                    findApps[0].width=window.width;
                    findApps[0].height=window.height;
                    WinSettingsStore.emitChange(WinAppConstants.EventTypes.WINDOWS);
                    WinSettingsStore.emitChange(WinAppConstants.EventTypes.TASK_BARS);
                }
            }
            WinAppWebApiUtils.saveWinSettings(WinSettings);
            break;
        case ActionTypes.OPEN_WINDOW:
            var app = action.data;
            if(app.config){
                var config =  {
                    app_id : app.id,
                    image : app.image,
                    show : true,
                    fixed : app.fixed,
                    render:app.config.render,
                    position:{
                        x:app.config.position.x,
                        y:app.config.position.y
                    },
                    where:app.config.where,
                    width:app.config.width,
                    type:app.config.type,
                    height:app.config.height,
                    content:app.config.content
                };
                WinSettingsStore.addWindow(config);
                WinSettingsStore.emitChange(WinAppConstants.EventTypes.WINDOWS);
                WinSettingsStore.emitChange(WinAppConstants.EventTypes.TASK_BARS);
            }
            WinAppWebApiUtils.saveWinSettings(WinSettings);
            break;
        case ActionTypes.SHOW_SNAP_SHOT:
            var snapShots = [];
            var window = action.data.window,
                windows =action.data.windows,
                app=action.data.app;
            if(!isNull(window)){
                snapShots.push(window);
            }
            if(!isNull(windows)){
                for(var w in windows){
                    snapShots.push({
                        id:w,
                        snapshot:windows[w].snapshot
                    });
                }
            }
            WinSettings.SnapShot ={
                snapshots:snapShots,
                app:app
            }
            WinSettingsStore.emitChange(WinAppConstants.EventTypes.SNAPSHOTS);
            break;
        case ActionTypes.USER_LOGIN:
            WinSettings.UserInfos.login = true;
            localStorage.setItem('winSettings',JSON.stringify(WinSettings));
            WinAppWebApiUtils.saveWinSettings(WinSettings);
//            WinSettingsStore.emitChange(WinAppConstants.EventTypes.USER);
            WinSettingsStore.emitChange(WinAppConstants.EventTypes.PAGES);
            
            break;
        default:
          // do nothing
    }
    
    
});

module.exports = WinSettingsStore;