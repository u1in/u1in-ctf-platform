# ctf-platform-middle

> ctf平台中间件项目

## 前言

代码届的搬运工。总体框架使用koa.js，websocket服务使用ws，http请求服务使用request，随机数生成使用uuid/4，涉及浮点数运算使用decimal.js

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
开启http服务和websocket服务

平台的公告说明（即前端的/index地址对应的数据）可编写markdown文件并放置根目录并命名为index.md即可。平台也支持使用直接编写的HTML文件，同样的放置在根目录并命名为index.html文件即可。二者都存在时优先使用markdown文件。使用index.html时注意前端安全。