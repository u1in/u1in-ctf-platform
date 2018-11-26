let db = require('../model/db');

const postUsers = async (ctx) => {
    try {
        if(ctx.request.body.id != undefined) {
            let res = await db.Users.findOne({
                where: {
                    id: ctx.request.body.id
                }
            });
            let response = {
                code: 1,
                message: 'SETELECT Success!',
                data: res.dataValues,
            }
            ctx.response.body = JSON.stringify(response);
        }
        else {
            let res = await db.Users.findAll();
            let response = {
                code: 1,
                message: 'SETELECT Success!',
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

module.exports = postUsers;