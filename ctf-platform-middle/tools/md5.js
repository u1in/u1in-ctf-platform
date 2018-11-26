const crypto = require('crypto');
const { SALT } = require('../config/config');

function md5(password) {
    var md5 = crypto.createHash('md5');
    return md5.update(password + SALT).digest('hex');
}

module.exports = md5;
