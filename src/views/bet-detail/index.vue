<script setup>
import { useRoute } from 'vue-router';


const { meta } = useRoute();
</script>

<template>
    <layout-view :title="meta.title">
        <div class="bet" v-if="false">
            <div class="bet-card" v-for="(item, index) in 2" :key="index">
                <div class="bet-card-result">
                    <img class="item-result" src="" alt="">
                </div>
                <div class="bet-card-title">
                    <span>2022-09-15</span>
                    <span>15:51:16</span>
                </div>
                <div class="bet-card-game">
                    <div class="game-item">
                        <div class="game-item-col">
                            <span class="item-team">切尔西 -0.5</span>
                            <span class="item-odds">18.1</span>
                        </div>
                        <div class="game-item-col">
                            <span class="item-type">全场独赢</span>
                        </div>
                        <div class="game-item-col">
                            <span class="item-host">切尔西</span>
                            <icon icon-class="icon_vs"></icon>
                            <span class="item-away">利物浦</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bet-card bet-collect">
                <div class="bet-card-title">
                    <span>投注类型</span>
                    <span>3串1</span>
                </div>
                <div class="bet-card-game">
                    <div class="game-item">
                        <span>单位投注：</span>
                        <span>20 USDT</span>
                    </div>
                    <div class="game-item">
                        <span>投注项数：</span>
                        <span>1</span>
                    </div>
                    <div class="game-item">
                        <span>投注总额：</span>
                        <span>100 USDT</span>
                    </div>
                    <div class="game-item">
                        <span>返还总额：</span>
                        <span class="up">100 USDT</span>
                    </div>
                </div>
                <div class="bet-card-footer">
                    <span>2022-09-15</span>
                    <span>15:51:16</span>
                </div>
            </div>
        </div>
        <div class="noDetail">
            <img class="noDetail-img" src="@/assets/imgs/noDetail.png" alt="">
            <span class="noDetail-text">您暂无订单哟</span>
        </div>
    </layout-view>
</template>

<style src="./style.scss" lang="scss" scoped></style>