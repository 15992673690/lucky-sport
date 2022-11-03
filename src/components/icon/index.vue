<script setup>
import './iconfont/iconfont.css'
const props = defineProps({
    iconClass: {
        tyep: String,
        default: 'icon-search_24'
    },
    size: {
        tyep: Number,
        default: 16
    },
    color: {
        tyep: String,
        default: '#797979'
    }
})
</script>
<template>
    <i class="iconfont" :class="props.iconClass" :style="{
        fontSize: props.size + 'px',
        color: props.color
    }"></i>
</template>

<style lang="scss" scoped>
.iconfont {
    font-family: "font_family" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>