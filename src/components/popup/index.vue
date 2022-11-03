<script setup>
import { toRefs, getCurrentInstance } from 'vue';

const vm = getCurrentInstance();
const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: ''
    },
    position: {
        type: String,
        default: 'center'
    },
    width: {
        type: String,
        default: 'auto'
    },
    height: {
        type: String,
        default: 'auto'
    },
    hideColse: {
        type: Boolean,
        default: false
    },
    hideHeader: {
        type: Boolean,
        default: false
    }
});
const emits = defineEmits(['update:show']);
const { show } = toRefs(props);
const onClose = () => {
    emits('update:show', false)
};
</script>

<template>
    <van-popup :class="`popup-${props.position}`" v-model:show="show" :position="props.position" :style="{ 
        width: props.width, height: props.height
    }" @click-overlay="onClose" :close-on-click-overlay="false" round>
        <div class="popup-header" v-if="!hideHeader">
            <template v-if="vm.slots.header">
                <slot name="header"></slot>
            </template>
            <template v-else>
                <span class="popup-header-title" v-if="props.title">{{props.title}}</span>
                <icon icon-class="icon_close_1" class="popup-headerclose" @click="onClose" v-if="!props.hideColse"></icon>
            </template>
        </div>
        <slot />
    </van-popup>
</template>

<style lang="scss" scoped>

.popup-header {
    @include font(600, 16px, 22px, $black);
    @include flex-justify-center();
    background-color: $body-bg-color;
    padding: 16px 0 8px;
    position: sticky;
    top: 0;
    &-title {
        max-width: 80%;
        flex: 0 0 80%;
        text-align: center;
    }
    &-close {
        position: absolute;
        right: 16px; top: 19px;
        z-index: 2;
    }
}
</style>

<style lang="scss">
.popup {
    &-bottom {
        --van-popup-background-color: #{$body-bg-color};
        --van-popup-round-border-radius: 12px;
    }
}
</style>