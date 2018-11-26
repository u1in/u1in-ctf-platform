<template>
    <div class="container" :style="{backgroundColor: BACK_GROUND_COLOR}">
        <div class="detai" v-if="showDetail" @click="showToggle">
            <div class="detai-container" @click.stop="">
                <div class="detail-title" :style="{backgroundColor: FORE_GROUND_COLOR}">
                    <div class="avatar">
                        <img src="../../static/images/avatar.jpg">
                    </div>
                    <div>{{info.name}}</div>
                    <div class="detail-close" @click="showToggle" :style="{backgroundColor: BACK_GROUND_COLOR, color: FORE_GROUND_COLOR}">
                        <i class="fa fa-close"></i>
                    </div>
                </div>
                <div class="detail-body" :style="{backgroundColor: BACK_GROUND_COLOR, color: FORE_GROUND_COLOR}">
                    {{info.desc || ''}}
                </div>
            </div>
        </div>
        <div class="middle" @click="showToggle" :style="{color: FORE_GROUND_COLOR}">
            <div class="solved"> {{info.solves}} Solved</div>
            {{info.name}}
        </div>
        <div class="bottom">
            <div class="input-container">
                <input type="text" :placeholder="PLACEHOLDER" v-model="flag" @click="resetSubmit" @keydown.enter="submit" v-if="success !== true">
                <input type="text" :placeholder="PLACEHOLDER" v-model="flag" @click="resetSubmit" @keydown.enter="submit" v-if="success === true" disabled>
                <div class="icon-group">
                    <i class="fa fa-check" @click="submit" v-show="normalCheck === true" :style="{color: BACK_GROUND_COLOR}"></i>
                    <i class="fa fa-circle-o-notch fa-spin" v-show="loading === true" :style="{color: BACK_GROUND_COLOR}"></i>
                    <i class="fa fa-close" v-show="loading === false && success === false" style="color: #d63d3d"></i>
                </div>
            </div>
            <div class="success-cover" v-if="success" :style="{backgroundColor: BACK_GROUND_COLOR, color: FORE_GROUND_COLOR}">
                <i class="fa fa-check"></i>
            </div>
        </div>
    </div>
</template>

<script>
import StarPicker from '@/components/StarPicker';
import { PLACEHOLDER, BACK_GROUND_COLOR, FORE_GROUND_COLOR } from '@/config/config';

    export default {
        props: {
            info: {
                type: Object,
                required: true,
            },
        },
        components: {
            StarPicker,
        },
        data() {
            return {
                PLACEHOLDER,
                BACK_GROUND_COLOR,
                FORE_GROUND_COLOR,

                //展示题目信息开关函数
                showDetail: false,

                //加载中图标开关
                loading: false,

                //题目判定
                success: undefined,

                //提交按钮显示
                normalCheck: true,

                //存放输入信息
                flag: '',
            }
        },
        methods: {
            submit () {
                let data = {
                    id: this.info.id,
                    flag: this.flag,
                    token: localStorage.getItem('token'),
                }
                this.normalCheck = false;
                this.loading = true;
                this.$post('/submit',data).then(resp => {
                    this.loading = false;
                    if(resp.code == 1) {
                        this.success = true;
                        this.info.solves += 1;
                    }
                    else {
                        this.success = false;
                    }
                }).catch(error => {console.log(error)});
            },
            resetSubmit () {
                this.loading = false;
                this.normalCheck = true;
                this.success = undefined;
            },
            showToggle () {
                this.showDetail = !this.showDetail;
            },
        },
        created () {
            this.success = this.info.solved || undefined;
        }
    }
</script>

<style scoped>
@keyframes loading {
    0% {
        width: 0%;
    }
    100% {
        width: 100%;
    }
}
@keyframes success {
    0% {
        transform: scale(0, 0);
        opacity: 0;
    }
    100% {
        transform: scale(1, 1);
        opacity: 1;
    }
}
.container {
    height: 200px;
    width: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 6px gray;
    border-radius: 5px;
    margin: 10px;
    overflow: hidden;
    position: static;
}
.middle {
    height: 160px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 24px;
    cursor: pointer;
    position: relative;
}
.solved {
    font-size: 14px;
    position: absolute;
    right: 5px;
    top: 5px;
    font-size: 12px;
    font-weight: lighter;
}
.bottom {
    height: 40px;
    width: 100%;
    position: relative;
}
.input-container {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.input-container > input{
    height: 100%;
    width: 0;
    flex-grow: 1;
    border: none;
    box-shadow: none;
    outline: none;
    font-size: 12px;
    padding: 0 10px;
    box-sizing: border-box;
}
.icon-group {
    height: 100%;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
}
.icon-group .fa-check {
    cursor: pointer;
}
.success-cover {
    position: absolute;
    height: 100%;
    width: 0%;
    top: 0;
    left: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: loading 1s ease-in-out;
    animation-fill-mode:forwards;
}
.detai {
    height: 100%;
    width: 100%;
    background: rgba(199, 199, 199, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
    display: flex;
    justify-content: center;
    align-items: center;
}
.detai-container {
    height: 600px;
    width: 800px;
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.detail-close {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    right: 10px;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    font-size: 8px;
    font-weight: lighter;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.detail-title {
    height: 50px;
    line-height: 50px;
    width: 100%;
    font-size: 16px;
    box-sizing: border-box;
    padding: 0 10px;
    color: gray;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
}
.detail-body {
    flex-grow: 1;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    overflow: auto;
}
.avatar {
    height: 25px;
    width: 25px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
}
.avatar > img {
    height: 100%;
    width: 100%;
}
</style>