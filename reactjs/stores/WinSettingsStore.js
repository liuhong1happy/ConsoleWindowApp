var assign = require('object-assign');
var WinAppDispatcher = require('../dispatcher/WinAppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var WinAppWebApiUtils = require('../utils/WinAppWebApiUtils');
var WinAppObjectUtils = require('../utils/WinAppObjectUtils');
var WinAppConstants = require('../constants/WinAppConstants');
var ActionTypes = WinAppConstants.ActionTypes;

var WinSettings = {
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
    getSnapShot:function(){
        if(!isNull(WinSettings.SnapShot)){
            return WinSettings.SnapShot;
        }else{
            return {
                app:{},
                snapshots:[]
            };
        }
    }
});

var isNull = WinAppObjectUtils.isNull;

WinSettingsStore.dispatchToken = WinAppDispatcher.register(function(action) {
    switch(action.type) {
        case ActionTypes.RECEIVE_WIN_SETTINGS:
          WinSettings = action.data;
          WinSettingsStore.emitChange(WinAppConstants.EventTypes.WIN_SETTINS);
          break;
        case ActionTypes.TOGGLE_SYSTEM_WINDOW:
            var window = action.data;
            var findWins = WinSettings.SystemWins.filter(function(ele,pos){
                return ele.id = window.id;
            });
            if(findWins.length>0){
                findWins[0].show = !findWins[0].show;
                WinSettingsStore.emitChange(WinAppConstants.EventTypes.WINDOWS);
            };
            break;
        case ActionTypes.MIN_CUSTOM_WINDOW:
            var window = action.data;
            var findWins = WinSettings.CustomWins.filter(function(ele,pos){
                return ele.id == window.id;
            });
            var findApps = WinSettings.CustomApps.filter(function(ele,pos){
                return ele.id == window.app_id;
            });
            if(findWins.length>0 && findApps.length>0){
                findWins[0].show = false;
                if(findApps[0].window){
                    findApps[0].window.snapshot = window.snapshot;
                }else{
                    findApps[0].windows[window.id].snapshot = window.snapshot;
                }
                if(findApps[0].config) findApps[0].config = {}
                findApps[0].config ={
                    position:{y:window.position.y,x:window.position.x}, 
                    width:window.width,
                    height:window.height
                }
                WinSettingsStore.emitChange(WinAppConstants.EventTypes.WINDOWS);
            }
            break;
        case ActionTypes.CLOSE_CUSTOM_WINDOW:
            var window = action.data;
            var m_pos = -1;
            var findWins = WinSettings.CustomWins.filter(function(ele,pos){
                if(ele.id == window.id) m_pos=pos;
                return ele.id == window.id;
            });
            var findApps = WinSettings.CustomApps.filter(function(ele,pos){
                return ele.id == window.app_id;
            });
            if(findWins.length>0 && findApps.length>0){
                if(window.render=="window"){
                    delete findApps[0].windows[window.id];
                    if(isNull(findApps[0].windows)){
                        findApps[0].windows = null;
                    }
                }else{
                    findApps[0].window = null;
                }
                WinSettings.CustomWins.splice(m_pos,1);
                if(findApps[0].config) findApps[0].config = {}
                findApps[0].config ={
                    position:{y:window.position.y,x:window.position.x}, 
                    width:window.width,
                    height:window.height
                }
                WinSettingsStore.emitChange(WinAppConstants.EventTypes.WINDOWS);
                WinSettingsStore.emitChange(WinAppConstants.EventTypes.TASK_BARS);
            }
            break;
        case ActionTypes.SHOW_SNAP_SHOT:
            var snapShots = [];
            var window = action.data.window,windows =action.data.windows,app=action.data.app;
            if(!isNull(window)){
                snapShots.push(window);
            }
            if(!isNull(windows)){
                for(var w in windows){
                    windows[w].id = w;
                    snapShots.push(windows[w]);
                }
            }
            WinSettings.SnapShot ={
                snapshots:snapShots,
                app:app
            }
            WinSettingsStore.emitChange(WinAppConstants.EventTypes.SNAPSHOTS);
            break;
        default:
          // do nothing
    }
});

module.exports = WinSettingsStore;
