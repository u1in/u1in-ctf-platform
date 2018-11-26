<template>
    <div class="top" :style="{backgroundColor: BACK_GROUND_COLOR, color: FORE_GROUND_COLOR}">
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
        }
    },
    created () {
        this.page = this.$route.name;
        this.username = localStorage.getItem('username') || '';
        this.userid = localStorage.getItem('userid') || '';
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
</style>