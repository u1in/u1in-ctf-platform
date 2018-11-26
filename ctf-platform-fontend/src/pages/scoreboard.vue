<template>
    <div>
        <Navigate></Navigate>
        <div class="scoreboard-container">
            <div class="scoreboard-title">
                详细排行
                <span class="time">{{board}}</span>
            </div>
            <el-table
                :data="rankData"
                height="650"
                border
                :summary-method="rankData.length > 0 ? getSummaries : undefined"
                show-summary
                style="width: 90%;">
                <el-table-column
                    prop="rank"
                    label="排名"
                    fixed
                    align="center"
                    header-align="left"
                    width="50">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="队名"
                    fixed
                    width="200">
                    <template slot-scope="scope">
                        <router-link :to="{path: '/team/' + scope.row['id']}" tag="div" style="height: 100%; width: 100%; cursor: pointer;">{{scope.row['name']}}</router-link>
                    </template>
                </el-table-column>
                <el-table-column
                    v-for="(value, key) in rankList"
                    :key="key"
                    :prop="key"
                    :label="value"
                    align="center"
                    header-align="left"
                    min-width="150">
                    <template slot-scope="scope">
                        <div v-if="scope.row[key] === 1" :class="FLAG_FONT"></div>
                        <div v-if="scope.row[key] === 2" :class="FLAG_FONT" :style="{color: BONUS_COLOR}"></div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="score"
                    label="队伍总分"
                    fixed="right"
                    align="right"
                    header-align="right"
                    width="100">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import Navigate from '@/components/Navigate';
import { WEBSOCKET_URL, NEWINFO, FLAG_FONT, BONUS_COLOR } from '@/config/config';

export default {
    components: {
        Navigate,
    },
    data() {
        return {
            FLAG_FONT,
            BONUS_COLOR,
            
            rankList: {},
            rankData: [],
            time: '',
            info: '',
            ws: undefined,
        }
    },
    computed: {
        board () {
            return NEWINFO.replace('$$', this.info).replace('@@', this.time);
        }
    },
    methods: {
        getScoreBoard () {
            this.ws = new WebSocket(WEBSOCKET_URL);
            this.ws.onmessage = (data, _this = this) => {
                data = JSON.parse(data.data);
                if(data.start !== undefined) {
                    _this.rankList = {},
                    _this.rankData = [];
                    _this.time = new Date().toLocaleString();
                    this.initTableHeader(data.data);
                }
                else {
                    _this.rankList = {},
                    _this.rankData = [];
                    _this.time = new Date().toLocaleString();
                    _this.info = data.info;
                    _this.initTable(data.data);
                }
            };
        },
        initTableHeader (data) {            
            for(let i in data) {
                this.rankList[data[i].id] = data[i].name;
            }
        },
        initTable (data) {
            let tempResult = [];
            for(let i in data) {
                //顺便生成表头列表
                if(Object.keys(this.rankList).length === 0) {
                    for(let ii in data[i].challenge) {
                        this.rankList[ii] = data[i].challenge[ii].name;
                    }
                }
                let team = {
                    id: data[i].id,
                    name: data[i].name,
                    score: data[i].score,
                }
                for(let ii in data[i].challenge) {
                    team[ii] = data[i].challenge[ii].state;        
                }
                tempResult.push(team);
            }
            tempResult.sort((a, b) => {
                return b.score - a.score;
            })
            
            tempResult.map((data, index) => {
                data.rank = (index + 1);
                data.score = data.score.toFixed(3);
                this.rankData.push(data);
            })
            
            
        },
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
            if(index === 0) {
                sums[index] = '';
                return;
            }
            if (index === 1) {
                sums[index] = '题目解出情况';
                return;
            }
            if(index === (columns.length - 1)) {
                sums[index] = '';
                return;
            }
            const values = data.map(item => (item[column.property] === 0 ? 0 : 1));            
            if (!values.every(value => isNaN(value))) {
                sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                    return prev + curr;
                } else {
                    return prev;
                }
                }, 0);
                sums[index] += ' Solved';
            } else {
                sums[index] = 'N/A';
            }
            });

            return sums;
        },
    },
    mounted () {
        this.getScoreBoard();
    },
    created () {
        this.time = new Date().toLocaleString();
    },
    beforeDestroy () {      
        this.ws.close();
    }
}
</script>

<style scoped>
#scoreboard {
    height: 400px;
    width: 80%;
}
.scoreboard-container {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 100px 20px 20px 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.scoreboard-title {
    height: 40px;
    width: 100%;
    box-sizing: border-box;
    font-size: 20px;
    font-weight: bold;
    text-align: left;
    line-height: 40px;
    margin-bottom: 10px;
    padding-left: 60px;
    padding-right: 20px;
}
.time {
    float: right;
    font-size: 12px;
    font-style: italic;
    font-weight: lighter;
    color: gray;
}
</style>