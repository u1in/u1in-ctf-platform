let db = require('../model/db');

const login = async (ctx) => {
    try {
        let res = await db.Users.findOne({
            where: {
                username: ctx.request.body.username,
                password: ctx.request.body.password,
            }
        });
        let response = {
            code: 1,
            message: 'SELECT Success!',
            data: res,
        }
        ctx.response.body = JSON.stringify(response);
    } catch (error) {
        let response = {
            code: 0,
            message: error
        }
        ctx.response.body = JSON.stringify(response);
        console.log(error);
    }
}
module.exports = login;