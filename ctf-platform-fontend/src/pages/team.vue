<template>
    <div class="container">
        <Navigate></Navigate>
        <div class="middle">
            <div class="team-name" :style="{color: BACK_GROUND_COLOR}">
                {{name}}
            </div>
            <div class="chart-group">
                    <div id="scoreboard"></div>
            </div>
            <div class="bottom">
            <div class="left">
                <div id="pie"></div>
                <div class="progress-group">
                    <div class="progress-title">解题进度</div>
                    <Progress v-if="progressData.length > 0" v-for="(item, index) in progressData" :key="index" :height="'5px'" :width="'240px'" :color="item.color" :percent="item.value" :name="item.name"></Progress>
                </div>
            </div>
            <div class="right">
                <div class="table-name">
                    解题信息
                </div>
                <el-table
                :data="timeData"
                height="350px"
                border
                style="width: 90%">
                    <el-table-column
                    prop="time"
                    label="答题时间"
                    width="200">
                    </el-table-column>
                    <el-table-column
                    prop="type"
                    label="题目类型">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="题目名称">
                    </el-table-column>
                    <el-table-column
                    prop="score"
                    label="题目分值">
                    </el-table-column>
                    <el-table-column
                    prop="state"
                    label="记分模式">
                    <template slot-scope="scope">
                        <div v-if="scope.row.state === 1">普通计分</div>
                        <div v-if="scope.row.state === 2" :style="{color: BONUS_COLOR}">一血计分</div>
                    </template>
                    </el-table-column>
                </el-table>
                <div class="table-name">
                    解题分布
                </div>
                <el-table
                :data="rankData"
                border
                style="width: 90%">
                    <el-table-column
                    v-for="(item, index) in info"
                    :key="index"
                    :prop="'rank'+item.id"
                    :label="item.name"
                    align="center"
                    header-align="left"
                    min-width="100">
                    <template slot-scope="scope">
                        <div v-if="scope.row['rank'+item.id] === 0"></div>
                        <div v-if="scope.row['rank'+item.id] === 1" :class="FLAG_FONT"></div>
                        <div v-if="scope.row['rank'+item.id] === 2" :class="FLAG_FONT" :style="{color: BONUS_COLOR}"></div>
                    </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import Navigate from '@/components/Navigate'
import Progress from '@/components/Progress'
import { TEAM_URL, BACK_GROUND_COLOR, FORE_GROUND_COLOR, BONUS_COLOR, FLAG_FONT, START_TIME } from '@/config/config';

// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require("echarts/lib/chart/pie");
//引入折线图
require("echarts/lib/chart/line");

// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

export default {
    components: {
        Navigate,
        Progress
    },
    data() {
        return {
            BACK_GROUND_COLOR,
            FORE_GROUND_COLOR,
            BONUS_COLOR,
            FLAG_FONT,

            name: undefined,
            info: undefined,
            rankData: [],
            timeData: [],
            pieData: [],
            progressData: [],
            lineData: []
        }
    },
    methods: {
        drawPie () {
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById('pie'));
            let option = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                title: {
                    text: '分值占比',
                    left: 'left',
                    top: 10,
                    textStyle: {
                        color: '#000'
                    }
                },
                series : [
                    {
                        name:'分值占比',
                        type:'pie',
                        radius : '70%',
                        center: ['50%', '50%'],
                        data: this.pieData || {},
                        roseType: 'radius',
                        label: {
                            normal: {
                                textStyle: {
                                    color: 'rgba(0, 0, 0, 0.8)'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: 'rgba(0, 0, 0, 0.6)'
                                },
                                smooth: 0.2,
                                length: 10,
                                length2: 20
                            }
                        },

                        animationType: 'scale',
                        animationEasing: 'elasticOut',
                        animationDelay: function (idx) {
                            return Math.random() * 200;
                        }
                    }
                ]
            };
            // 绘制图表
            myChart.setOption(option);
        },
        drawScoreboard () {
            let options =  {
                title: {
                    text: '解题走势'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {
                            show: true,
                            title: '保存'
                        }
                    }
                },
                xAxis: {
                    type: 'category',
                    name: '时间',
                    data: (() => {
                        let array = [];
                        for(let i = 0; i <= 36; i++) {
                            let time = (9+i)%24;
                            time = time > 9 ? time + ':00' : '0' + time +':00';
                            array.push(time);
                        }
                        return array;
                    })(),
                },
                yAxis: {
                    type: 'value',
                    minInterval: 1,
                    name: '解题数',
                },
                series: [
                    {
                        type:'line',
                        step: 'middle',
                        data: this.lineData,
                    },
                ]
            };
            let myChart = echarts.init(document.getElementById('scoreboard'));
            myChart.setOption(options);
        },
        getInfo () {
            let data = {
                id: this.$route.params.id
            }
            this.$get(TEAM_URL, data).then(resp => {                
                if(resp.code === 1) {
                    this.name = resp.data.name;
                    this.info = resp.data.info;
                    let rankData = {};
                    let timeData = [];
                    let pieType = [];
                    let pieData = {};
                    let progressData = {};
                    for(let i in resp.data.info) {
                        //此处循环的是所有的题目信息 题目信息里面会掺杂对应的个人信息

                        //记录每一条题目信息生成rankData，用于标记题目的完成情况
                        rankData['rank'+resp.data.info[i].id] = resp.data.info[i].state;

                        //接着处理题目信息
                        if(resp.data.info[i].state === 1) {
                            //若已经获得Flag, 并且是普通模式
                            //处理timeData

                            //设置临时变量
                            let temp = {
                                //答题时间戳
                                timeStamp: new Date(resp.data.info[i].time),
                                //答题时间戳的字符串
                                time: new Date(resp.data.info[i].time).toLocaleString(),
                                //题目类型
                                type: resp.data.info[i].type,
                                //题目名字
                                name: resp.data.info[i].name,
                                //题目状态
                                state: resp.data.info[i].state,
                                //题目分值
                                score: resp.data.info[i].score,
                            }

                            //收集起来
                            timeData.push(temp);

                            //处理pie图 收集普通分数
                            //判断类型是否已经收录
                            if(pieType.indexOf(resp.data.info[i].type) < 0 ){
                                //若无，则收录
                                pieType.push(resp.data.info[i].type);
                                //收录分值，若无score则对应无人解出题目，则从base里面获取分值
                                pieData[resp.data.info[i].type] = (resp.data.info[i].score || resp.data.info[i].base)
                            }
                            else {
                                //若有，则求和
                                pieData[resp.data.info[i].type] += (resp.data.info[i].score || resp.data.info[i].base)
                            }

                            //处理进度条 收集解决题目数
                            //判断类型是否已经收录
                            if(Object.keys(progressData).indexOf(resp.data.info[i].type) < 0 ){
                                //若无，则收录
                                //因为这个是获得Flag的逻辑，所以总数+1 解题数+1
                                progressData[resp.data.info[i].type] = {
                                    total: 1,
                                    solved: 1,
                                }
                            }
                            else {
                                //若有
                                //因为这个是获得Flag的逻辑，所以总数+1 解题数+1
                                progressData[resp.data.info[i].type].total += 1;
                                progressData[resp.data.info[i].type].solved += 1;
                            }
                        }
                        else if(resp.data.info[i].state === 2) {
                            //若已经获得Flag, 并且一血模式

                            //设置临时变量
                            let temp = {
                                //答题时间戳
                                timeStamp: new Date(resp.data.info[i].time),
                                //答题时间戳的字符串
                                time: new Date(resp.data.info[i].time).toLocaleString(),
                                //题目类型
                                type: resp.data.info[i].type,
                                //题目名字
                                name: resp.data.info[i].name,
                                //题目状态
                                state: resp.data.info[i].state,
                                //题目分值
                                score: resp.data.info[i].score,
                            }

                            //收集起来
                            timeData.push(temp);

                            //处理pie图 收集一血分数
                            //判断类型是否已经收录
                            if(pieType.indexOf(resp.data.info[i].type) < 0 ){
                                //若无，则收录
                                pieType.push(resp.data.info[i].type);
                                //收录分值，若无score则对应无人解出题目，则从base里面获取分值
                                pieData[resp.data.info[i].type] = (resp.data.info[i].score || resp.data.info[i].base)
                            }
                            else {
                                //若有，则求和
                                pieData[resp.data.info[i].type] += (resp.data.info[i].score || resp.data.info[i].base)
                            }

                            //处理进度条 收集解决题目数
                            //判断类型是否已经收录
                            if(Object.keys(progressData).indexOf(resp.data.info[i].type) < 0 ){
                                //若无，则收录
                                //因为这个是获得Flag的逻辑，所以总数+1 解题数+1
                                progressData[resp.data.info[i].type] = {
                                    total: 1,
                                    solved: 1,
                                }
                            }
                            else {
                                //若有
                                //因为这个是获得Flag的逻辑，所以总数+1 解题数+1
                                progressData[resp.data.info[i].type].total += 1;
                                progressData[resp.data.info[i].type].solved += 1;
                            }
                        }
                        else {
                            //若尚未获得Flag

                            //处理pie图 收集没有解决的分数
                            //判断类型是否已经收录
                            if(pieType.indexOf(resp.data.info[i].type) < 0 ){
                                //若无，则收录
                                //因为这个是没有Flag的逻辑，所以分值+0
                                pieType.push(resp.data.info[i].type);
                                pieData[resp.data.info[i].type] = 0;
                            }
                            else {
                                //若有
                                //因为这个是尚未获得Flag的逻辑，所以分值+0
                                pieData[resp.data.info[i].type] += 0;
                            }

                            //处理进度条 收集解决题目数
                            //判断类型是否已经收录
                            if(Object.keys(progressData).indexOf(resp.data.info[i].type) < 0 ){
                                //若无，则收录
                                //因为这个是没有Flag的逻辑，所以总数+1 解题数+0
                                progressData[resp.data.info[i].type] = {
                                    total: 1,
                                    solved: 0,
                                }
                            }
                            else {
                                //因为这个是没有Flag的逻辑，所以总数+1 解题数+0
                                progressData[resp.data.info[i].type].total += 1;
                            }
                        }
                    }
                    //结束循环
                    
                    //将收集到的题目信息存入解题分布表格的信息源
                    //rankData: {rank1: 1, rank2: 2, ...}
                    this.rankData.push(rankData);
                    
                    
                    //timeData 是所有解出题目的信息的列表
                    //按解出时间从早到晚排序
                    timeData.sort((a, b) => {
                        return a.timeStamp.getTime() - b.timeStamp.getTime();
                    })
                    
                    //写入解题信息表格的信息源
                    timeData.map( (data) => {
                        this.timeData.push(data);
                    })

                    //生成pie图数据
                    for(let i in pieData) {
                        let temp = {
                            name: i,
                            value: pieData[i]
                        }
                        this.pieData.push(temp);
                    }
                    //画图
                    this.drawPie();
                    
                    //生成进度条数据
                    for(let i in progressData) {
                        let temp = {
                            //进度条名
                            name: i,
                            //计算百分比
                            value: parseFloat(((progressData[i].solved / progressData[i].total) * 100).toFixed(1)),
                            //进度条颜色
                            color: ((progressData[i].solved / progressData[i].total).toFixed(3) * 100) === 100 ?  BONUS_COLOR : '#666',
                        }
                        //写入进度条信息源
                        this.progressData.push(temp);
                    }                    
                    
                    //比赛开始时间
                    let startStamp = new Date(START_TIME);

                    //收录解题时间相对于比赛开始时间的小时间隔
                    //尝试去构建对象 {1: 2} 用于说明1小时后解题数为2
                    let timeLineDataHour = {};
                    
                    for(let i in this.timeData) { 
                        //判断时间间隔是否收录             
                        if(timeLineDataHour[Math.ceil((this.timeData[i].timeStamp.getTime() - startStamp.getTime()) / (1000 * 60 * 60))] === undefined) {
                            //若无则收录该时间间隔并设置解题数目为1
                            timeLineDataHour[Math.ceil((this.timeData[i].timeStamp.getTime() - startStamp.getTime()) / (1000 * 60 * 60))] = 1;
                        }
                        else {
                            //若有则求和
                            timeLineDataHour[Math.ceil((this.timeData[i].timeStamp.getTime() - startStamp.getTime()) / (1000 * 60 * 60))] += 1;
                        }
                    }
                    
                    
                    //求和生成总的解题数曲线
                    //这个q改成i就是有问题
                    for(let q = 0,j = parseInt(Object.keys(timeLineDataHour)[Object.keys(timeLineDataHour).length - 1]), last = 0; q <= j; q++) {
                        if(timeLineDataHour[q] != undefined) {
                            last += timeLineDataHour[q];
                        }
                        this.lineData.push(last);
                    }
                    //画图
                    this.drawScoreboard();
                    
                }
            }).catch(error => {console.log(error)});
        }
    },
    mounted () {
        this.drawScoreboard();
        this.drawPie();
    },
    created () {
        this.getInfo();
    }
}
</script>

<style scoped>
.container {
    height: 100%;
    width: 100%;
}
.middle {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding-top: 70px;
}
.team-name {
    margin: 40px;
    font-size: 30px;
    font-weight: bold;
    color: #229AB8;
}
.chart-group {
    height: auto;
    width: 100%;
    box-sizing: border-box;
    padding-left: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.left {
    height: 600px;
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.right {
    height: auto;
    width: 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.progress-group {
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.progress-title,
.table-name {
    width: 100%;
    text-align: left;
    font-size: 18px;
    color: #000;
    font-weight: bold;
}
.table-name {
    text-align: center;
    margin: 10px 0;
}
#pie {
    height: 300px;
    width: 400px;
}
#scoreboard {
    height: 400px;
    width: 90%;
    margin-top: 8px;
}
.bottom {
    height: auto;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 20px;
}
</style>