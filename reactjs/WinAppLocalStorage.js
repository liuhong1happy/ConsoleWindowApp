module.exports = {
  init: function() {
        if(window.Env =="dev") localStorage.clear();
        if(localStorage.getItem('winSettings')==null){
            localStorage.clear();
            localStorage.setItem('winSettings', JSON.stringify({
            UserInfos:{
                login:false,
                user_name:"",
                user_email:"test@test.com",
                user_mobile:"12345678910"
            },
            SystemApps:[
                { id:0,name:"计算机",image:"static/images/computer.ico", where:["desktop"],render:"Button",fixed:true,type:"SystemApp",                     config:{ 
                            render:"Window",position:{y:110,x:110}, width:1024,height:700, type:"SystemWin",                
                            content:{ 
                                render:"FileManageForm",
                                config:{ 
                                    width:"100%",
                                    height:"100%"
                                },
                                children:null 
                            }
                       }
                },
                { id:1,name:"回收站",image:"static/images/recycle.png", where:["desktop"],render:"Button",fixed:true,type:"SystemApp"},
                { id:"app_manage",name:"我的应用",image:"static/images/app_manage.png", where:["desktop","taskbar","startmenu"],render:"Button",fixed:true,type:"SystemApp",
                    config:{ 
                            render:"Window",position:{y:100,x:100}, width:1024,height:700, type:"SystemWin",                
                            content:{ 
                                render:"AppManageForm",
                                config:{ 
                                    width:"100%",
                                    height:"100%"
                                },
                                children:null 
                            }
                       }
                },
                { 
                     id:"app_store",name:"应用商店",image:"static/images/app_store.png", where:["desktop","taskbar","startmenu"],render:"Button",fixed:true,type:"SystemApp",
                     config:{ 
                            render:"Window",position:{y:110,x:110}, width:1024,height:700, type:"SystemWin",                
                            content:{ 
                                render:"AppStoreForm",
                                config:{ 
                                    width:"100%",
                                    height:"100%"
                                },
                                children:null 
                            }
                       }
                },
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
                        }
                    }
                }
            ],
            SystemWins:[
                { 
                    id:"StartMenu",name:"开始菜单",image:"", where:["bottom","left"],render:"StartMenuWidget",fixed:true,
                    type:"SystemWin",position:{y:0,x:0}, width:440,height:540,content:null,show:false,app_id:"StartMenu"
                },

            ],
            CustomWins:[
                { 
                    id:"IE1",name:"百度一下，你就知道了",image:"", where:["top","left"],render:"Window",fixed:true,type:"CustomWin",
                    position:{y:200,x:200}, width:1024,height:700, show:true,app_id:"IE",
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
            
            localStorage.setItem('storeApps',JSON.stringify([
                {
                name:"2048",
                image:"http://gabrielecirulli.github.io/2048/favicon.ico",
                version:"1.0.0",
                currentVersion:"1.0.0",
                category:"game",
                content:{
                    render:"iframe",
                    config:{
                        src:"https://github.com/gabrielecirulli/2048",
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
                    name:"新浪新闻",
                    image:"http://www.sina.com.cn/favicon.svg",
                    version:"1.0.0",
                    currentVersion:"1.0.0",
                    category:"news",
                    content:{
                        render:"iframe",
                        config:{
                            src:"http://news.sina.com.cn/",
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
                    name:"网易新闻",
                    image:"http://news.163.com/favicon.ico",
                    version:"1.0.0",
                    currentVersion:"1.0.0",
                    category:"news",
                    content:{
                        render:"iframe",
                        config:{
                            src:"http://news.163.com",
                            width:"100%",
                            height:"100%",         
                            style:{
                                border:"0px solid transparent"
                            }
                        },
                        children:null
                    }
                },
            ]))
            
            localStorage.setItem('fileSystem',JSON.stringify({
                tree:{},
                favorite:[]
            }))
        }
  }
};
