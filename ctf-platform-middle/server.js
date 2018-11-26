//获取总配置文件
const { KOA_URL, KOA_PORT} = require('./config/config');
//获取koa-session配置变量
const SESSION_CONFIG = require('./config/session');
//装载koa-session
const session = require('koa-session');
//装载koa
const Koa = require('koa');
//装载koa2-cors 解决跨域问题
const cors = require('koa2-cors');
//装载koa-body 解决pust参数获取
const koaBody = require('koa-body');
//装载router 解决路由分发
const router = require('./router/router');
//装载logger 解决临时日志问题
const logger = require('koa-logger');
//装载自定义函数 监听webpack端口
const ws = require('./websocket');

//实例化Koa
const app = new Koa();

//用于session的随机字符串
app.keys = ['caeb46fb-e7be-4a73-b355-32e70a818cbf'];

//设置日志中间件
app.use(logger());
//设置session中间件
app.use(session(SESSION_CONFIG, app));
//设置跨域头
app.use(cors({
    credentials: true,
}));
//获取post参数中间件
app.use(koaBody());
//路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.listen(KOA_PORT, KOA_URL, () => {
    console.log(`
    Koa starting at ${KOA_URL}:${KOA_PORT}.
    `);
});