module.exports = {
  init: function() {
    localStorage.clear();
    localStorage.setItem('winSettings', JSON.stringify({
    UserInfos:{
        login:false,
        user_name:"",
        email:"test@test.com",
        telphone:"12345678910"
    },
    SystemApps:[
        { id:0,name:"计算机",image:"static/images/computer.png", where:["desktop"],render:"Button",fixed:true,type:"SystemApp" },
        { id:1,name:"回收站",image:"static/images/recycle.png", where:["desktop"],render:"Button",fixed:true,type:"SystemApp"},
        { id:2,name:"我的网络",image:"static/images/network.png", where:["desktop"],render:"Button",fixed:true,type:"SystemApp"},
        { 
            id:"StartMenu",name:"开始菜单",image:"static/images/start.png",
            where:["taskbar"],render:"StartMenu",fixed:true,type:"SystemApp",
            window:{id:"StartMenu"}
        }
    ],
    CustomApps:[
        { 
            id:"IE",name:"IE",image:"static/images/ie.png", where:["taskbar","startmenu"],render:"Button",fixed:true,type:"CustomApp",
            config:{
                render:"Window",position:{y:100,x:100}, width:1024,height:700, type:"CustomWin",
                content:{ 
                    render:"iframe",
                    config:{ 
                        src:"http://www.baidu.com",
                        width:"100%",
                        height:"100%",                       
                        style:{
                            border:"0px solid transparent"
                        }
                    },
                    children:null 
                }  
            },
            windows:{
                "IE1":{
                    snapshot:null
                },
                "IE2":{
                    snapshot:null
                }
            }
        },
        { id:1,name:"文件浏览器",image:"static/images/library.png", where:["taskbar","startmenu"],render:"Button",fixed:true,type:"CustomApp"},
        { id:2,name:"视频播放器",image:"static/images/mp.png", where:["taskbar","startmenu"],render:"Button",fixed:true,type:"CustomApp"}
    ],
    SystemWins:[
        { 
            id:"StartMenu",name:"开始菜单",image:"", where:["bottom","left"],render:"StartMenuWidget",fixed:true,
            type:"SystemWin",position:{y:0,x:0}, width:440,height:540,content:null,show:false,app_id:"StartMenu"
        },
        //{ id:1,name:"控制面板",image:"", where:["top","left"],render:"ControlPanel",fixed:false,type:"SystemWin"}
    ],
    CustomWins:[
        { 
            id:"IE1",name:"百度一下，你就知道了",image:"", where:["top","left"],render:"Window",fixed:true,type:"CustomWin",
            position:{y:100,x:100}, width:1024,height:700, show:true,app_id:"IE",
            content:{ 
                render:"iframe",
                config:{ 
                    src:"http://www.baidu.com",
                    width:"100%",
                    height:"100%",                       
                    style:{
                        border:"0px solid transparent"
                    }
                },
                children:null 
            }  
        },
        { 
            id:"IE2",name:"百度一下，你就知道了",image:"", where:["top","left"],render:"Window",fixed:true,type:"CustomWin",
            position:{y:0,x:0}, width:1024,height:700, show:true,app_id:"IE",
            content:{ 
                render:"iframe",
                config:{ 
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
        { id:0,name:"Administrator",image:"static/images/computer.png", where:["startmenu"],render:"StartMenuButton",fixed:true,type:"StartMenuButton" },
        { id:1,name:"文档",image:"static/images/recycle.png", where:["startmenu"],render:"StartMenuButton",fixed:true,type:"StartMenuButton"},
        { id:2,name:"图片",image:"static/images/network.png", where:["startmenu"],render:"StartMenuButton",fixed:true,type:"StartMenuButton"},
        { id:3,name:"音乐",image:"static/images/start.png",where:["startmenu"],render:"StartMenuButton",fixed:true,type:"StartMenuButton"},
        { id:4,name:"",image:"static/images/computer.png", where:["startmenu"],render:"Splitter",fixed:true,type:"StartMenuButton" },
        { id:5,name:"游戏",image:"static/images/recycle.png", where:["startmenu"],render:"StartMenuButton",fixed:true,type:"StartMenuButton"},
        { id:6,name:"计算机",image:"static/images/network.png", where:["startmenu"],render:"StartMenuButton",fixed:true,type:"StartMenuButton"},
        { id:7,name:"",image:"static/images/start.png",where:["startmenu"],render:"Splitter",fixed:true,type:"StartMenuButton"},
        { id:8,name:"控制面板",image:"static/images/computer.png", where:["startmenu"],render:"StartMenuButton",fixed:true,type:"StartMenuButton" },
        { id:9,name:"设备和打印机",image:"static/images/recycle.png", where:["startmenu"],render:"StartMenuButton",fixed:true,type:"StartMenuButton"},
        { id:10,name:"默认程序",image:"static/images/network.png", where:["startmenu"],render:"StartMenuButton",fixed:true,type:"StartMenuButton"},
        { id:11,name:"运行...",image:"static/images/start.png",where:["startmenu"],render:"StartMenuButton",fixed:true,type:"StartMenuButton"},
        { id:12,name:"关机",image:"static/images/start.png",where:["startmenu"],render:"CloseSystemButton",fixed:true,type:"StartMenuButton"}
    ],
}));
  }
};
