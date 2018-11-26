# ctf-platform-backend

> ctf平台后端项目

## 前言

代码届的搬运工。总体框架使用koa.js，数据库使用Mysql，ORM使用Sequelize。

## 使用说明

初次使用前请进入config.js 文件进行详细配置
```bash
vim ./config/config.js
```

初次clone到本地，没有/node_modules文件夹时使用
```bash
npm install
```
安装依赖

使用命令
```bash
node server.js
```
开启http服务