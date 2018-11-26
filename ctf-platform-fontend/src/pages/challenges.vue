<template>
    <div class="container">
        <Navigate></Navigate>
        <div class="middle">
            <div class="middle-group" v-for="(value, key) in challengesObject" :key="key">
                <div class="title">{{key}}</div>
                <div class="challenge-group">
                    <ChallengeBlock v-for="challenges in value" :key="challenges.id" :info="challenges" :color="color"></ChallengeBlock>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navigate from '@/components/Navigate';
import ChallengeBlock from '@/components/ChallengeBlock';
import { CHALLENGE_URL } from '@/config/config';

export default {
    components: {
        Navigate,
        ChallengeBlock
    },
    data() {
        return {
            color: '#229AB8',
            challengesObject: {},
        }
    },
    methods: {
        getChallenge () {
            this.$get(CHALLENGE_URL).then(resp => {                
                this.challengesObject = resp.data;
            }).catch(error => {console.log(error)});
        }
    },
    created () {
        this.getChallenge();
    } 
}
</script>

<style scoped>
.container {
    height: 100%;
    width: 100%;
    position: relative;
}
.middle {
    margin-top: 70px;
    margin-bottom: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    overflow: auto;
}
.middle-group {
    height: auto;
    width: 100%;
}
.title {
    height: 30px;
    width: 100%;
    box-sizing: border-box;
    padding-left: 30px;
    /* margin: 20px 0; */
    text-align: center;
    margin: 40px 0;
    color: #229AB8;
    font-size: 40px;
    font-weight: bold;
}
.challenge-group {
    width: 100%;
    box-sizing: border-box;
    padding: 0 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
}
</style>