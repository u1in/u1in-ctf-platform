# ctf-platform-fontend

> 使用Vue编写的平台前端/客户端

## 前言

才疏学浅，只是代码届的搬运工。总的框架使用Vue.js，其中的图表使用的是Echarts，表格使用了element-ui的表格

## 使用说明

初次使用请进入config.js 文件进行详细配置
```bash
vim ./src/config/config.js
```

初次clone到本地，没有/node_modules文件夹时使用
```bash
npm install
```
安装依赖

依赖安装完毕后，使用
```bash
npm run dev
```
进行本地测试

测试完毕后，使用
```bash
npm run build
```
打包生成代码

将打包生成代码(index.html /static)，放置于服务器的网页根目录下即可。