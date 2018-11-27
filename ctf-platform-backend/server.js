const Koa = require('koa');
const koaBody = require('koa-body');
const router = require('./router/router');
const logger = require('koa-logger');
const cors = require('koa2-cors');
const ws = require('./websocket');
const { HTTP_URL, HTTP_PORT} = require('./config/config');

const app = new Koa();

app.use(logger());
app.use(cors({
    origin: function (ctx) {
        return `${HTTP_URL}:${HTTP_PORT}`;
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'], //设置允许的HTTP请求类型
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
app.use(koaBody());
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, '0.0.0.0', () => {
    console.log('starting at port 3000');
});