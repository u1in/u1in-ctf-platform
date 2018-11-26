<template>
    <div>
        <Navigate></Navigate>
        <div class="container">
            <div class="markdown" v-html="markdown"></div>
        </div>
    </div>
</template>

<script>
import Navigate from '@/components/Navigate';
import { INDEX_URL } from '@/config/config';

export default {
    components: {
        Navigate,
    },
    data() {
        return {
            markdown: '',
        }
    },
    methods: {
        getNotice () {
            this.$get(INDEX_URL).then(resp => {
                if(resp.code === 1) {
                    this.markdown = resp.data;
                }
            }).catch(error => {console.log(error)});  
        }
    },
    created () {
        this.getNotice();
    }
}
</script>

<style scoped>
.container {
    height: 100%;
    width: 100;
    box-sizing: border-box;
    padding-top: 70px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    overflow: auto;
}
.markdown {
    height: auto;
    width: 100%;
    box-sizing: border-box;
    padding: 50px;
}
</style>