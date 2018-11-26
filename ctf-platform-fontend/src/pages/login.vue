<template>
    <div class="container">
        <Navigate></Navigate>
        <div class="login-container">
            <div class="login">
                <div class="login-title">
                    <div class="toggle-button" @click="loginShow = true" :style="{fontSize: loginShow ? '24px' : '20px'}">登陆</div>
                    <div style="font-weight: lighter">|</div>
                    <div class="toggle-button" @click="loginShow = false" :style="{fontSize: loginShow ? '20px' : '24px'}">注册</div>
                </div>
                <div class="input-group" v-show="loginShow">
                    <input type="text" class="login-input" placeholder="团队名" v-model="username">
                    <input type="password" class="login-input" placeholder="密码" v-model="password" @keydown.enter="login">
                    <div class="submit" @click="login">登陆</div>
                </div>
                <div class="input-group" v-show="!loginShow">
                    <input type="text" class="login-input" placeholder="团队名,用于登陆" v-model="registerUsername">
                    <!-- <input type="text" class="login-input" placeholder="邮箱地址,用于找回密码"> -->
                    <input type="password" class="login-input" placeholder="密码" v-model="registerPassword">
                    <input type="password" class="login-input" placeholder="重复密码" v-model="registerRepeatPassword" @keydown.enter="register">
                    <div class="submit" @click="register">注册</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navigate from '@/components/Navigate';
import { LOGIN_URL, REGISTER_URL } from '@/config/config';

export default {
    components: {
        Navigate,
    },
    data() {
        return {
            loginShow: true,
            username: undefined,
            password: undefined,
            registerUsername: undefined,
            registerPassword: undefined,
            registerRepeatPassword: undefined
        }
    },
    methods: {
        login() {
            let data = {
                username: this.username,
                password: this.password
            }
            this.$post(LOGIN_URL, data).then(resp => {
                if(resp.code === 1) {
                    localStorage.setItem('username', resp.data.username);
                    localStorage.setItem('userid', resp.data.id);
                    localStorage.setItem('token', resp.data.token);
                    this.$router.push('challenges');
                }
            }).catch(error => {console.log(error)});
        },
        register () {
            if(this.registerPassword === this.registerRepeatPassword) {
                let data = {
                username: this.registerUsername,
                password: this.registerPassword
            }
            this.$post(REGISTER_URL, data).then(resp => {
                if(resp.code === 1) {
                    this.loginShow = true;
                    this.username = this.registerUsername;
                }
            }).catch(error => {console.log(error)});
            }
        }
    }
}
</script>

<style scoped>
.container {
    height: 100%;
    width: 100%;
}
.login-container {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding-top: 70px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.login {
    height: auto;
    width: 300px;
    background: #229AB8;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 5px;
    color: white;
    margin-top: 100px;
    box-shadow: 0 0 6px gray;
}
.login-title {
    font-size: 24px;
    font-weight: bold;
    margin: 20px 0 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.login-title > div {
    margin: 0 10px;
}
.login-input {
    width: 200px;
    height: 30px;
    box-sizing: border-box;
    border: none;
    border-radius: 4px;
    box-shadow: none;
    margin: 10px;
    padding: 0 10px;
    outline: none;
}
.submit {
    height: 40px;
    line-height: 40px;
    width: 200px;
    background: #ffffff;
    font-size: 20px;
    font-weight: bold;
    color: #229AB8;
    border-radius: 5px;
    text-align: center;
    margin: 10px 10px 30px 10px;
    box-shadow: 0 0 6px gray;
    cursor: pointer;
}
.toggle-button {
    cursor: pointer;
}
.input-group {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
</style>