<script setup>

const props = defineProps({
    span: {
        type: Number,
        default: 2
    },
    title: {
        type: String,
        default: ''
    },
    options: {
        type: Array,
        default: () => new Array()
    },
    showLabel: {
        type: Boolean,
        default: true
    },
    showTeam: {
        type: Boolean,
        default: false
    }
});


</script>

<template>
    <div class="bet-card">
        <div class="bet-card-title">{{props.title}}</div>
        <div class="bet-card-wrapper">
            <div class="bet-card-team" v-if="props.showTeam">
                <span class="team-col" :class="`flex-${props.span}`" v-for="(item, index) in props.span" :key="index">
                    <img class="team-col-logo" src="@/assets/logo.png" alt="">
                    {{index == 0 ? '皇家马德里' : index == 1 ? '巴塞罗那' : '和'}}
                </span>
            </div>
            <div class="bet-card-row">
                <div class="bet-card-col" :class="[
                    `flex-${props.span}`,
                    props.showLabel ? '' : 'alone',
                    index == 0 ? 'active' : ''
                ]" v-for="(item, index) in props.options" :key="index">
                    <span v-if="props.showLabel" class="labal">{{item.label}}</span>
                    <span class="value">{{item.value}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.bet-card {
    background: $white;
    box-shadow: 0px 4px 12px rgba(30, 30, 30, 0.05);
    border-radius: 8px;
    margin-bottom: 12px;
    &-title {
        @include font(500, 14px, 20px);
        padding: 8px;
        margin-bottom: 4px;
        position: relative;
        &::before {
            content: "";
            display: block;
            width: 2px;
            height: 12px;
            border-radius: 6px;
            background-color: $primary-color;
            position: absolute;
            left: 1px; top: 50%;
            transform: translateY(-50%);
        }
    }
    &-wrapper {
        padding: 0 8px;
    }
    &-team {
        @include flex-cell();
        margin-bottom: 8px;
        .team-col {
            @include font(500, 12px, 17px);
            @include flex-center();
            &-logo {
                width: 16px;
                height: 16px;
                margin-right: 4px;
            }
        }
    }
    &-row {
        @include flex-justify-between();
        @include flex-wrap();
    }
    &-col {
        @include flex-cell();
        height: 37px;
        border-radius: 4px;
        margin-bottom: 8px;
        padding: 0 8px;
        box-sizing: border-box;
        background-color: #ECF1F1;
        &.alone {
            @include flex-center();
        }
        &.active {
            background-color: $primary-color;
            .labal {
                @include font(400, 12px, 17px);
            }
            .value {
                @include font(400, 12px, 17px);
            }
        }
        .labal {
            @include font(400, 12px, 17px, #999999);
        }
        .value {
            @include font(400, 12px, 17px);
        }
    }
    .flex-1 {
        width: 100%;
        flex: 0 0 100%;
    }
    .flex-2 {
        width: calc((100% - 8px)/2);
        flex: 0 0 calc((100% - 8px)/2);
    }
    .flex-3 {
        width: calc((100% - 16px)/3);
        flex: 0 0 calc((100% - 16px)/3);
    }
}
</style>