let db = require('../model/db');

const getChallenges = async (ctx) => {
    try {
        //没有get参数 查询所有
        if (ctx.request.query.id == undefined) {
            let res = await db.Challenges.findAll();
            let response = {
                code: 1,
                message: 'SELECT Success!',
                data: res,
            }
            ctx.response.body = JSON.stringify(response);
        }
        //存在get参数 查询指定
        else {
            let res = await db.Challenges.findOne({
                where: {
                    id: ctx.query.id
                }
            });
            let response = {
                code: 1,
                message: 'SELECT Success!',
                data: res,
            }
            ctx.response.body = JSON.stringify(response);
        }
    } catch (error) {
        let response = {
            code: 0,
            message: error
        }
        ctx.response.body = JSON.stringify(response);
        console.log(error);
    }
}

module.exports = getChallenges;