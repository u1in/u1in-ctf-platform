const { id, format, request, ip, calc, json} = require('../tools');
const { GET_SUBMIT, GET_CHALLENGE, UPDATE_CHALLENGE, ADD_SUBMIT, GET_USER } = require('../config/config');
const board = require('../websocket');


const requestFormat = {
    id: Number,
    flag: String,
    token: String,
};

const submit = async ctx => {
    try {
        //验证登录状态
        id(ctx);
        //验证格式
        if (!format(requestFormat, ctx.request.body)) {
            //参数缺失
            throw 'Parameters are illegal!'
        }
        else {
            if (ctx.request.body.token !== ctx.session.token) {
                throw 'Token error!';
            }
            else {
                //检查flag是否已经得到
                let checkSubmit = await request.post(GET_SUBMIT, {
                    user_id: ctx.session.id,
                    challenge_id: ctx.request.body.id,
                    state: [1, 2]
                });
                if (checkSubmit.data.length == 0) {
                    //flag没有成功得到
                    //查询flag
                    let getChallenges = await request.get(GET_CHALLENGE, {
                        id: ctx.request.body.id,
                    });
                    if (getChallenges.code === 1) {
                        //[关键判断]flag提交成功与否
                        if (getChallenges.data.flag === ctx.request.body.flag) {
                            //判断是否一血
                            if (getChallenges.data.solves === 0) {
                                //一血逻辑
                                let data = {
                                    user_id: ctx.session.id,
                                    challenge_id: ctx.request.body.id,
                                    flag: ctx.request.body.flag,
                                    ip: ip(ctx),
                                    state: 2,
                                };
                                //计算分值
                                let score = calc(getChallenges.data.base, getChallenges.data.solves + 1);
                                //更新分值
                                let updateChallenge = await request.post(UPDATE_CHALLENGE, {
                                    challenge_id: ctx.request.body.id,
                                    solves: getChallenges.data.solves + 1,
                                    score: score,
                                })
                                if (updateChallenge.code === 1) {
                                    //更新成功
                                    //将记录写入
                                    let addSubmit = await request.post(ADD_SUBMIT, data);
                                    if (addSubmit.code === 1) {
                                        ctx.response.body = json(1, '正确');
                                        let user = await request.post(GET_USER, {
                                            id: ctx.session.id,
                                        });
                                        if(user.code === 1) {
                                            let text = user.data.username + ' 获得 ' +getChallenges.data.name + ' 一血!';
                                            board(text);
                                        }
                                        else {
                                            throw '获取用户失败';
                                        }
                                    }
                                    else {
                                        throw '成绩录入失败';
                                    }
                                }
                                else {
                                    throw '更新题目分值失败';
                                }
                            }
                            else {
                                //正常逻辑
                                let data = {
                                    user_id: ctx.session.id,
                                    challenge_id: ctx.request.body.id,
                                    flag: ctx.request.body.flag,
                                    ip: ip(ctx),
                                    state: 1,
                                };
                                //计算分值
                                let score = calc(getChallenges.data.base, getChallenges.data.solves + 1);
                                //更新分值
                                let updateChallenge = await request.post(UPDATE_CHALLENGE, {
                                    challenge_id: ctx.request.body.id,
                                    solves: getChallenges.data.solves + 1,
                                    score: score,
                                })
                                if (updateChallenge.code === 1) {
                                    //更新成功
                                    //将记录写入
                                    let addSubmit = await request.post(ADD_SUBMIT, data);
                                    if (addSubmit.code === 1) {
                                        ctx.response.body = json(1, '正确。');
                                        let user = await request.post(GET_USER, {
                                            id: ctx.session.id,
                                        });
                                        if (user.code === 1) {
                                            let text = user.data.username + ' 解出 ' + getChallenges.data.name + '!';
                                            board(text);
                                        }
                                        else {
                                            throw '获取用户失败';
                                        }
                                    }
                                    else {
                                        throw '成绩录入失败';
                                    }
                                }
                                else {
                                    throw '更新题目分值失败';
                                }
                            }
                        }
                        else {
                            let data = {
                                user_id: ctx.session.id,
                                challenge_id: ctx.request.body.id,
                                flag: ctx.request.body.flag,
                                ip: ip(ctx),
                                state: 0,
                            };
                            await request.post(ADD_SUBMIT, data);
                            ctx.response.body = json(0, '错误');
                        }
                    }
                    else {
                        //获取题目失败
                        throw '获取题目失败';
                    }
                }
                else {
                    //flag已经得到
                    throw '你已经答过了'
                }
            }

        }
    }
    catch (error) {
        ctx.response.body = json(0, error);
        console.log(error)
    }
}

module.exports = submit;