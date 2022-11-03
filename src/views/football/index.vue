<script setup>
import { reactive, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import tabView from '@/components/tab/index.vue';
import { Swiper, SwiperSlide } from "swiper/vue";
import betView from './components/bet-view.vue';
import dataBegining from './components/data-begining.vue';
import dataNostart from './components/data-nostart.vue';
import { getSportOddsDetail } from '@/api/football';
import "swiper/css";


const route = useRoute()
const state = reactive({
    status: 2,
    detailData: null,
    tab: 1,
    tabList: [],
    showVideo: false,
    showMask: false
})
const swiperRef = ref(null);

const getOddsType = data => {
    console.log('odds', data)
}

const getDetail = data => {
    console.log('detail', data)
    state.detailData = data
}

const onPrev = () => {
    // if(state.showMask <= 1) return;
    // state.showMask --;
}
const onNext = () => {
    // if(state.showMask >= 2) return;
    // state.showMask ++;
}
const setSwiperRef = function(swiper) {
    swiperRef.value = swiper
}

const { onResult } = getSportOddsDetail(computed(() => {
    return {
        matchID: route.params.id,
        listType: route.query.type
    }
}))

onResult(response => {
    const { sportOddsDetail } = response.data;
    let [key, value] = sportOddsDetail.split("@");
    let data = JSON.parse(value);
    
    if(key == 'status') {
        getDetail(data)
    }else if(key == 'odds') {
        getOddsType(data)
    }
})
</script>

<template>
    <layout-view :title="state.detailData?.leagueName" :logo="state.detailData?.leagueLogo">
        <div class="football-banner" v-if="state.detailData">
            <div class="football-banner-module">
                <div class="module-title">
                    <div class="host">{{state.detailData.homeName}}</div>
                    <div class="partition">未开赛</div>
                    <div class="away">{{state.detailData.awayName}}</div>
                </div>
                <div class="module-main" :class="`status${state.status}`">
                    <div class="host" :style="{backgroundImage: `url(${state.detailData.homeLogo})`}"></div>
                    <div class="partition">
                        <template v-if="state.status == 1">
                            <div class="partition-sub">
                                <span class="date">10/28</span>
                                <span class="time">00:45</span>
                            </div>
                            <div class="partition-text">vs</div>
                        </template>
                        <template v-if="state.status == 2">
                            <div class="partition-sub">下半场</div>
                            <div class="partition-text">
                                2<span class="unit">-</span>1
                            </div>
                        </template>
                    </div>
                    <div class="away" :style="{backgroundImage: `url(${state.detailData.awayLogo})`}"></div>
                    <div class="lever">
                        <div class="lever-item">
                            <icon icon-class="icon_video" :size="16" color="#ffffff"
                            @click="state.showVideo = true"></icon> 直播
                        </div>
                        <div class="lever-item">
                            <icon icon-class="icon_data" :size="16" color="#ffffff"
                            @click="state.showMask = true"></icon> 数据
                        </div>
                    </div>
                </div>
                <img class="module-swing" src="@/assets/imgs/football.png" alt="">
            </div>
            <div class="football-banner-mask" v-show="state.showMask">
                <div class="mask-title">
                    <icon icon-class="icon_close_1" :size="16" color="#ffffff" 
                    class="mask-title-left" @click="state.showMask = fasle"></icon>
                    <div class="mask-title-right">
                        <icon icon-class="icon_arrow" :size="16" color="#ffffff" 
                        class="prev" @click="onPrev"></icon>
                        <span class="page">{{swiperRef?.activeIndex + 1}}/2</span>
                        <icon icon-class="icon_arrow" :size="16" color="#ffffff" 
                        class="next" @click="onNext"></icon>
                    </div>
                </div>
                <swiper @swiper="setSwiperRef">
                    <swiper-slide>
                        <data-begining :data="state.detailData" />
                    </swiper-slide>
                    <swiper-slide>
                        <data-nostart :data="state.detailData" />
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <tab-view v-model:value="state.tab" :options="state.tabList" :spaceBetween="24">
            <template #default="{ row }">
                {{row.label}}
            </template>
        </tab-view>
        <div class="football-bet">
            <bet-view class="football-bet-item" title="开球球队" :options="[
                { label: '主队', value: 1.25 },
                { label: '客队', value: 0.60 },
            ]" :span="2" />

            <bet-view class="football-bet-item" title="让球" :span="2" show-team />
            <bet-view class="football-bet-item" title="让球-上半场" :span="2" show-team />
            <bet-view class="football-bet-item" title="让球-下半场" :span="2" show-team />

            <bet-view class="football-bet-item" title="大/小" :span="2" show-team />
            <bet-view class="football-bet-item" title="大/小-上半场" :span="2" show-team />
            <bet-view class="football-bet-item" title="大/小-下半场" :span="2" show-team />

            <bet-view class="football-bet-item" title="独赢" :options="[
                { value: 1.25 },
                { value: 1.25 },
                { value: 1.25 },
            ]" :span="3" show-team :show-label="false" />
            <bet-view class="football-bet-item" title="独赢-上半场" :span="3" show-team :show-label="false" />
            <bet-view class="football-bet-item" title="独赢-下半场" :span="3" show-team :show-label="false" />

            <bet-view class="football-bet-item" title="波胆" :span="3" show-team />
            <bet-view class="football-bet-item" title="波胆-上半场" :span="3" show-team />
            <bet-view class="football-bet-item" title="波胆-下半场" :span="3" show-team />

            <bet-view class="football-bet-item" title="精确进球数" :options="[
                { label: 0, value: 1.25 },
                { label: 1, value: 1.25 },
                { label: 2, value: 1.25 },
            ]" :span="1" />
            <bet-view class="football-bet-item" title="精确进球数-上半场" :span="1" />
            <bet-view class="football-bet-item" title="精确进球数-下半场" :span="3" />

            <bet-view class="football-bet-item" title="平局退款" :span="2" show-team />
            <bet-view class="football-bet-item" title="平局退款-上半场" :span="2" show-team />
            <bet-view class="football-bet-item" title="平局退款-下半场" :span="2" show-team />

            <bet-view class="football-bet-item" :title="`皇家马德里 获胜退款`" :span="2" />
            <bet-view class="football-bet-item" :title="`巴塞罗那 获胜退款`" :span="2" />

            <bet-view class="football-bet-item" title="总进球数" :span="1" />

            <bet-view class="football-bet-item" title="两队均有进球" :span="2" />
            <bet-view class="football-bet-item" title="两队均有进球-上半场" :span="2" />
            <bet-view class="football-bet-item" title="两队均有进球-下半场" :span="2" />

            <bet-view class="football-bet-item" :title="`皇家马德里 进球-大/小`" :span="2" />
            <bet-view class="football-bet-item" :title="`皇家马德里 进球-大/小-上半场`" :span="2" />
            <bet-view class="football-bet-item" :title="`皇家马德里 进球-大/小-下半场`" :span="2" />

            <bet-view class="football-bet-item" :title="`巴塞罗那 进球-大/小`" :span="2" />
            <bet-view class="football-bet-item" :title="`巴塞罗那 进球-大/小-上半场`" :span="2" />
            <bet-view class="football-bet-item" :title="`巴塞罗那 进球-大/小-下半场`" :span="2" />

            <bet-view class="football-bet-item" :title="`皇家马德里 精确进球数`" :span="1" />
            <bet-view class="football-bet-item" :title="`巴塞罗那 精确进球数`" :span="1" />

            <bet-view class="football-bet-item" title="单/双" :span="2" />
            <bet-view class="football-bet-item" title="单/双-上半场" :span="2" />
            <bet-view class="football-bet-item" title="单/双-下半场" :span="2" />

            <bet-view class="football-bet-item" :title="`皇家马德里 单/双`" :span="2" />
            <bet-view class="football-bet-item" :title="`巴塞罗那 单/双`" :span="2" />

            <bet-view class="football-bet-item" title="第一粒进球" :span="3" />
            <bet-view class="football-bet-item" title="第一粒进球-上半场" :span="3" />
            <bet-view class="football-bet-item" title="第一粒进球-下半场" :span="3" />

            <bet-view class="football-bet-item" title="任一球队获胜" :span="2" />
            <bet-view class="football-bet-item" :title="`皇家马德里 获胜`" :span="2" />
            <bet-view class="football-bet-item" :title="`巴塞罗那 获胜`" :span="2" />

            <bet-view class="football-bet-item" title="半场/全场" :span="1" />

            <bet-view class="football-bet-item" title="净胜球数" :span="1" />

            <bet-view class="football-bet-item" title="让球胜平负" :span="3" show-team />
            <bet-view class="football-bet-item" title="让球胜平负-上半场" :span="3" show-team />
            <bet-view class="football-bet-item" title="让球胜平负-下半场" :span="3" show-team />

            <bet-view class="football-bet-item" title="双重机会" :span="3" />
            <bet-view class="football-bet-item" title="双重机会-上半场" :span="3" />
            <bet-view class="football-bet-item" title="双重机会-下半场" :span="3" />

            <bet-view class="football-bet-item" :title="`皇家马德里 零失球`" :span="2" />
            <bet-view class="football-bet-item" :title="`皇家马德里 零失球-上半场`" :span="2" />
            <bet-view class="football-bet-item" :title="`皇家马德里 零失球-下半场`" :span="2" />

            <bet-view class="football-bet-item" :title="`巴塞罗那 零失球`" :span="2" />
            <bet-view class="football-bet-item" :title="`巴塞罗那 零失球-上半场`" :span="2" />
            <bet-view class="football-bet-item" :title="`巴塞罗那 零失球-下半场`" :span="2" />

            <bet-view class="football-bet-item" title="独赢 & 大/小1.5" :span="1" />
            <bet-view class="football-bet-item" title="独赢 & 大/小1.5-上半场" :span="1" />
            <bet-view class="football-bet-item" title="独赢 & 大/小1.5-下半场" :span="1" />

            <bet-view class="football-bet-item" title="独赢 & 双方均进球" :span="1" />
            <bet-view class="football-bet-item" title="独赢 & 双方均进球-上半场" :span="1" />
            <bet-view class="football-bet-item" title="独赢 & 双方均进球-下半场" :span="1" />
        </div>
    </layout-view>
</template>

<style src="./style.scss" lang="scss" scoped></style>