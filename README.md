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
- [ ] 前端界面整体呈现。10.7
- [ ] 发布普通应用。10.7
- [ ] 推广应用。11.9
- [ ] 使用者注册。10.7
- [ ] 添加应用。10.26
- [ ] 删除应用。10.26
- [ ] 管理员审核应用。11.9
- [ ] 管理员审核推广应用。11.9
- [ ] 使用者收到推广应用消息。11.9

## 快速开始

    git clone https://github.com/liuhong1happy/ConsoleWindowApp.git
    cd ConsoleWindowApp
    npm install
