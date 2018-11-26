let db = require('../model/db');

let addSubmit = async (ctx) => {
    try {
        let data = {
            ip: ctx.request.body.ip,
            user_id: ctx.request.body.user_id,
            challenge_id: ctx.request.body.challenge_id,
            flag: ctx.request.body.flag,
            state: ctx.request.body.state,
        }
        let resS = await db.Submit.create(data);

        let response = {
            code: 1,
            message: 'CREATE Success!',
            data: resS
        }

        ctx.response.body = JSON.stringify(response);
    } catch (error) {
        let response = {
            code: 0,
            message: error,
        }
        ctx.response.body = JSON.stringify(response);
    }
}

module.exports = addSubmit;