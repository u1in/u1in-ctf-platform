//装载ws 用于websocket服务
const WebSocket = require('ws');

const { DATABASE_NAME, WEBSOCKET_URL, WEBSOCKET_PORT } = require('./config/config');

const db = require('./model/db');

//开启WebSocket服务
const wss = new WebSocket.Server({ host: WEBSOCKET_URL, port: WEBSOCKET_PORT });

console.log(`
    WebSocket starting at ${WEBSOCKET_URL}:${WEBSOCKET_PORT}.
`);

let query = 'SELECT ctf.submits.id, ctf.submits.flag, ctf.submits.ip, ctf.submits.state, ctf.submits.createdAt, ctf.users.username, ctf.challenges.name, ctf.challenges.type FROM ctf.submits, ctf.challenges, ctf.users WHERE ctf.submits.user_id = ctf.users.id AND ctf.submits.challenge_id = ctf.challenges.id;'.replace('ctf', DATABASE_NAME);
let queryWhere = 'SELECT ctf.submits.id, ctf.submits.flag, ctf.submits.ip, ctf.submits.state, ctf.submits.createdAt, ctf.users.username, ctf.challenges.name, ctf.challenges.type FROM ctf.submits, ctf.challenges, ctf.users WHERE ctf.submits.user_id = ctf.users.id AND ctf.submits.challenge_id = ctf.challenges.id AND ctf.submits.id = '.replace('ctf', DATABASE_NAME);

//收集连接的客户端信息
var clientList = [];

var temp = undefined;

//当收到连接事件
wss.on('connection', async (ws, req) => {

    ws.readyState = WebSocket.OPEN;

    //将客户端收录
    clientList.push(ws);

    let result = temp;
    if (result == undefined) {
        result = await db.db.query(query, { type: db.db.QueryTypes.SELECT });
        temp = result;
    }

    //当收到关闭事件
    ws.on('close', (ws) => {
        //将客户端标记为关闭
        ws.readyState = WebSocket.CLOSED;
    })

    
    //发送初次信息
    ws.send(JSON.stringify(result));
});

//对外暴露的广播函数， 接收新消息为参数
const board = async (id) => {

    //统计新的活跃客户端
    let newClient = [];
    //生成新的排行榜
    let result = await db.db.query(queryWhere + id + ';', { type: db.db.QueryTypes.SELECT})
    //JSON化
    result = JSON.stringify(result);

    //遍历历史客户端列表
    clientList.forEach((client) => {
        //若客户端标记为活跃
        if (client.readyState === WebSocket.OPEN) {
            //收录至新客户端列表
            newClient.push(client);
            //广播消息
            client.send(result);
        }
    });

    //更新客户端列表
    clientList = newClient;

    temp.push(result);
}

module.exports = board;