var assign = require('object-assign');
var WinAppDispatcher = require('../dispatcher/WinAppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var WinAppWebApiUtils = require('../utils/WinAppWebApiUtils');
var WinAppConstants = require('../constants/WinAppConstants');
var ActionTypes = WinAppConstants.ActionTypes;

var WinSettings = {
    SystemApps:[
        { id:0,name:"计算机",image:"images/computer.png", where:["desktop"],render:"Button",fixed:true,type:"SystemApp" },
        { id:1,name:"回收站",image:"images/recycle.png", where:["desktop"],render:"Button",fixed:true,type:"SystemApp"},
        { id:2,name:"我的网络",image:"images/network.png", where:["desktop"],render:"Button",fixed:true,type:"SystemApp"},
        { id:3,name:"开始菜单",image:"images/start.png",where:["taskbar"],render:"StartMenu",fixed:true,type:"SystemApp"}
    ],
    CustomApps:[
        { id:0,name:"IE",image:"images/ie.png", where:["taskbar","startmenu"],render:"Button",fixed:true,type:"CustomApp"},
        { id:1,name:"文件浏览器",image:"images/library.png", where:["taskbar","startmenu"],render:"Button",fixed:true,type:"CustomApp"},
        { id:2,name:"视频播放器",image:"images/mp.png", where:["taskbar","startmenu"],render:"Button",fixed:true,type:"CustomApp"}
    ],
    SystemWins:[
        { 
            id:0,name:"开始菜单",image:"", where:["bottom","left"],render:StartMenuWidget,fixed:true,type:"SystemWin",
            position:{y:0,x:0}, width:440,height:540
        },
        // { id:1,name:"控制面板",image:"", where:["top","left"],render:"ControlPanel",fixed:false,type:"SystemWin"}
    ],
    CustomWins:[
//        { 
//            id:0,name:"百度一下，你就知道了",image:"", where:["top","left"],render:Widget,fixed:true,type:"CustomWin",
//            position:{y:100,x:100}, width:1024,height:700, 
//            content:{ 
//                render:"iframe",config:{ 
//                    src:"http://www.baidu.com",
//                    width:"100%",
//                    height:"100%",                       
//                    style:{
//                        border:"0px solid transparent"
//                    }
//                },
//                children:null 
//            }  
//        },
    ],
    StartMenuButtons:[
        { id:0,name:"Administrator",image:"images/computer.png", where:["startmenu"],render:StartMenuButton,fixed:true,type:"StartMenuButton" },
        { id:1,name:"文档",image:"images/recycle.png", where:["startmenu"],render:StartMenuButton,fixed:true,type:"StartMenuButton"},
        { id:2,name:"图片",image:"images/network.png", where:["startmenu"],render:StartMenuButton,fixed:true,type:"StartMenuButton"},
        { id:3,name:"音乐",image:"images/start.png",where:["startmenu"],render:StartMenuButton,fixed:true,type:"StartMenuButton"},
        { id:4,name:"",image:"images/computer.png", where:["startmenu"],render:Splitter,fixed:true,type:"StartMenuButton" },
        { id:5,name:"游戏",image:"images/recycle.png", where:["startmenu"],render:StartMenuButton,fixed:true,type:"StartMenuButton"},
        { id:6,name:"计算机",image:"images/network.png", where:["startmenu"],render:StartMenuButton,fixed:true,type:"StartMenuButton"},
        { id:7,name:"",image:"images/start.png",where:["startmenu"],render:Splitter,fixed:true,type:"StartMenuButton"},
        { id:8,name:"控制面板",image:"images/computer.png", where:["startmenu"],render:StartMenuButton,fixed:true,type:"StartMenuButton" },
        { id:9,name:"设备和打印机",image:"images/recycle.png", where:["startmenu"],render:StartMenuButton,fixed:true,type:"StartMenuButton"},
        { id:10,name:"默认程序",image:"images/network.png", where:["startmenu"],render:StartMenuButton,fixed:true,type:"StartMenuButton"},
        { id:11,name:"运行...",image:"images/start.png",where:["startmenu"],render:StartMenuButton,fixed:true,type:"StartMenuButton"},
        { id:12,name:"关机",image:"images/start.png",where:["startmenu"],render:CloseSystemButton,fixed:true,type:"StartMenuButton"}
    ],
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
        var startMenu = { id:3,name:"开始菜单",image:"images/start.png",where:["taskbar"],render:"StartMenu",fixed:true};
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
        var sysApps = this.SystemApps;
        var cusApps = this.CustomApps;
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
    }
});

