<template>
    <div class="container">
        <el-dialog title="添加题目" :visible.sync="dialogFormVisible" width="300">
            <el-form :model="form">
                <el-form-item label="题目类型" :label-width="formLabelWidth">
                    <el-autocomplete
                        v-model="form.type"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入内容"
                        @select="handleSelect"
                        :trigger-on-focus="true"
                        style="float: left"
                        >
                    </el-autocomplete>
                </el-form-item>
                <el-form-item label="题目名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="题目描述" :label-width="formLabelWidth">
                    <el-input v-model="form.desc" autocomplete="off" type="textarea" :rows="3"></el-input>
                </el-form-item>
                <el-form-item label="一血奖励" :label-width="formLabelWidth">
                    <el-input-number v-model="form.fb" :precision="2" :step="0.1" :max="10" style="float: left"></el-input-number>
                </el-form-item>
                <el-form-item label="题目分数" :label-width="formLabelWidth">
                    <el-input v-model="form.base" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="题目FLAG" :label-width="formLabelWidth">
                    <el-input v-model="form.flag" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">关 闭</el-button>
                <el-button type="primary" @click="addChallenge">创 建</el-button>
            </div>
        </el-dialog>
        <div class="top-bar">
            <el-input
                v-model="search"
                placeholder="请输入想搜索的内容"
                prefix-icon="el-icon-search"
                :style="{width: '400px'}"
                >
            </el-input>
            <el-button type="primary" icon="el-icon-plus" circle @click="dialogFormVisible = true"></el-button>
        </div>
        <el-table
        :data="data.filter(data => (!search || data.name.toLowerCase().includes(search.toLowerCase()) || data.username.toLowerCase().includes(search.toLowerCase()) || data.ip.toLowerCase().includes(search.toLowerCase())))"
        height="100%"
        style="width: 100%">

            <el-table-column
            label="用户名"
            prop="username"
            :filters="userFilter"
            :filter-method="filterHandler"
            >
            </el-table-column>

            <el-table-column
            label="题目名"
            prop="name"
            :filters="challengeFilter"
            :filter-method="filterHandler"
            >
            </el-table-column>

            <el-table-column
            label="题目类型"
            prop="type"
            :filters="typeFilter"
            :filter-method="filterHandler"
            >
            </el-table-column>

            <el-table-column
            label="提交信息"
            prop="flag">
            </el-table-column>

            <el-table-column
            label="实际地址"
            prop="ip"
            :filters="ipFilter"
            :filter-method="filterHandler"
            >
            </el-table-column>

            <el-table-column
            label="计分模式"
            prop="state"
            :filters="[{ text: '一血模式', value: 2 }, { text: '普通模式', value: 1 }, { text: '不通过', value: 0}]"
            :filter-method="filterHandler"
            >
            </el-table-column>

            <el-table-column
            label="提交时间"
            prop="createdAt">
            </el-table-column>

        </el-table>
    </div>
</template>

<script>
import {WS_URL, HTTP_URL} from './config.js';
export default {
    data() {
        return {
            data: [],
            usernameList: [],
            challengeList: [],
            typeList: [],
            ipList: [],
            text: '',
            search: '',
            dialogFormVisible: false,

            stateList: [],
            ws: undefined,
            formLabelWidth: '100px',
            form: {
                type: '',
                name: '',
                desc: '',
                flag: '',
                fb: 1.2,
                base: 1000,
            }
        }
    },
    computed: {
        typeFilter () {
            let result = [];
            for(let i in this.typeList) {
                let temp = {
                    text: this.typeList[i],
                    value: this.typeList[i]
                }
                result.push(temp);
            }
            return result;
        },
        userFilter () {
            let result = [];
            for(let i in this.usernameList) {
                let temp = {
                    text: this.usernameList[i],
                    value: this.usernameList[i]
                }
                result.push(temp);
            }
            return result;
        },
        challengeFilter () {
            let result = [];
            for(let i in this.challengeList) {
                let temp = {
                    text: this.challengeList[i],
                    value: this.challengeList[i]
                }
                result.push(temp);
            }
            return result;
        },
        ipFilter () {
            let result = [];
            for(let i in this.ipList) {
                let temp = {
                    text: this.ipList[i],
                    value: this.ipList[i]
                }
                result.push(temp);
            }
            return result;
        }

    },
    methods: {
        open() {
            try {
                this.ws = new WebSocket(WS_URL);
            } catch (error) {
                this.$message.error('WebSocket连接失败，请刷新重试。');
            }
            this.ws.onmessage = (data) => {
                console.log(data);
                    
                data = JSON.parse(data.data);
                data.sort( (a,b) => {
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                })
                
                data.map((data) => {
                    if(!this.usernameList.includes(data.username)) {
                        this.usernameList.push(data.username)
                    }
                    if(!this.challengeList.includes(data.name)) {
                        this.challengeList.push(data.name)
                    }
                    if(!this.ipList.includes(data.ip)) {
                        this.ipList.push(data.ip)
                    }
                    if(!this.typeList.includes(data.type)) {
                        this.typeList.push(data.type)
                    }
                    data.createdAt = new Date(data.createdAt).toLocaleString();
                    
                    this.data.unshift(data);
                })
            }
        },
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
        },
        searchHandler (data) {
            for(let i in data) {
                if(typeof(data[i]) === 'string') {
                    if(data[i].toLowerCase().includes(this.search)) {
                        return true;
                    }
                }
            }
            return false;
        },
        handleSelect (item) {
            this.form.type = item.value;
        },
        querySearch(queryString, cb) {
            var types = this.typeFilter;
            var results = queryString ? types.filter(this.createFilter(queryString)) : types;
            
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (type) => {
                return (type.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        post (data) {
            return new Promise(function (resolve, reject) {
                let XHR = new XMLHttpRequest();
                XHR.withCredentials = true;

                XHR.open('POST', 'HTTP_URL', true);
                XHR.setRequestHeader("Content-Type", "application/json");

                XHR.send(JSON.stringify(data));

                XHR.onreadystatechange = function () {
                    if (XHR.readyState == 4) {
                        if (XHR.status == 200) {
                            try {
                                let response = JSON.parse(XHR.responseText);
                                resolve(response);
                            } catch (e) {
                                reject(e);
                            }
                        } else {
                            reject(new Error(XHR.statusText));
                        }
                    }
                }
            })
        },
        addChallenge () {
            this.post(this.form).then(resp => {
                if(resp.code === 1) {
                    this.$message({
                        message: resp.message,
                        type: 'success',
                    });
                    this.form = {
                        type: '',
                        name: '',
                        desc: '',
                        flag: '',
                        fb: 1.2,
                        base: 1000,
                    };
                    this.dialogFormVisible = false;
                }
                else {
                    this.$message.error(resp.message);
                }
            }).catch(error => {console.log(error)});
        }
    },
    created () {
        this.open();
    },
    beforeDestroy (){
        this.ws.close();
    }
}
</script>

<style scoped>
.container {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 100px 20px 20px 20px;
}
.top-bar {
    height: 80px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
}
</style>