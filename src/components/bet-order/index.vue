<script setup>
import { reactive, ref } from 'vue';
import XPopup from '@/components/popup/index.vue';
import tabView from '@/components/tab/index.vue';
import treblesView from '@/components/trebles/index.vue';

const show = ref(false);
const state = reactive({
    agree: false,
    tab: 1,
    tabList: [
        {
            label: '单压',
            value: 1
        }, { 
            label: '串关',
            value: 2
        }
    ],
    list: [
        {},
        {},
        {}
    ]
})
const onClose = () => {

};
const onClear = id => {
    console.log(id)
    // if(id) {

    // }else {
    //     state.list = []
    // }
}
</script>

<template>
    <div class="outside" v-show="!show" @click="show = true">
        <span class="popup-header-title">
            <span class="num">4</span>
            <span>投注单</span>
        </span>
        <icon icon-class="icon_arrow" :size="16" color="#1E1E1E" class="popup-headerclose" @click="onClose"></icon>
    </div>
    <x-popup class="popup" v-model:show="show" position="bottom" width="100%" height="640px">
        <template #header>
            <span class="popup-header-title">
                <span class="num">4</span>
                <span>投注单</span>
            </span>
            <icon icon-class="icon_arrow" :size="16" color="#1E1E1E" class="popup-headerclose" @click="onClose"></icon>
        </template>
        <div class="betOrder-tab">
            <tab-view v-model:value="state.tab" :options="state.tabList" :spaceBetween="24">
                <template #default="{ row }">
                    {{row.label}}
                </template>
            </tab-view>
            <div class="betOrder-tab-right">
                <span class="label">余额：</span>
                <span class="value">0.056</span>
            </div>
        </div>
        <div class="betOrder-wrapper">
            <template v-if="state.tab == 1">
                <div class="betOrder-list">
                    <div class="betOrder-list-item" :class="`status${index}`" v-for="(item, index) in state.list" :key="index">
                        <div class="list-mian">
                            <span class="list-mian-left">
                                <icon icon-class="icon_close_1" :size="16" color="#DCDFE7" @click="onClear(item.id)" />
                            </span>
                            <div class="list-mian-right">
                                <div class="right-item">
                                    <span>切尔西 -0.5</span>
                                    <span class="odds up arrow">2.97</span>
                                </div>
                                <div class="right-item">
                                    <span>全场让球</span>
                                </div>
                                <div class="right-item">
                                    <div class="right-item-left">
                                        <span>切尔西</span>
                                        <span>利物浦</span>
                                    </div>
                                    <van-field></van-field>
                                </div>
                            </div>
                        </div>
                        <div class="list-tips" v-if="index>0">
                            <icon icon-class="icon_tips" :size="12" color="inherit" /> 
                            <template v-if="index== 1">盘口已关闭</template> 
                            <template v-else-if="index== 2">球线或赔率已变更</template> 
                        </div>
                    </div>
                </div>
            </template>
            <template v-else-if="state.tab == 2">
                <div class="betOrder-list">
                    <div class="betOrder-list-item" :class="`status3`" v-for="(item, index) in state.list" :key="index">
                        <div class="list-mian">
                            <span class="list-mian-left">
                                <icon icon-class="icon_close_1" :size="16" color="#DCDFE7" @click="onClear(item.id)" />
                            </span>
                            <div class="list-mian-right">
                                <div class="right-item">
                                    <span>切尔西 -0.5</span>
                                    <span class="odds down arrow">2.97</span>
                                </div>
                                <div class="right-item">
                                    <span>全场让球</span>
                                </div>
                                <div class="right-item">
                                    <div class="right-item-left">
                                        <span>切尔西</span>
                                        <span>利物浦</span>
                                    </div>
                                    <van-field />
                                </div>
                            </div>
                        </div>
                        <div class="list-tips" v-if="index<1">
                            <icon icon-class="icon_tips" :size="12" color="inherit" /> 
                            <template v-if="index == 0">请选择不同属性的选项！</template> 
                        </div>
                    </div>
                </div>
                <div class="betOrder-total">
                    <div class="betOrder-total-title">
                        <div class="title-left">
                            <span class="name">3串1</span>
                            <div class="sub">
                                更多组合 <icon icon-class="icon_arrow" :size="12" color="#999999"></icon>
                            </div>
                        </div>
                        <div class="title-right">
                            <span class="odds down arrow">5.21</span>
                            <van-field />
                        </div>
                    </div>
                    <div class="betOrder-total-wrapper">
                        <div class="wrapper-item" v-for="(item, index) in 6" :key="index">
                            <div class="wrapper-item-left">
                                <span>{{index+2}}串1</span>
                                <icon icon-class="icon_notice" :size="12" color="#999999"></icon>
                            </div>
                            <div class="wrapper-item-right">
                                <span>x{{index+2}}</span>
                                <van-field />
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <div class="betOrder-footer">
            <div class="betOrder-footer-keyword">
                <div class="keyword-num">
                    <div class="keyword-item" v-for="(item, index) in 10" :key="index">{{index}}</div>
                </div>
                <div class="keyword-special">
                    <div class="keyword-item">最大投注</div>
                    <div class="keyword-item">
                        <icon icon-class="icon_backspace" :size="24" color="#999999"></icon>
                    </div>
                    <div class="keyword-item">.</div>
                    <div class="keyword-item">确定</div>
                </div>
                
            </div>
            <div class="betOrder-footer-item">
                <div class="item-left">
                    <span class="label">总投注：</span>
                    <span class="value">200 USDT</span>
                </div>
                <div class="item-right">
                    <span class="label">预计返还：</span>
                    <span class="value">800 USDT</span>
                </div>
            </div>
            <div class="betOrder-footer-item">
                <van-button class="clean" type="primary">
                    <icon icon-class="icon_bin" :size="20" color="#ffffff" @click="onClear"></icon>
                </van-button>
                <van-button class="submit" type="primary">接受变化并投注</van-button>
            </div>
            <div class="betOrder-footer-item">
                <div class="item-left">
                    <span class="label">接受赔率变化</span>
                </div>
                <div class="item-right">
                    <van-switch v-model="state.agree" active-color="#F5D135" inactive-color="#DCDFE7" size="18px" />
                </div>
            </div>
        </div>
    </x-popup>

    <treblesView />
</template>

<style lang="scss" scoped>
.outside {
    @include flex-cell();
    position: fixed;
    bottom: 0; left: 0; right: 0;
    height: 46px;
    padding: 0 24px;
    background-color: $white;
    box-shadow: 0px 0px 12px rgba(30, 30, 30, 0.1);
    .popup-header-title {
        @include font(600, 14px, 20px);
    }
}
::deep(.popup-header) {
    @include flex-justify-between()
}
.popup-header-title {
    @include flex-align-center();
    @include font(600, 16px, 22px);
    .num {
        @include flex-center();
        @include font(500, 14px, 20px, $white);
        width: 20px;
        height: 20px; 
        margin-right: 8px;
        border-radius: 50%;
        background-color: $primary-color;
    }
}
.popup-headerclose {

}
.betOrder {
    $footer-height: 130px;
    &-tab {
        @include flex-cell();
        background-color: $white;
        padding-left: 4px;
        padding-right: 16px;
        box-sizing: border-box;
        .tab {
            width: fit-content;
            margin: 0;
        }
        &-right {
            @include flex-align-center();
            .label {
                @include font(400, 12px, 17px, #999999);
            }
            .value {
                @include font(700, 14px, 16px, #999999);
            }
        }
    }
    &-wrapper {
        padding: 16px;
        padding-bottom: $footer-height;
        box-sizing: border-box;
        height: calc(100% - 46px - 44px);
        overflow: scroll;
    }
    &-list {
        &-item {
            background: $white;
            border-radius: 8px;
            box-shadow: 0px 4px 12px rgba(30, 30, 30, 0.05);
            margin-bottom: 16px;
            .list-mian {
                @include flex-justify-between();
                padding: 12px 0;
                box-sizing: border-box;
                &-left {
                    @include flex-center();
                    @include border-right(1px, 40px);
                    width: 40px;
                    flex: 0 0 40px;
                }
                &-right {
                    width: calc(100% - 40px);
                    flex: 0 0 calc(100% - 40px);
                    padding: 0 12px;
                    box-sizing: border-box;
                    .right-item {
                        margin-bottom: 7px;
                        &:nth-of-type(1) {
                            @include flex-justify-between();
                            @include font(500, 14px, 20px);
                            .odds {
                                @include font(700, 18px, 21px);
                            }
                        }
                        &:nth-of-type(2) {
                            @include font(500, 14px, 20px);
                        }
                        &:nth-of-type(3) {
                            @include font(500, 12px, 17px, #999999);
                            margin-bottom: 0px;
                            position: relative;
                            .right-item-left {
                                @include flex();
                                &::after {
                                    content: 'vs';
                                    order: 2;
                                    margin: 0 4px;
                                }
                                >span:nth-of-type(1) {
                                    order: 1;
                                }
                                >span:nth-of-type(2) {
                                    order: 3;
                                }
                            }
                            .van-field {
                                position: absolute;
                                right: 0; bottom: 0;
                                width: 92px;
                                border-radius: 4px;
                                background-color: rgba(0, 0, 0, 0.05);
                                ::v-deep {
                                    .van-field__control {
                                        height: 15px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .list-tips {
                @include font(400, 12px, 17px);
                width: 100%;
                flex: 0 0 100%;
                padding: 8px 12px;
                box-sizing: border-box;
                border-bottom-left-radius: 8px;
                border-bottom-right-radius: 8px;
                .iconfont {
                    margin-right: 6px;
                }
            }
            &.status1 {
                .list-tips {
                    @include font(400, 12px, 17px, #999999);
                    background-color: $border-color;
                }
            }
            &.status2 {
                .list-tips {
                    @include font(400, 12px, 17px, $error-color);
                    background-color: rgba($error-color, .2);
                }
            }
            &.status3 {
                .list-tips {
                    @include font(400, 12px, 17px, #2B5F82);
                    background-color: #ECF1F1;
                }
            }
        }
    }
    &-total {
        padding: 0 12px;
        box-sizing: border-box;
        background: $white;
        border-radius: 8px;
        box-shadow: 0px 4px 12px rgba(30, 30, 30, 0.05);
        margin-bottom: 16px;
        &-title {
            @include flex-cell();
            @include border-bottom(100%, 1px);
            padding: 12px 0 8px;
            box-sizing: border-box;
            .title-left {
                @include flex-direction-column();
                .name {
                    @include font(500, 14px, 20px);
                    margin-bottom: 4px;
                }
                .sub {
                    @include flex-align-center();
                    @include font(400, 12px, 17px, #999999);
                    .iconfont {
                        margin-left: 6px;
                    }
                }
            }
            .title-right {
                @include flex-align-center();
                @include font(500, 14px, 20px, #999999);
                .odds {
                    @include font(700, 18px, 21px);
                }
                .van-field {
                    width: 92px;
                    margin-left: 8px;
                    border-radius: 4px;
                    background-color: rgba(0, 0, 0, 0.05);
                    ::v-deep {
                        .van-field__control {
                            height: 15px;
                        }
                    }
                }
            }
        }
        &-wrapper {
            padding: 12px 0;
            box-sizing: border-box;
            .wrapper-item {
                @include flex-cell();
                margin-bottom: 12px;
                &:last-of-type {
                    margin-bottom: 0;
                }
                &-left {
                    @include flex-align-center();
                    @include font(500, 14px, 20px);
                    .iconfont {
                        margin-left: 4px;
                    }
                }
                &-right {
                    @include flex-align-center();
                    @include font(500, 14px, 20px, #999999);
                    .van-field {
                        width: 92px;
                        margin-left: 8px;
                        border-radius: 4px;
                        background-color: rgba(0, 0, 0, 0.05);
                        ::v-deep {
                            .van-field__control {
                                height: 15px;
                            }
                        }
                    }
                }
            }
        }
    }
    &-footer {
        min-height: $footer-height;
        position: absolute;
        left: 0; right: 0; bottom: 0;
        padding: 12px;
        box-sizing: border-box;
        background: $white;
        box-shadow: 0px 0px 12px rgba(30, 30, 30, 0.1);
        &-item {
            @include flex-cell();
            margin-bottom: 12px;
            .item-left, .item-right {
                @include flex-align-center();
                color: #999999;
                .label {
                    @include font(500, 12px, 17px);
                }
                .value {
                    @include font(700, 14px, 16px);
                }
            }
            .clean {
                --van-button-primary-color: #21222D;
                --van-button-primary-background-color: #21222D;
                --van-button-primary-border-color: #21222D;
                width: 88px;
            }
            .submit {
                --van-button-normal-font-size: 14px;
                width: 250px;
                font-weight: 600;
            }
        }
        &-keyword {
            color: #999999;
            .keyword-num {
                @include flex-justify-between();
                margin-bottom: 12px;
                .keyword-item {
                    @include font(500, 14px, 20px);
                    width: 28px;
                    height: 32px;
                    &:first-of-type {
                        order: 10;
                    }
                }
            }
            .keyword-special {
                @include flex-justify-between();
                margin-bottom: 12px;
                .keyword-item {
                    @include font(500, 12px, 17px);
                    width: 53px;
                    height: 40px;
                    &:first-of-type, &:last-of-type {
                        width: 110px;
                    }
                    &:nth-of-type(3) {
                        @include font(500, 14px, 20px);
                    }
                }
            }
            .keyword-item {
                @include flex-center();
                background: rgba(0, 0, 0, 0.05);
                border-radius: 4px;
            }
        }
    }
}

</style>