let db = require('../model/db');

const add = async (ctx) => {
    try {
        let res = await db.Challenges.create(ctx.request.body);
        let response = {
            code: 1,
            message: '创建题目成功。',
            data: res
        }
        ctx.response.body = response;
    } catch (error) {
        let response = {
            code: 0,
            message: error,
        }
        ctx.response.body = response;
        console.log(error);
    }
}

module.exports = add;