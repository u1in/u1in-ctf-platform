# CTF平台计划

>  emmm  这可能是我人生第一次写给别人用的代码。



## 前言

之前LCTF2018的时候给协会写了一个平台代码，代码写得很惭愧。

加入协会到现在可能没有帮协会带来实质性的帮助，所以只能写写代码这样子维持活跃。

考虑到现在的平台在很多方面上没法满足比赛的要求，本人正好会一点开发知识，所以萌生了这个平台开发计划。



## 设计

考虑到给平台应该让每个人好使用，在此假设使用平台的人仅有少量的编程知识。

平台所有的配置部分应该抽离（颜色代码，主题样式），尽量不要有写死的代码。

考虑到平台的维护，平台内部应该低耦合。



## 需求

考虑到现在很多老的平台已经脱离了很多比赛的需求，新的平台应该现版本比赛的基础需求。个人拙见总结了一些基础需求，欢迎大家指正。



基础需求：

+ 动态积分
+ 首页markdown渲染
+ websocket实时排行榜
+ 解题分布排行榜
+ 多图表个人信息
+ 实时通告



希望可以做到的需求：

+ 生成成绩单图片分享
+ 成就徽章系统
+ 定时上题
+ 题目评分
+ 面向管理者的监控界面



## 架构

考虑到低耦合。

采用**前端** **中间件** **后端 **三端的架构。

前端采用：Vue.js框架

中间件使用:  Koa.js 框架

后端使用: Koa.js框架

数据库使用: Mysql



前端使用Vue.js构建SPA应用保证了客户端不必频繁刷新，一次加载即可使用。

中间使用Koa.js来进行数据格式的约束以及数据的验证还有复杂的JSON格式的构建。

后端使用Koa.js接收可信数据源操作数据库



前中后三端使用http传输JSON数据。



**所以理论上前后端在JSON格式配置相符的情况下，是可以替换的**，方便学弟们换前端展示或者是换后端语言。



选手流程： Vue => Koa验证 => Koa后端 => Mysql数据库

管理流程：Vue => Koa后端 => Mysql数据库



## 现阶段进度

| 需求            | 需求类别 | 备注                                       |
| ------------- | ---- | ---------------------------------------- |
| 动态积分          | 基础需求 | 完成，公式待抽离                                 |
| 首页markdownx渲染 | 基础需求 | 支持md html两种文件渲染                          |
| websocket排行榜  | 基础需求 | 完成                                       |
| 解题分布排行榜       | 基础需求 | 完成                                       |
| 多图表个人信息       | 基础需求 | 完成，折线图功能待定                               |
| 实时通告          | 基础需求 | 尚未完成，计划使用websocket                       |
| 生成成绩单图片分享     | 进阶需求 | 尚未完成，计划使用留白图片填充canvas，然后填充字体生成图片。        |
| 成就徽章系统        | 进阶需求 | 尚未完成。                                    |
| 定时上题          | 尚未完成 | 尚未完成。若客户端尽量不刷新，定时上题就需要提前传题或是websocket通信。比较头疼。 |
| 题目评分          | 尚未完成 | 尚未完成。考虑是否需要。                             |
| 面向管理者的监控界面    | 尚未完成 | 尚未完成。使用websocket应该不难实现，只是需要另写一套前端。       |

