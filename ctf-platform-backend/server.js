const Koa = require('koa');
const koaBody = require('koa-body');
const router = require('./router/router');
const logger = require('koa-logger');

const app = new Koa();

app.use(logger());
app.use(koaBody());
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, '0.0.0.0', () => {
    console.log('starting at port 3000');
});