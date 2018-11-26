const { format, md5, json, request} = require('../tools');
const { RIGISTER } = require('../config/config');

const requestFormat = {
    username: String,
    password: String,
};

const register = async ctx => {
    if (!format(requestFormat, ctx.request.body)) {
        //参数缺失
        throw 'Parameters are illegal!'
    }
    else {
        //验证通过
        let data = {
            username: ctx.request.body.username,
            password: md5(ctx.request.body.password),
        }
        try {
            let res = await request.post(RIGISTER, data);
            if(res.code === 1) {
                ctx.response.body = json(1, 'Register Success');
            }
            else {
                throw res.message.name;
            }
        } catch (error) {
            ctx.response.body = json(0);
            console.log(error)
        }
    }
}

module.exports = register;