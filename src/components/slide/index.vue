<script setup>
import { reactive, ref, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const show = ref(false);
const state = reactive({
    betRule: store.state.slideRule,
    betSort: store.state.slideSort
})

const onChangeRule = e => {
    store.dispatch('SET_SLIDERULE', e)
}

const onChangeSort = e => {
    store.dispatch('SET_SLIDESORT', e)
}

watch(() => show.value, value => {
    store.dispatch('SET_SLIDESHOW', value)
})
watch(() => store.state.slideShow, value => {
    show.value = value
})
</script>

<template>
    <!-- :close-on-click-overlay="false" -->
    <van-popup v-model:show="show" position="left" :style="{ height: '100%' }">
        <div class="slide-wrapper">
            <div class="slide-header">
                <icon class="close" icon-class="icon_arrow" :size="24" color="#1E1E1E" data-direction='left' />
                <div class="tips">
                    <icon icon-class="icon_home_pick" :size="14" color="#5AC593"></icon>
                    香港盘
                </div>
            </div>
            <div class="slide-content">
                <div class="slide-content-item">
                    <div class="item-title">投注规则</div>
                    <van-radio-group v-model="state.betRule" @change="onChangeRule">
                        <van-radio name="1">
                            自动接收任何赔率
                            <template #icon="props">
                                <icon :icon-class="props.checked ? 'icon_option_light' : 'icon_option_noraml'" 
                                :size="18" :color="props.checked ? '#F5D135' : '#999999'" />
                            </template>
                        </van-radio>
                        <van-radio name="2">
                            不接收任何赔率变动
                            <template #icon="props">
                                <icon :icon-class="props.checked ? 'icon_option_light' : 'icon_option_noraml'" 
                                :size="18" :color="props.checked ? '#F5D135' : '#999999'" />
                            </template>
                        </van-radio>
                    </van-radio-group>
                </div>
                <div class="slide-content-item">
                    <div class="item-title">我的投注</div>
                    <van-radio-group v-model="state.betSort" @change="onChangeSort" direction="horizontal">
                        <van-radio name="1">
                            时间排序
                            <template #icon="props">
                                <icon :icon-class="props.checked ? 'icon_option_light' : 'icon_option_noraml'" 
                                :size="18" :color="props.checked ? '#F5D135' : '#999999'" />
                            </template>
                        </van-radio>
                        <van-radio name="2">
                            赛事排序
                            <template #icon="props">
                                <icon :icon-class="props.checked ? 'icon_option_light' : 'icon_option_noraml'" 
                                :size="18" :color="props.checked ? '#F5D135' : '#999999'" />
                            </template>
                        </van-radio>
                    </van-radio-group>
                </div>
                <div class="slide-content-item">
                    <div class="item-title">
                        我的投注
                        <icon icon-class="icon_arrow" :size="18" color="#B5B5B5" data-direction='right' />
                    </div>
                </div>
            </div>
        </div>
    </van-popup>
</template>

<style lang="scss" scoped>
.van-popup--left {
    .slide-wrapper {
        width: $slide-width;
        height: 100%;
        background-color: $body-bg-color;
    }
    .slide-header {
        @include flex();
        background-color: $white;
        height: 92px;
        padding: 12px;
        box-sizing: border-box;
        align-items: flex-end;
        position: relative;
        margin-bottom: 8px;
        .close {
            margin-right: 2px;
        }
        .tips {
            @include flex-align-center();
            @include font(500, 12px, initial, $success-color);
            position: absolute;
            right: 0; bottom: 12px;
            height: 30px;
            padding: 0 8px;
            background-color: rgba($success-color, .2);
            border-top-left-radius: 42px;
            border-bottom-left-radius: 42px;
            .icon_home_pick {
                margin-right: 4px;
            }
        }
    }
    .slide-content {
        &-item {
            padding: 12px;
            box-sizing: border-box;
            background-color: $white;
            margin-bottom: 8px;
            .item-title {
                @include font(500, 14px, 20px);
                @include flex-align-center();
                position: relative;
                .icon_arrow {
                    position: absolute;
                    right: 0; top: 0;
                }
                &:before {
                    content: "";
                    position: absolute;
                    top: 50%; left: -12px;
                    transform: translateY(-50%);
                    display: block;
                    height: 18px;
                    width: 4px;
                    border-radius: 6px;
                    background-color: $primary-color;
                }
            }
            .van-radio-group{
                @include font(400, 14px, 20px);
                margin-top: 10px;
                &:not(.van-radio-group--horizontal) {
                    .van-radio {
                        margin-bottom: 16px;
                        &:last-of-type {
                            margin-bottom: 0;
                        }
                    }
                }
                &.van-radio-group--horizontal {
                    .van-radio {
                        margin-right: 32px;
                        &:last-of-type {
                            margin-right: 0;
                        }
                    }
                }
            }
        }
    }
}
</style>