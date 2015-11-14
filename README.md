# ConsoleWindowApp

无论你是开发者还是应用使用者，让你管理你的云端应用成为可能。

## 技术栈
1. 后端语言 golang
2. 前端框架 react + flux
3. web框架 beego
4. 数据库 mongodb

## 需求介绍

1. 能提供给开发者发布应用的接口，该接口暂时仅支持DockerConsoleApp中发布的应用。
2. 能提供用户注册和使用功能，能添加应用，管理应用列表，删除应用。
3. 禁止用户未添加的应用使用权限（推广APP除外）。
4. 开发者帐号绑定DockerConsoleApp，使用者帐号需要单独注册。
5. 开发者和使用者之间的界面不同，开发者不仅具有使用者的身份，另外具有开发者的身份。
6. 管理员可以审核开发者发布的应用，管理应用的评论。

## 前端开发日程

- [x] react框架的学习。9.21
- [x] Win7桌面。 11.8
- [x] 登录界面。 11.8
- [ ] 应用管理（开发者/使用者）。11.15
- [ ] 应用商店 (使用者)。 11.22

## 后端开发日程

- [x] golang、beego的学习。9.21
- [x] 数据库表设计(用户表、应用表、使用者和应用关联表)。10.1
- [x] session和数据库驱动实现 11.8
- [x] 用户登录 11.8
- [x] 初始化Win7设置信息 11.10
- [x] 获取Win7设置信息 11.10
- [ ] 发布普通应用。11.15
- [ ] 使用者注册。11.15
- [ ] 添加应用。11.15
- [ ] 删除应用。11.15
- [ ] 管理员审核应用。11.15
- [ ] 推广应用。12.9
- [ ] 管理员审核推广应用。12.9
- [ ] 使用者收到推广应用消息。12.9
- [ ] 应用管理(使用者\开发者) 11.5
- [ ] 应用商店(使用者) 12.9

## 系统默认应用-开发日程

- [ ] 文件系统 2016.2.20
- [ ] 音乐播放器 2016.3.1
- [ ] 视频播放器 2016.3.15
- [ ] 在线阅读器[支持Word/PDF/ePub/Markdown等格式]  2016.4.1
- [ ] 代码托管系统[加入应用管理中心] 2016.7.1
- [ ] 镜像和容器管理[加入应用管理中心] 2016.9.1
- [ ] 系统内置游戏[2048,扫雷等游戏] 2016.10.1
- [ ] 控制面板[优化配置设置] 2016.12.1

## Demo

访问[Demo](http://liuhong1happy.github.io/ConsoleWindowApp/demo.html)

## 快速部署

#### 安装docker

    wget -qO- https://get.docker.com/ | sh

#### 运行容器

    docker run -it -d --restart=always --name winapp -p 8080:8080 liuhong1happy/docker-winapp:latest

#### 访问网站

    http://localhost:8080
    
## 快速开始

#### nodejs和golang安装

    # 安装GCCGO[这里只是简便安装的Go，推荐大家还是安装Golang]
    sudo apt-get install gccgo-go
    echo PATH="$PATH:$HOME/golang/bin" >> /etc/environment
    echo GOPATH="$HOME/golang" >> /etc/environment
    # 注销后继续执行
    
    # 安装npm和nodejs
    sudo apt-get install npm
    npm config set registry "http://registry.npm.taobao.org"
    npm install -g npm@3.3.12 n
    n 4.2.1
    npm install -g npm@3.3.12

#### 前提条件

1. 操作系统要求是Ubuntu 14.04 TSL 操作系统。
2. 需要安装nodejs>4.0.0和golang>1.2.0。
3. 要求npm版本为>3.0.0

#### 安装beego

    go get github.com/astaxie/beego
    go get github.com/beego/bee
    
#### 克隆代码

    go get github.com/liuhong1happy/ConsoleWindowApp
    cd $GOPATH/src/github.com/liuhong1happy/ConsoleWindowApp
    
#### 安装npm包

    npm install & npm install -g

#### 安装mongodb和redis

    # 安装docker
    wget -qO- https://get.docker.com/ | sh
    # 安装redis
    docker run -it -d --name redis --restart=always -p 6379:6379 liuhong1happy/docker-redis:pro
    # 安装mongodb
    docker run -it -d --name mongodb -v /var/data/mongodb:/data/db -p 27017:27017  liuhong1happy/docker-mongodb:pro
    # 添加mongodb管理员
    docker exec -it mongodb /bin/bash
    mongo
    use admin
    db.createUser({user: "mongo",pwd: "123456",roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]})
    db.auth("mongo","123456")
    exit
    # 修改bee-run.sh里的session和mongodb配置信息

#### 安装数据库驱动

    go get github.com/garyburd/redigo/redis
    go get github.com/goinggo/beego-mgo

#### 打包压缩js和less并运行

    # *打包JS*
    npm start
    # *压缩*
    npm run build
    # less转css
    lessc less/winapp.less static/css/winapp.css
    # *运行*
    ./bee-run.sh
    


