var request = require('request');
const CONFIG = require('../config/config');

function get(api, data) {
    let url = CONFIG.BASE_URL + api;
    if(data != undefined) {
        let query = '';
        for (let i in data) {
            query += (i + '=' + data[i] + '&');
        }
        url = CONFIG.BASE_URL + api + '?' + query;
    }
    return new Promise((resolve, reject) => {
        request(url, function (error, response, body) {
            if (error) {
                reject(error);
            }
            else {
                resolve(JSON.parse(body));
            }
        });
    });
}

function post(api, data) {
    let options = {
        method: 'POST',
        url: CONFIG.BASE_URL + api,
        json: true,
        body: data,
        headers: {
            "content-type": "application/json",
        },
    };
    return new Promise((resolve, reject) => {
        request(options, function (error, response, body) {
            if(error) {
                reject(error);
            }
            else {
                resolve(body);
            }
        });
    })
}

module.exports = {
    get,
    post,
};