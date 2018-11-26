const Decimal = require('decimal.js');

/**
 * 用于计算题目实时分值的函数
 * @param {Number} score 题目基础分数
 * @param {Number} solved 题目解出来的人数
 * @param {Number} fb 一血奖励
 */
function calc(score, solved, fb) {
    if(fb === undefined) {
        //一般模式
        //初始化各个参数
        score = new Decimal(score);
        solved = new Decimal(solved);
        let base = new Decimal(1);
        let each = new Decimal(0.1);

        // 题目分值score /(基础因子base + 每人占比each * 解出人数solved)
        let result = score.div(base.add(each.mul(solved))).toFixed(3);
        
        //转为数值
        result = new Decimal(result).toNumber();

        return result;
    }
    else {
        //一血模式
        //初始化各个参数
        score = new Decimal(score);
        solved = new Decimal(solved);
        fb = new Decimal(fb);
        let base = new Decimal(1);
        let each = new Decimal(0.1);

        // (题目分值score /(基础因子base + 每人占比each * 解出人数solved)) * 一血倍数奖励fb
        let result = score.div(base.add(each.mul(solved))).mul(fb).toFixed(3);

        //转为数值
        result = new Decimal(result).toNumber();

        return result;
    }
}

module.exports = calc;