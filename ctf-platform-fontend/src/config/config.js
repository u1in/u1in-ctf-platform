/**
 * 地址配置
 */

    /**
     * 后端HTTP地址
     */
    export const BASE_URL = 'http://192.168.1.231:8000';

    /**
     * WebSocket地址
     * 也是排行数据源API
     * method: WebSocket
     * request {}
     * response { code: Number(success: 1 || fail: 0), message: String, data:String}
     * PS: data.data为JSON.stringify后的字符串，解开后的data.data格式为
     * data.data = {
     *      info: String, //推送缘由，一开始可置空
     *      data: [
     *          {
     *              id: Number,
     *              name: String,
     *              score: Number(Float),
     *              challenge: [
     *                  {
     *                      id: Number,
     *                      name: String,
     *                      state: Number(first blood: 2 || normal: 1),
     *                  }
     *              ]
     *          },
     *          {},{},{}
     *      ]
     * }
     */
    export const WEBSOCKET_URL = 'ws://192.168.1.231:9000';

    /**
     * 首页数据源接口
     * method: GET
     * request {}
     * response { code: Number(success: 1 || fail: 0), message: String, data:String}
     */
    export const INDEX_URL = '/index';

    /**
     * 挑战数据源API
     * method: GET
     * request {}
     * response { code: Number(success: 1 || fail: 0), message: String, data: {
     *      misc: [{
     *          id: Number,
     *          name: String,
     *          fb: Number(Float),
     *          solves: Number,
     *          solved: Boolean,
     *          type: String,
     *          desc: String,
     *          avatar: String,
     *      }, {}, {}],
     *      web: [],
     *      ...
     *  }
     * }
     */
    export const CHALLENGE_URL = '/challenges';

    /**
     * 队伍数据源接口
     * method: GET
     * request {id: String}
     * response { code: Number(success: 1 || fail: 0), message: String, data: {
     *      name: String,
     *      info: [{
     *          id: Number,
     *          name: String,
     *          score: Number(Float),
     *          type: String,
     *          base: Number,
     *          time: String,
     *          state: Number(first blood: 2 || normal: 1),
     *      }, {}, {}, {}]
     *  }
     * }
     */
    export const TEAM_URL = '/team';

    /**
     * 登陆接口
     * method: POST
     * request {username: String, password: String}
     * response { code: Number(success: 1 || fail: 0), message: String, data: {
     *      id: Number,
     *      name: String,
     *      token: String,
     *  }
     * }
     */
    export const LOGIN_URL = '/login';

    /**
     * 注册接口
     * method: POST
     * request {username: String, password: String}
     * response { code: Number(success: 1 || fail: 0), message: String }
     */
    export const REGISTER_URL = '/register';

/**
 * 地址配置结束
 */

/**
 * 常量配置
 */

    /**
     * 平台名称
     * 用于顶部导航栏展示
     */
    export const CTF_NAME = 'CTF Platform';

    /**
     * 比赛开始时间
     * 计算解题走势
     */
    export const START_TIME = '2018-11-26 00:00:00';

    /**
     * 提交Flag输入框提示信息
     * 用于设置提交Flag的input组件的placeholder信息
     */
    export const PLACEHOLDER = 'Flag请提交完整字符串。';

    /**
     * 排行榜右上角消息
     * 当初次加载排行榜都会在右上角提示信息，新消息推送时应该更新信息
     * 使用$$替换新消息中的info, 使用@@替换新消息的时间
     */
    export const NEWINFO = '$$ WebSocket更新于@@';


/**
 * 常量配置结束
 */

/**
 * 样式配置
 */

    /**
     * 主题后景色（例如顶部导航栏的背景色，打勾符号的颜色，题目分类的字体颜色，题目描述的背景色，题目信息关闭按钮的背景色
     */
    export const BACK_GROUND_COLOR = '#229AB8';

    /**
     * 主题前景色（例如字体颜色，题目信息顶部标题栏背景色
     */
    export const FORE_GROUND_COLOR = '#FFFFFF';

    /**
     * 奖励颜色（例如一血旗子颜色，题目进度100%颜色
     */
    export const BONUS_COLOR = '#C03D3D';

    /**
     * 解题标志（例如例如默认的旗子
     * 字体库为fontawesome
     * 可以去官网挑选想要的图标
     * https://fontawesome.com
     */
    export const FLAG_FONT = ['fa', 'fa-flag'];


/**
 * 样式配置结束
 */