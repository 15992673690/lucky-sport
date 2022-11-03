<script setup>
const props = defineProps({
    data: {
        type: Object,
        default: null,
    }
})
// const countdown = function() {

// }
</script>

<template>
    <div class="data-begining">
        <div class="data-begining-item team">
            <div class="item-host">
                <img :src="props.data.homeLogo" alt=""> {{props.data.homeName}}
            </div>
            <div class="item-partition">
                <span>68:12</span>
            </div>
            <div class="item-away">
                <img :src="props.data.awayLogo" alt=""> {{props.data.awayName}}
            </div>
        </div>
        <div class="data-begining-item score">
            <div class="item-host">
                <span class="progress" style="width: 25%;"></span>
                <div class="score-remark" v-for="(item, index) in 2" :key="index" :style="{left: `${(index+1)*10}%`}">
                    <img src="@/assets/imgs/football.png" alt="">
                </div>
            </div>
            <div class="item-partition">
                <span>{{props.data.homeScore}} : {{props.data.awayScore}}</span>
            </div>
            <div class="item-away">
                <span class="progress"></span>
            </div>
        </div>
        <div class="data-begining-module">
            <div class="data-begining-item possession">
                <div class="item-host">
                    <span class="title">{{props.data.possessionHome}}%</span>
                    <span class="progress" :style="{width: `${props.data.possessionHome}%`}"></span>
                </div>
                <div class="item-partition">
                    <span>球权</span>
                </div>
                <div class="item-away">
                    <span class="title">{{props.data.possessionAway}}%</span>
                    <span class="progress" :style="{width: `${props.data.possessionAway}%`}"></span>
                </div>
            </div>
            <div class="data-begining-item shoot">
                <div class="item-host">
                    <span class="title">{{props.data.shotsHome}}</span>
                    <span class="progress"></span>
                </div>
                <div class="item-partition">
                    <span>射门</span>
                </div>
                <div class="item-away">
                    <span class="title">{{props.data.shotsAway}}</span>
                    <span class="progress"></span>
                </div>
            </div>
            <div class="data-begining-item corner">
                <div class="item-host">
                    <span class="title">{{props.data.cornerHome}}</span>
                    <span class="progress"></span>
                </div>
                <div class="item-partition">
                    <span>角球</span>
                </div>
                <div class="item-away">
                    <span class="title">{{props.data.cornerAway}}</span>
                    <span class="progress"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.data-begining {
    padding: 0;
    box-sizing: border-box;
    &-item {
        @include flex-cell();
        color: $white;
        position: relative;
        .item-host, .item-away {
            @include flex-align-center();
            @include font(500, 12px, initial);
            >img {
                width: 16px;
                height: 16px;
            }
            .progress {
                position: absolute;
                bottom: 0; 
            }
        }
        .item-host {
            justify-content: flex-start;
            >img {
                margin-right: 4px;
            }
        }
        .item-partition {
            @include font(500, 12px, 17px);
            @include flex-center();
            min-width: 40px;
        }
        .item-away {
            justify-content: flex-end;
            >img {
                margin-left: 4px;
            }
        }
        &.team {
            margin-bottom: 4px;
            .item-partition {
                height: 21px;
                background-color: transparent;
                &::before {
                    content: "";
                    display: block;
                    width: 4px;
                    height: 4px;
                    border-radius: 50%;
                    background-color: $success-color;
                    margin-right: 6px;
                    margin-left: -4px;
                }
            }
            .item-host {
                width: 140px;
            }
            .item-away {
                width: 140px;
                >img {
                    order: 2;
                }
            }
        }
        &.score {
            height: 24px;
            margin-bottom: 8px;
            .item-host, .item-away {
                width: calc(50% - 25px);
                flex: 0 0 calc(50% - 25px);
                position: relative;
                &::after {
                    content: "";
                    height: 4px;
                    width: 100%;
                    display: block;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 87px;
                }
                .progress {
                    height: 4px;
                    left: 0;
                    background-color: $primary-color;
                    border-radius: 87px;
                    transition: all .5s;
                }
            }
            .item-partition {
                @include font(500, 14px, 20px);
                position: absolute;
                left: 50%; top: 50%;
                transform: translate(-50%, -50%);
                width: 54px;
                height: 24px;
                color: $black;
                background-color: $primary-color;
                box-shadow: inset 0px 0px 4px rgba(0, 7, 17, 0.19);
                border-radius: 2px;
            }
            .score-remark {
                position: absolute;
                top: 50%; z-index: 2;
                transform: translate(-9px, -50%);
                width: 18px;
                height: 18px;
                >img {
                    cursor: pointer;
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
    &-module {
        background: rgba(236, 241, 241, 0.1);
        border-radius: 4px;
        padding: 8px 12px;
        .data-begining-item {
            margin-bottom: 10px;
            &:last-of-type {
                margin-bottom: 0;
            }
        }
        .item-host, .item-away {
            @include flex-direction-column(); 
            width: calc(50% - 4px);
            flex: 0 0 calc(50% - 4px);
            position: relative;
            &::after {
                content: "";
                height: 3px;
                width: 100%;
                display: block;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 87px;
            }
            .progress {
                height: 3px;
                border-radius: 87px;
                transition: all .5s;
            }
        }
        .item-host {
            align-items: flex-start;
            .progress {
                right: 0;
                background-color: $error-color;
            }
        }
        .item-away {
            align-items: flex-end;
            .progress {
                left: 0;
                background-color: $success-color;
            }
        }
        .item-partition {
            @include font(400, 12px, 17px);
            position: absolute;
            top: -2px; left: 50%;
            transform: translateX(-50%);
        }
    }
}
</style>