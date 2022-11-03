<script setup>
import { computed } from 'vue';
import { dateFormat } from '@/utils/filter';

const props = defineProps({
    data: {
        type: Object,
        default: null,
    }
});

// const gameTime = 90; // 一场比赛90分钟


const countdown = computed(() => {
    let date = new Date();
    return dateFormat(date, 'YYYY/mm/dd HH:MM:SS')
})
</script>

<template>
    <div class="data-nostart">
        <div class="data-nostart-item">
            <div class="item-host">
                <img :src="props.data.homeLogo" alt=""> {{props.data.homeName}}
            </div>
            <div class="item-partition">
                <span>{{countdown}}</span>
            </div>
            <div class="item-away">
                <img :src="props.data.awayLogo" alt=""> {{props.data.awayName}}
            </div>
        </div>
        <div class="data-nostart-item">
            <div class="item-host">{{props.data.homeH1}}</div>
            <div class="item-partition" :style="{backgroundImage: `url(${require('@/assets/imgs/partition1.png')})`}"></div>
            <div class="item-away">{{props.data.awayH1}}</div>
        </div>
        <div class="data-nostart-item">
            <div class="item-host">{{props.data.homeH2}}</div>
            <div class="item-partition" :style="{backgroundImage: `url(${require('@/assets/imgs/partition2.png')})`}"></div>
            <div class="item-away">{{props.data.awayH2}}</div>
        </div>
        <div class="data-nostart-item">
            <div class="item-host">{{props.data.yellowHome}}</div>
            <div class="item-partition" :style="{backgroundImage: `url(${require('@/assets/imgs/partition3.png')})`}"></div>
            <div class="item-away">{{props.data.yellowAway}}</div>
        </div>
        <div class="data-nostart-item">
            <div class="item-host">{{props.data.redNumHome}}</div>
            <div class="item-partition" :style="{backgroundImage: `url(${require('@/assets/imgs/partition4.png')})`}"></div>
            <div class="item-away">{{props.data.redNumAway}}</div>
        </div>
        <div class="data-nostart-item">
            <div class="item-host">{{props.data.cornerHome}}</div>
            <div class="item-partition" :style="{backgroundImage: `url(${require('@/assets/imgs/partition5.png')})`}"></div>
            <div class="item-away">{{props.data.cornerAway}}</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.data-nostart {
    padding: 0 24px;
    box-sizing: border-box;
    &-item {
        @include flex-cell();
        color: $white;
        margin-bottom: 4px;
        &:first-of-type {
            .item-partition {
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
                transform: translateX(-20px);
            }
            .item-away {
                transform: translateX(20px);
                >img {
                    order: 2;
                }
            }
        }
        .item-host, .item-away {
            @include flex-align-center();
            @include font(500, 12px, initial);
            width: 40%;
            flex: 0 0 40%;
            >img {
                width: 16px;
                height: 16px;
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
            height: 21px;
            border-radius: 4px;
            background-color: rgba($white, .2);
            background-size: auto 10px;
            background-position: center;
            background-repeat: no-repeat;
        }
        .item-away {
            justify-content: flex-end;
            >img {
                margin-left: 4px;
            }
        }
    }
}
</style>