<script setup>
import { ref } from 'vue';
import XPopup from '@/components/popup/index.vue';


const show = ref(false);
</script>

<template>
    <x-popup v-model:show="show" position="center" width="332px" height="332px" hide-header>
        <div class="build-no">
            <div class="build-no-title">很抱歉，现只开放足球项目</div>
            <div class="build-no-sub">更多项目敬请期待...</div>
            <van-button class="build-no-btn" type="primary">确定</van-button>
        </div>
        <icon icon-class="icon_pop-up_close" class="build-no-close" size="28px" color="#ffffff"></icon>
    </x-popup>
</template>

<style lang="scss" scoped>
.build-no {
    @include flex-direction-column();
    height: 100%;
    background-image: url(@/assets/imgs/no-build-bg.png);
    background-size: 100% auto;
    background-repeat: no-repeat;
    padding: 16px;
    justify-content: flex-end;
    box-sizing: border-box;
    text-align: center;
    &-title {
        @include font(500, 16px, 22px);
        margin-bottom: 8px;
    }
    &-sub {
        @include font(400, 14px, 20px, #999999);
        margin-bottom: 16px;
    }
    &-btn {
        --van-button-primary-color: $black;
        --van-button-primary-background-color: rgba(0, 0, 0, 0.05);
        --van-button-primary-border-color: var(--van-button-primary-background-color);
    }
    &-close {
        position: absolute;
        bottom: -26px; left: 50%;
        transform: translateX(-50%);
    }
}
.van-popup {
    overflow: initial;
}
</style>