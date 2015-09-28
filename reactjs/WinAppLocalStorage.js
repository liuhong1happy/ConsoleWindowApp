var StartMenuWidget = require('./components/widgets/StartMenuWidget.react');
var Widget = require('./components/base/Widget.react');
var StartMenuButton = require('./components/buttons/StartMenuButton.react');
var CloseSystemButton = require('./components/buttons/CloseSystemButton.react');
var Splitter = require('./components/base/Splitter.react');

module.exports = {
  init: function() {
    localStorage.clear();
    localStorage.setItem('winSettings', JSON.stringify({
    SystemApps:[
        { id:0,name:"计算机",image:"static/images/computer.png", where:["desktop"],render:"Button",fixed:true,type:"SystemApp" },
        { id:1,name:"回收站",image:"static/images/recycle.png", where:["desktop"],render:"Button",fixed:true,type:"SystemApp"},
        { id:2,name:"我的网络",image:"static/images/network.png", where:["desktop"],render:"Button",fixed:true,type:"SystemApp"},
        { id:3,name:"开始菜单",image:"static/images/start.png",where:["taskbar"],render:"StartMenu",fixed:true,type:"SystemApp"}
    ],
    CustomApps:[
        { id:0,name:"IE",image:"static/images/ie.png", where:["taskbar","startmenu"],render:"Button",fixed:true,type:"CustomApp"},
        { id:1,name:"文件浏览器",image:"static/images/library.png", where:["taskbar","startmenu"],render:"Button",fixed:true,type:"CustomApp"},
        { id:2,name:"视频播放器",image:"static/images/mp.png", where:["taskbar","startmenu"],render:"Button",fixed:true,type:"CustomApp"}
    ],
    SystemWins:[
        { 
            id:0,name:"开始菜单",image:"", where:["bottom","left"],render:StartMenuWidget,fixed:true,type:"SystemWin",
            position:{y:0,x:0}, width:440,height:540
        },
        //{ id:1,name:"控制面板",image:"", where:["top","left"],render:"ControlPanel",fixed:false,type:"SystemWin"}
    ],
    CustomWins:[
        { 
            id:0,name:"百度一下，你就知道了",image:"", where:["top","left"],render:Widget,fixed:true,type:"CustomWin",
            position:{y:100,x:100}, width:1024,height:700, 
            content:{ 
                render:"iframe",config:{ 
                    src:"http://www.baidu.com",
                    width:"100%",
                    height:"100%",                       
                    style:{
                        border:"0px solid transparent"
                    }
                },
                children:null 
            }  
        }
    ],
    StartMenuButtons:[
        { id:0,name:"Administrator",image:"static/images/computer.png", where:["startmenu"],render:StartMenuButton,fixed:true,type:"StartMenuButton" },
        { id:1,name:"文档",image:"static/images/recycle.png", where:["startmenu"],render:StartMenuButton,fixed:true,type:"StartMenuButton"},
        { id:2,name:"图片",image:"static/images/network.png", where:["startmenu"],render:StartMenuButton,fixed:true,type:"StartMenuButton"},
        { id:3,name:"音乐",image:"static/images/start.png",where:["startmenu"],render:StartMenuButton,fixed:true,type:"StartMenuButton"},
        { id:4,name:"",image:"static/images/computer.png", where:["startmenu"],render:Splitter,fixed:true,type:"StartMenuButton" },
        { id:5,name:"游戏",image:"static/images/recycle.png", where:["startmenu"],render:StartMenuButton,fixed:true,type:"StartMenuButton"},
        { id:6,name:"计算机",image:"static/images/network.png", where:["startmenu"],render:StartMenuButton,fixed:true,type:"StartMenuButton"},
        { id:7,name:"",image:"static/images/start.png",where:["startmenu"],render:Splitter,fixed:true,type:"StartMenuButton"},
        { id:8,name:"控制面板",image:"static/images/computer.png", where:["startmenu"],render:StartMenuButton,fixed:true,type:"StartMenuButton" },
        { id:9,name:"设备和打印机",image:"static/images/recycle.png", where:["startmenu"],render:StartMenuButton,fixed:true,type:"StartMenuButton"},
        { id:10,name:"默认程序",image:"static/images/network.png", where:["startmenu"],render:StartMenuButton,fixed:true,type:"StartMenuButton"},
        { id:11,name:"运行...",image:"static/images/start.png",where:["startmenu"],render:StartMenuButton,fixed:true,type:"StartMenuButton"},
        { id:12,name:"关机",image:"static/images/start.png",where:["startmenu"],render:CloseSystemButton,fixed:true,type:"StartMenuButton"}
    ],
}));
  }
};