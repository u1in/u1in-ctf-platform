const {format, md5, json, request} = require('../tools');
const { LOGIN } = require('../config/config');
const uuid = require('uuid/v4');

const requestFormat = {
    username: String,
    password: String,
}

const login = async ctx => {
    try {
        if (!format(requestFormat, ctx.request.body)) {
            //参数验证不通过
            throw 'Parameters are illegal!'
        }
        else {
            let data = {
                username: ctx.request.body.username,
                password: md5(ctx.request.body.password),
            };
            let res = await request.post(LOGIN, data);
            if (res.code === 1) {
                //有结果 账号密码正确
                if(res.data != undefined) {
                    let token = uuid();
                    //设置session返回
                    ctx.session.id = res.data.id;
                    ctx.session.token = token;
                    ctx.response.body = json(1, 'Login Success!', {
                        id: res.data.id,
                        username: res.data.username,
                        token: token,
                    });
                }
                //无结果 账号密码不匹配
                else {
                    ctx.response.body = json(0, 'Login Fail!');
                }
            }
            else {
                throw res.message;
            }
        }
    } catch (error) {
        ctx.response.body = json(0);
        console.log(error)
    }
}

module.exports = login;