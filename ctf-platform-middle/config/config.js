/**
 * 常量配置
 */
    /**
    * 密码加盐
    */
    const SALT = '02963ee7-2fd7-49dc-8952-7fa234c38b50';
    
    /**
    * Koa监听地址
    */
    const KOA_URL = '0.0.0.0';

    /**
     * WebSocket监听地址
     */
    const WEBSOCKET_URL = '0.0.0.0';

    /**
     * Koa监听端口
     */
    const KOA_PORT = 8000;

    /**
     * WebSocket监听端口
     */
    const WEBSOCKET_PORT = 9000;

    /**
     * 后端地址
     */
    const BASE_URL = 'http://localhost:3000';

 /**
 * 常量配置结束
 */

/**
 * 接口地址配置
 */

    /**
     * 获取题目信息接口
     * method: GET
     */
    const GET_CHALLENGE = '/getChallenges';

    /**
     * 获取提交记录接口
     * method: POST
     * request {user_id: Number, state: Array(state in [0,1,2])}
     * response {code: Number, message: String, data: [{
     *      id: Number,
     *      ip: String,
     *      user_id: Number,
     *      challenge_id: Number,
     *      flag: String,
     *      state: Number,
     *      createdAt: String,
     *      updatedAt: String,
     *  }, {}, {}, {}]
     * }
     */
    const GET_SUBMIT = '/getSubmit';

    /**
     * 获取用户列表接口
     * method: POST
     * request: {id: String} or {}
     * response: {code: NUmber, message: String, data:{
     *      id: Number,
     *      username: String,
     *      password: String,
     *      level: Number,
     *      createdAt: String,
     *      updatedAt: String,
     *  }
     * }
     */
    const GET_USER = '/getUsers';

    /**
     * 注册接口
     * method: POST
     * request: {username: String, password: String};
     * response: {code: Number, message: String, data: {
     *      id: Number,
     *      username: String,
     *      password: String,
     *      createdAt: String,
     *      updatedAt: String,
     *  }
     * }
     */
    const RIGISTER = '/register';

    /**
     * 登陆接口
     * method: POST
     * request: {username: String, password: String};
     * response: {code: Number, message: String, data: {
     *      id: Number,
     *      username: String,
     *      password: String,
     *      createdAt: String,
     *      updatedAt: String,
     *  }
     * }
     */
    const LOGIN = '/login';

    /**
     * 更新题目分值接口
     * method: POST
     * request: {challenge_id: Number, solves: Number, score: Number(Float)}
     * response: {code: Number, message: String}
     */
    const UPDATE_CHALLENGE = '/updateChallenge';

    /**
     * 添加提交记录接口
     * method: POST
     * request: {user_id: Number, challenge_id: Number, flag: String, ip: String, state: Number}
     * response: {code: Number, message: String, data: {
     *      id: Number,
     *      ip: String,
     *      user_id: String,
     *      challenge_id: String,
     *      flag: String,
     *      state: Number,
     *      createdAt: String,
     *      updatedAt: String
     *  }
     * }
     */
    const ADD_SUBMIT = '/addSubmit';

 /**
 * 接口地址配置结束
 */


module.exports = {
    SALT,
    
    KOA_URL,
    WEBSOCKET_URL,
    KOA_PORT,
    WEBSOCKET_PORT,
    BASE_URL,

    GET_CHALLENGE,
    GET_SUBMIT,
    GET_USER,
    RIGISTER,
    LOGIN,
    UPDATE_CHALLENGE,
    ADD_SUBMIT

};