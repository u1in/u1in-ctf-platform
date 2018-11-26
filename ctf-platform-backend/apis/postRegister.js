let db = require('../model/db');

const register = async ctx => {
    try {
        let res = await db.Users.create(ctx.request.body);
        let response = {
            code: 1,
            message: 'CREATE Success!',
            data: res
        }
        ctx.response.body = JSON.stringify(response);
    } catch (error) {
        let response = {
            code: 0,
            message: error
        };
        ctx.response.body = JSON.stringify(response);
        console.log(error);
    }
}

module.exports = register;