const { request, calc } = require('../tools');
const Decimal = require('decimal.js');

const getScoreBoard = async () => {
    try {
        let challenge = await request.get('/getChallenges');
        if (challenge.code === 1) {
            let user = await request.post('/getUsers');
            if(user.code === 1) {
                let submit = await request.post('/getSubmit', {
                    state: [1,2]
                });
                if(submit.code === 1) {
                    challenge = challenge.data;
                    user = user.data;
                    submit = submit.data;

                    let scoreBoard = [];
                    for(let i in user) {
                        let totalScore = 0;
                        let result = [];
                        for(let ii in challenge) {
                            let state = 0;
                            for(let iii in submit) {
                                if (submit[iii].challenge_id === challenge[ii].id && submit[iii].user_id === user[i].id) {
                                    if (submit[iii].state === 2) {
                                        state = submit[iii].state;                                        
                                        score = calc(challenge[ii].base, challenge[ii].solves, challenge[ii].fb);
                                        let tempScore = Decimal.add(totalScore, score).toFixed(3);
                                        totalScore = new Decimal(tempScore).toNumber();
                                        break;
                                    }
                                    else if (submit[iii].state === 1) {
                                        state = submit[iii].state;
                                        score = challenge[ii].score; 
                                        let tempScore = Decimal.add(totalScore, score).toFixed(3);
                                        totalScore = new Decimal(tempScore).toNumber();                            
                                        break;
                                    }
                                }
                            }
                            let temp = {
                                id: challenge[ii].id,
                                name: challenge[ii].name,
                                state: state
                            };
                            result.push(temp);
                        }
                        //不返回没有分数的队伍
                        if (totalScore != 0) {
                            let temp = {
                                id: user[i].id,
                                name: user[i].username,
                                score: totalScore,
                                challenge: result,
                            }
                            scoreBoard.push(temp);
                        }
                    }

                    return scoreBoard;
                }
            }
            else {
                throw 'Get User Fail!';
            }
        }
        else {
            throw 'Get Challenge Fail!';
        }
    } catch (error) {
        json(0);
        console.log(error);
    }
}

module.exports = getScoreBoard;