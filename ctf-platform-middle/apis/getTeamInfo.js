const { format, request, calc, json } = require('../tools');
const { GET_SUBMIT, GET_CHALLENGE, GET_USER} = require('../config/config');

const requestFomat = {
    id: String,
}
const team = async (ctx) => {
    try {
        if (!format(requestFomat, ctx.request.query)) {
            throw 'Parameters are illegal!'
        }
        else {
            //查询解出的题目
            let checkSubmit = await request.post(GET_SUBMIT, {
                user_id: parseInt(ctx.request.query.id),
                state: [1,2]
            });
            if(checkSubmit.code === 1) {
                //查询所有题目
                let challenges = await request.get(GET_CHALLENGE);
                if(challenges.code === 1) {
                    let result = [];
                    for(let i in challenges.data) {
                        let submitInfo = {};
                        for (let ii in checkSubmit.data) {
                            if (checkSubmit.data[ii].challenge_id === challenges.data[i].id) {
                                if (checkSubmit.data[ii].state === 2) {
                                    submitInfo = {
                                        time: checkSubmit.data[ii].createdAt,
                                        state: checkSubmit.data[ii].state,
                                        score: calc(challenges.data[i].base, challenges.data[i].solves, challenges.data[i].fb),
                                    }
                                    break;
                                }
                                else if(checkSubmit.data[ii].state === 1) {
                                    submitInfo = {
                                        time: checkSubmit.data[ii].createdAt,
                                        state: checkSubmit.data[ii].state,
                                        score: challenges.data[i].score,
                                    }
                                    break;
                                }
                            }
                        }
                        if (Object.keys(submitInfo).length != 0) {
                            result.push({
                                id: challenges.data[i].id,
                                name: challenges.data[i].name,
                                score: submitInfo.score,
                                base: challenges.data[i].base,
                                type: challenges.data[i].type,
                                time: submitInfo.time,
                                state: submitInfo.state,
                            })
                        }
                        else {
                            result.push({
                                id: challenges.data[i].id,
                                name: challenges.data[i].name,
                                score: challenges.data[i].score,
                                base: challenges.data[i].base,
                                type: challenges.data[i].type,
                                state: 0,
                            });
                        }
                    }
                    let username = await request.post(GET_USER, {
                        id: ctx.request.query.id,
                    });
                    if(username.code === 1) {
                        ctx.response.body = json(1, '获取团队信息成功', {
                            name: username.data.username,
                            info: result
                        });
                    }
                    else {
                        throw '获取队伍名失败。';
                    }
                }
                else {
                    throw '获取队伍列表失败'
                }
            }
            else {
                throw '获取历史记录失败';
            }
        }
    } catch (error) {
        ctx.response.body = json(0, error);
    }
}

module.exports = team;