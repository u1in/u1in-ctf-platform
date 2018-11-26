<template>
    <div class="top" :style="{backgroundColor: BACK_GROUND_COLOR, color: FORE_GROUND_COLOR}">
        <div class="report-container" v-if="respotShow" @click="respotShow = false">
            <div class="report" :style="{color: FORE_GROUND_COLOR}">
                <div class="resport-cover" @click.stop="">
                    <i class="fa fa-arrow-circle-down" style="cursor: pointer" @click.stop="downloadCanvas()"></i>
                </div>
                <canvas ref="canvas" width="338" height="600"></canvas>
            </div>
        </div>

        <div class="logo">{{CTF_NAME}}</div>
        <div class="top-group nav">
            <router-link to="/index" tag="div" :class="page === 'Index' ? 'active' : ''">首页</router-link>
            <router-link to="/challenges" tag="div" :class="page === 'Challenges' ? 'active' : ''" :style="{cursor: userid === '' ? 'not-allowed': ''}">挑战</router-link>
            <router-link to="/scoreboard" tag="div" :class="page === 'Scoreboard' ? 'active' : ''" :style="{cursor: userid === '' ? 'not-allowed': ''}">排行</router-link>
            <router-link :to="'/team/' + userid" tag="div" :class="page === 'Team' ? 'active' : ''" :style="{cursor: userid === '' ? 'not-allowed': ''}">团队</router-link>
        </div>
        <div class="top-group">
            <div v-if="userid != ''" class="name" @click="jump2MyTeam" :style="{cursor: 'pointer'}">{{username}}</div>
            <router-link to="/login" tag="div" v-else>登陆</router-link>
            <div v-if="userid != ''" @click="initReport">成绩单</div>
            <div v-if="userid != ''" @click="logout">登出</div>
        </div>
    </div>
</template>

<script>
import { CTF_NAME, BACK_GROUND_COLOR, FORE_GROUND_COLOR } from '@/config/config';

export default {
    data() {
        return {
            CTF_NAME,
            BACK_GROUND_COLOR,
            FORE_GROUND_COLOR,

            page: '',
            username: '',
            userid: '',

            respotShow: false,
        }
    },
    methods: {
        logout () {
            this.$get('/logout').then(resp => {
                if(resp.code === 1) {
                    localStorage.removeItem('username');
                    localStorage.removeItem('userid');
                    localStorage.removeItem('token');
                    this.$router.push('login');
                }
            })
        },
        jump2MyTeam () {
            this.$router.push('/team/'+this.userid);
        },
        initReport () {
            this.respotShow = !this.respotShow;
            this.$nextTick(function () {
                this.drawCanvas();
            })
        },
        drawCanvas () {
            let ctx = this.$refs.canvas;            
            ctx = ctx.getContext('2d');
            let img = new Image();
            img.crossOrigin="anonymous";
            img.src='../../static/images/wallpaper.jpg';
            img.onload=function(){
                ctx.drawImage(img,0,0,338,600);
                ctx.font="bold 20px sans-serif";
                ctx.fillStyle = 'gray';
                ctx.fillText("假如我年少有为不自卑", 40, 40, 300);
                ctx.fillText("懂得什么是珍贵", 60, 80, 300);
                ctx.fillText("那些美梦", 40, 120, 300);
                ctx.fillText("没给你我一生有愧", 60, 160, 300);
            }
        },
        downloadCanvas () {
            //canvas 节点
            let canvas = this.$refs.canvas;
            // 使用toDataURL方法将图像转换被base64编码的URL字符串
            let url = canvas.toDataURL('image/png')
            // 生成一个a元素
            let a = document.createElement('a')
            // 创建一个单击事件
            let event = new MouseEvent('click')
            
            // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
            a.download = '成绩单';

            // 将生成的URL设置为a.href属性
            a.href = url
            
            // 触发a的单击事件
            a.dispatchEvent(event)
        }    
    },
    created () {
        this.page = this.$route.name;
        this.username = localStorage.getItem('username') || '';
        this.userid = localStorage.getItem('userid') || '';
    },
    mounted() {

    },
}
</script>

<style scoped>
.top {
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 150;
    box-shadow: 0px 2px 4px gray;
}
.logo {
    margin: 20px;
    font-size: 24px;
}
.top-group {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.top-group.nav {
    flex-grow: 1;
    justify-content: flex-start;
}
.top-group > div {
    height: 100%;
    min-width: 80px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    cursor: pointer;
}
.top-group.nav > div:hover {
    border-bottom: 2px solid #ffffff;
}
.active {
    border-bottom: 2px solid #ffffff;
}

.report-container {
    position: fixed;
    top: 70px;
    left: 0;
    height: calc(100% - 70px);
    width: 100%;
    background: rgba(201, 201, 201, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}
.report {
    height: 600px;
    width: 338px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}
.report:hover .resport-cover {
    display: flex;
}
.resport-cover {
    height: 600px;
    width: 338px;
    position: absolute;
    top: 0;
    left: 0;
    background: #666;
    opacity: 0.4;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 100px;
    display: none;
}
</style>