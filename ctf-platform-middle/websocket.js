//获取总配置文件
const { WEBSOCKET_URL, WEBSOCKET_PORT, GET_CHALLENGE} = require('./config/config');
const { request, process } = require('./tools');
//装载ws 用于websocket服务
const WebSocket = require('ws');
//装载自定义函数 用户计算返回新的排行榜
const getScoreBoard = require('./apis/wsGetScoreBoard');

//开启WebSocket服务
const wss = new WebSocket.Server({ host: WEBSOCKET_URL, port: WEBSOCKET_PORT });

console.log(`
    WebSocket starting at ${WEBSOCKET_URL}:${WEBSOCKET_PORT}.
`);

//收集连接的客户端信息
var clientList = [];

//当收到连接事件
wss.on('connection', async (ws, req) => {
    //将客户端收录
    clientList.push(ws);
    //生成新的排行榜
    let res = await getScoreBoard();
    let result = undefined;

    //获取不到排行榜，比赛刚刚开始
    if (res.length == 0) {
        let challenge =  await request.get(GET_CHALLENGE);
        if(challenge.code === 1) {
            let responseFormat = {
                id: Number,
                name: String,
            }
            result = {
                info: '',
                start: 1,
                data: process(responseFormat, challenge.data),
            }
        }
    }

    else {
        //首次请求不返回info
        result = {
            info: '',
            data: res,
        }
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
const board = async (text) => {
    
    //统计新的活跃客户端
    let newClient = [];
    //生成新的排行榜
    let res = await getScoreBoard();
    //附带广播信息
    let result = {
        info: text,
        data: res,
    }
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
}

module.exports = board;