<template>
    <div class="progress-container">
        <div class="progress-name" :style="{color: color}">
            {{name}}
        </div>
        <div class="progress" :style="{border: '1px solid ' + color, height: height, width: width}">
            <div class="color" :style="{transform: 'translateX(-'+ (100 - percent) + '%)', backgroundColor: color}"></div>
        </div>
        <div class="percent" :style="{color: color, lineHeight: height}">
            {{percent}}%
        </div>
    </div>
</template>

<script>
export default {
    props: {
        percent: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        height: {
            type: String,
            required: true,
        },
        width: {
            type: String,
            required: true,
        },
    }
    
}
</script>

<style scoped>
.progress-container {
    height: auto;
    width: auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
}
.progress {
    height: 100%;
    flex-grow: 1;
    overflow: hidden;
    border-radius: 4px;
}
.progress-name,
.percent {
    height: 30px;
    width: 50px;
    font-size: 12px;
    padding: 0 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.percent {
    width: 100px;
    justify-content: flex-start;
}
.color {
    height: 100%;
    width: 100%;
    transition: all 1s ease-in-out;
    transform: translateX(-100%);
}
</style>