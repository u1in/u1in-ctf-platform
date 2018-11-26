<template>
    <div>
        <i class="fa" v-for="i in number" :key="i" :class="score >= i || previewScore >= i ? 'fa-star' : 'fa-star-o'" @mouseover="changeScore(i)" @click="chooseScore(i)"></i>
    </div>
</template>

<script>
    export default {
        props: {
            number: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                score: 0,
                previewScore: 0,
            }
        },
        methods: {
            changeScore (number) {
                this.previewScore = number;
            },
            chooseScore (number) {
                this.score = number;
                this.$emit('chooseScore', number)
            }
        }
    }
</script>

<style scoped>

</style>