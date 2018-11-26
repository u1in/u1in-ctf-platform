const { json } = require('../tools');

const logout = async ctx => {
    try {
        ctx.session = null;
        ctx.response.body = json(1, 'Logout Success!');
    } catch (error) {
        ctx.response.body = json(0);
        console.log(error)
    }
}

module.exports = logout;