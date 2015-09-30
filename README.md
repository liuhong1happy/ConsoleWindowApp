# ConsoleWindowApp
DockerConsoleApp PaaS平台深度集成产品，用于管理开发者的应用和用户选择使用的应用

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

## 开发日程

- [x] golang、beego和react框架学习。9.21
- [x] 数据库表设计(用户表、应用表、使用者和应用关联表)。10.1
- [x] 前端界面整体呈现。10.7
- [ ] 独立前端，书写文档，可做二次开发 10.7
- [ ] 基于Mongodb的后端Modle 10.7
- [ ] 发布普通应用。10.17
- [ ] 推广应用。11.9
- [ ] 使用者注册。10.17
- [ ] 添加应用。10.26
- [ ] 删除应用。10.26
- [ ] 管理员审核应用。11.9
- [ ] 管理员审核推广应用。11.9
- [ ] 使用者收到推广应用消息。11.9

## 依赖环境

#### Golang
    
0. 环境要求

        ubuntu14.04
        
        python 2.7
        
        gcc等编译工具

1.  golang ppa方式安装

        sudo apt-get install python-dev python-pip
        
        sudo apt-get install -y python-software-properties software-properties-common
        
        sudo add-apt-repository -y ppa:gophers/go
        
        sudo apt-get update
        
        sudo apt-get install -y golang-stable

2. gccgo 方式安装

        sudo apt-get install -y gccgo

3. 长久保存golang环境变量

        # 创建开发路径
        
        sudo mkdir $HOME/golang 
        
        # 编辑/etc/environment
        
        PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/lrong/home/golang/bin"
        
        GOPATH="/lrong/home/golang/bin"

#### node和npm

    apt-get update && apt-get install -y python-software-properties software-properties-common
    add-apt-repository -y ppa:chris-lea/node.js
    apt-get update && apt-get install -y nodejs 
    npm config set registry "http://registry.npm.taobao.org"
    npm install -g n && n 4.0.0
    npm install -g npm@3.3.3

#### beego

    go get github.com/astaxie/beego
    go get github.com/beego/bee

## 快速开始
    
    # 获取代码 
    git clone https://github.com/liuhong1happy/ConsoleWindowApp.git
    # 进入工作路径
    cd ConsoleWindowApp
    # 安装js依赖包
    npm install
    # 打包并压缩JS
    npm run build
    # 运行应用
    bee run
