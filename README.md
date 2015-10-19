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

## Demo

访问[Demo](http://liuhong1happy.github.io/ConsoleWindowApp/demo.html)

## 快速部署

#### 安装docker

    wget -qO- https://get.docker.com/ | sh

#### 运行容器

    docker run -it -d --restart=always --name winapp -p 8080:8080 liuhong1happy/docker-winapp:latest

#### 访问网站

    http://localhost:8080
    
## 快速部署开发环境

#### Ubuntu

    # 安装GCCGO
    sudo apt-get install gccgo-go
    echo PATH="$PATH:$HOME/golang/bin" > /etc/environment
    echo GOPATH="$HOME/golang" >> /etc/environment
    # 注销后继续执行
    # 克隆代码
    go get github.com/liuhong1happy/ConsoleWindowApp
    cd $GOPATH/src/github.com/liuhong1happy/ConsoleWindowApp
    # 安装npm包
    npm install
    # 安装beego
    go get github.com/astaxie/beego
    go get github.com/beego/bee
    # *运行*
    bee run
    # *打包JS*
    npm start
    # *压缩*
    npm run build


