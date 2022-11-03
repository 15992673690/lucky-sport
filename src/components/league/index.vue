<script setup>
import { ref } from 'vue';
import XPopup from '@/components/popup/index.vue';


const show = ref(false);
</script>

<template>
    <x-popup v-model:show="show" position="bottom" title="赛事筛选" width="100%" height="500px">
        <div class="league-wrapper">
            <div class="league" v-for="(item, index) in 3" :key="index">
                <div class="league-title">
                    <div class="league-title-left">
                        <span>足球</span>
                        <icon icon-class="icon_arrow" :size="14" color="#1E1E1E"></icon>
                    </div>
                    <icon icon-class="icon_pick_nor" color="#F5D135"></icon>
                </div>
                <div class="league-list">
                    <div class="league-item" v-for="(row, i) in 6" :key="i">
                        <div class="league-item-left">
                            <img class="item-logo" src="@/assets/logo.png" alt="">
                            <span class="item-name">中国足球超级联赛</span>
                            <span class="item-num">1</span>
                        </div>
                        <div class="league-item-right">
                            <icon icon-class="icon_home_pick" color="#F5D135"></icon>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        <div class="league-footer">
            <div class="league-footer-left">
                <van-button disabled class="checkAll" type="primary">全选</van-button>
                <van-button disabled class="checkInvert" type="primary">反选</van-button>
                <span class="hint">至少选择1个联赛</span>
            </div>
            <van-button class="league-footer-right submit" type="primary">确定</van-button>
        </div>
    </x-popup>
</template>

<style lang="scss" scoped>
.league {
    $footer-height: 60px;
    padding: 0 16px;
    &-wrapper {
        box-sizing: border-box;
        height: calc(100% - 46px);
        padding-bottom: $footer-height;
        overflow: scroll;
    }
    &-title {
        height: 36px;
        padding-right: 12px;
        background-color: $body-bg-color;
        @include flex-cell();
        @include font(500, 14px, 20px, $black);
        &-left {
            @include flex-align-center();
            &:before {
                content: "";
                display: block;
                margin-right: 8px;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background-color: $primary-color;
            }
            >span {
                margin-right: 6px;
            }
        }
    }
    &-list {
        
    }
    &-item {
        height: 42px;
        margin-bottom: 8px;
        background: $white;
        box-shadow: 0px 4px 12px rgba(30, 30, 30, 0.05);
        border-radius: 6px;
        padding: 0 12px;
        @include flex-cell();
        &-left {
            @include flex-align-center();
            @include font(400, 12px, 17px, $black);
            .item-logo {
                width: 14px;
                height: 14px;
                margin-right: 4px;
            }
            .item-name {
                margin-right: 8px;
            }
            .item-num {
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background-color: #DA424F;
                @include font(500, 10px, 14px, $white);
                @include flex-center();
            }
        }
        &-right {
            
        }
    }
    &-footer {
        @include flex-cell();
        height: $footer-height;
        position: absolute;
        left: 0; right: 0; bottom: 0;
        padding: 0 12px;
        box-sizing: border-box;
        background: $white;
        box-shadow: 0px 0px 12px rgba(30, 30, 30, 0.1);
        .checkAll, .checkInvert {
            width: 64px;
            height: 37px;
            margin-right: 8px;
        }
        .submit {
            width: 92px;
            height: 37px;
        }
        .hint {
            @include font(500, 12px, 17px, #999999);
        }
        &-left {
            @include flex-align-center();
        }
    }
}

</style>