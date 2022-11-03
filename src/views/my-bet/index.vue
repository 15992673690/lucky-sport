<script setup>
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import tabView from '@/components/tab/index.vue';
import { settleStatusDict } from '@/utils/dict';
import { getSportBetList } from '@/api/my-bet';

const { meta } = useRoute();
const router = useRouter();
const state = reactive({
    tab: 1,
    tabList: settleStatusDict
})
getSportBetList({ isSettlement: state.tab }).then(res => {
    console.log(res)
})
</script>

<template>
    <layout-view :title="meta.title">
        <div class="bet">
            <tab-view v-model:value="state.tab" :options="state.tabList" :spaceBetween="66">
                <template #default="{ row }">
                    {{row.label}}
                </template>
            </tab-view>
            <div class="bet-wrapper unliquidated" v-show="state.tab == 0">
                <div class="bet-card" v-for="(item, index) in 6" :key="index" @click="router.push({name: 'bet-detail', params: item.id})">
                    <div class="bet-card-title">
                        <span>2022-09-15</span>
                        <span>15:51:16</span>
                    </div>
                    <div class="bet-card-game">
                        <div class="game-item" v-for="(row, i) in 3" :key="i">
                            <div class="game-item-col">
                                <span class="item-team">切尔西 -0.5</span>
                                <span class="item-odds">18.1</span>
                            </div>
                            <div class="game-item-col">
                                <span class="item-type">全场独赢</span>
                            </div>
                        </div>
                    </div>
                    <div class="bet-card-total">
                        <div class="total-message">
                            <span>3串1</span>
                            <span>1投注</span>
                            <span>100 USDT</span>
                        </div>
                        <div class="total-bet">
                            <span>投注金额：</span>
                            <span>100 USDT</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bet-wrapper settled" v-show="state.tab == 1">
                <div class="bet-card" v-for="(item, index) in 6" :key="index">
                    <div class="bet-card-result">
                        <img class="item-result" :src="require(`@/assets/imgs/bet-${index == 0 ? 'win' : index == 1 ? 'lose' : 'dogfall'}.png`)" alt="" />
                    </div>
                    <div class="bet-card-title">
                        <span>2022-09-15</span>
                        <span>15:51:16</span>
                    </div>
                    <div class="bet-card-game">
                        <div class="game-item" v-for="(row, i) in 3" :key="i">
                            <div class="game-item-col">
                                <span class="item-team">切尔西 -0.5</span>
                                <span class="item-odds">18.1</span>
                            </div>
                            <div class="game-item-col">
                                <span class="item-type">全场独赢</span>
                            </div>
                        </div>
                    </div>
                    <div class="bet-card-total">
                        <div class="total-message">
                            <span>3串1</span>
                            <span>1投注</span>
                            <span>100 USDT</span>
                        </div>
                        <div class="total-bet">
                            <span>投注金额：</span>
                            <span>100 USDT</span>
                        </div>
                        <div class="total-return" :class="{up: index == 0, down: index == 1}">
                            <span>返还：</span>
                            <span>100 USDT</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </layout-view>
</template>

<style src="./style.scss" lang="scss" scoped></style>