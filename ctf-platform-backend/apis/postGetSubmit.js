let db = require('../model/db');

const getSubmit = async (ctx) => {
    try {
        let resS = await db.Submit.findAll({
            where: ctx.request.body,
        });
        let response = {
            code: 1,
            message: 'SELECT Success!',
            data: resS,
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

module.exports = getSubmit;