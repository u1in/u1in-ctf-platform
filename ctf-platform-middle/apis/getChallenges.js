const { request, json, process, id } = require('../tools');
const { GET_CHALLENGE, GET_SUBMIT,  } = require('../config/config');

const responseFormat = {
    id: Number,
    type: String,
    name: String,
    desc: String,
    fb: Number,
    avatar: String,
    solves: Number,
}

const challenges = async (ctx) => {
    try {
        //验证身份信息
        id(ctx);
        let resC = await request.get(GET_CHALLENGE);
        if (resC.code === 1) {
            //查询解出的题目
            let checkSubmit = await request.post(GET_SUBMIT, {
                user_id: parseInt(ctx.session.id),
                state: [1, 2]
            });
            if (checkSubmit.code === 1) {
                let processData = process(responseFormat, resC.data);
                //用于统计类型
                let typeArray = [];
                //用于存放分类结果
                let result = {};
                for (let i in processData) {
                    processData[i].solved = false;
                    for (let ii in checkSubmit.data) {
                        if(processData[i].id === checkSubmit.data[ii].challenge_id) {
                            processData[i].solved = true;
                        }
                    }
                    //归类
                    if (typeArray.indexOf(processData[i].type) < 0) {
                        typeArray.push(processData[i].type);
                        result[processData[i].type] = [];
                        result[processData[i].type].push(processData[i]);
                    }
                    else {
                        result[processData[i].type].push(processData[i]);
                    }
                }
                ctx.response.body = json(1, 'Query Success', result);
            }
            else {
                throw 'GET Submit Error!';
            }
        }
        else {
            throw resC.message.name;
        }
    } catch (error) {
        ctx.response.body = json(0);
        console.log(error)
    }
}

module.exports = challenges;