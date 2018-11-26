let db = require('../model/db');

const updateChallengs = async (ctx) => {
    try {
        let data = {
            solves: ctx.request.body.solves,
            score: ctx.request.body.score,
        }
       await db.Challenges.update(data, {
            where: {
                id: ctx.request.body.challenge_id,
            }
        });
        let response = {
            code: 1,
            message: 'UPDATE Success!',
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

module.exports = updateChallengs;