<script setup>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { Swiper, SwiperSlide } from "swiper/vue";
import tabView from '@/components/tab/index.vue';
import leagueView from '@/components/league/index.vue';
import noBuildView from '@/components/no-build/index.vue';
import betOrderView from '@/components/bet-order/index.vue';
import { getFootballList } from '@/api/home';
import { getDictLabelFilter } from '@/utils/filter';
import { gameStatusDict, leagueDict } from '@/utils/dict';
import "swiper/css";
import "swiper/css/free-mode";


const store = useStore();
const router = useRouter();
const state = reactive({
    sportActive: 'football',
    sportList: [
        {
            img: require('@/assets/imgs/ball1.png'),
            label: '足球',
            value: 'football',
            count: 16
        }, {
            img: require('@/assets/imgs/ball2.png'),
            label: '篮球',
            value: 'basketball'
        }, {
            img: require('@/assets/imgs/ball3.png'),
            label: '排球',
            value: 'volleyball'
        }, {
            img: require('@/assets/imgs/ball4.png'),
            label: '网球',
            value: 'tennis'
        }, {
            img: require('@/assets/imgs/ball5.png'),
            label: '高尔夫',
            value: 'golf'
        }
    ],
    footballList: [],
    refreshCount: 0,
    typeActive: leagueDict[0].value,
    typeList: leagueDict,
    drawer: [],
    showLeague: false,
    showBuildNo: false,
    showBetOrder: false
});

const filter = {
    oddsLabelFilter: function(str) {
        let copyArr = str.split('&');
        // let label = copyArr[0].length > 2 ? copyArr[0].substring(0, 2) + '...' : copyArr;
        let value = copyArr[1];
        return `${value}`
        // return `${label}/${value}`
    }
}

const getList = data => {
    // Toast.loading({
    //     message: '加载中...',
    //     forbidClick: true,
    //     loadingType: 'spinner',
    // });
    state.refreshCount ++;
    state.footballList = data
    console.log(data)
}

const getCount = data => {
    data && Object.keys(data).forEach(key => {
        let opt = state.typeList.find(item => `${item.key}Count` ==  key);
        if(opt !== undefined) opt.count = data[key];
    })
}

const onTab = e => {
    if(e != 'football') {
        state.showBuildNo = true
    }else {
        state.sportActive = e;
    }
}
const onChangeSlide = () => {
    store.dispatch('SET_SLIDESHOW', true)
}

const onDrawerChange = e => {
    if(state.drawer.includes(e)) {
        state.drawer.splice(state.drawer.indexOf(e), 1)
    }else {
        state.drawer.push(e)
    }
}

const onHandlerBet = (matchID, oddsIndex, arrIndex) => {
    store.dispatch('SET_BETLIST', `${matchID}-${oddsIndex}-${arrIndex}`)
}

const onHandlerDetail = (matchID) => {
    router.push({
        name: 'football', 
        params: { 
            id: matchID
        },
        query: {
            type: state.typeActive == 1 ? 1 : 0 // 滚球是1 其他都是0
        }
    })
}

const { onResult, variables } = getFootballList(computed(() => {
    return {
        listType: state.typeActive,
        filterType: 1
    }
}))

onResult(response => {
    const { footballListV2 } = response.data;
    let [key, value] = footballListV2.split("@");
    let data = JSON.parse(value);
    console.log(data, 'variables: ============' + variables)
    if(key == 'list') {
        getList(data)
    }else if(key == 'count') {
        getCount(data)
    }else if(key == 'event') {
        return
    }
})

</script>

<template>
    <layout-view>
        <template #header>
            <van-nav-bar>
                <template #left>
                    <icon icon-class="icon_more" color="#fff" :size="20" @click="onChangeSlide" />
                </template>
                <template #right>
                    <icon style="margin-right: 16px" icon-class="icon_search" color="#fff" :size="20" @click="router.push({name: 'search'})" />
                    <icon icon-class="icon_bet" color="#fff" :size="20" @click="router.push({name: 'my-bet'})" />
                </template>
            </van-nav-bar>
        </template>
        <div class="sport">
            <div class="sport-tab">
                <swiper :spaceBetween="24" slidesPerView="auto" :freeMode="true">
                    <swiper-slide class="sport-tab-item" :class="{ active: state.sportActive == item.value }"
                    v-for="(item, index) in state.sportList" :key="index" @click="onTab(item.value)">
                        <img class="item-img" :src="item.img" alt="" />
                        <div class="item-name">
                            {{item.label}} 
                            {{item.count}}
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
            <div class="sport-ball">
                <tab-view v-model:value="state.typeActive" :options="state.typeList">
                    <template #default="{ row }">
                        {{row.label}}
                        {{row.count}}
                    </template>
                </tab-view>
                <div class="sport-ball-list">
                    <div class="sport-card">
                        <div class="sport-card-header">
                            <van-button class="header-sizer" type="primary" @click="state.showLeague= true">
                                赛事筛选<icon icon-class="icon_arrow" :size="14" color="#1E1E1E" />
                            </van-button>
                            <div class="header-right">
                                <div class="header-right-sizer" data-active="2">
                                    <span>时间</span>
                                    <icon icon-class="icon_transform" :size="12"></icon>
                                    <span>赛事</span>
                                </div>
                                <icon icon-class="icon_collapse" :size="14" color="#1E1E1E"></icon>
                            </div>
                        </div>
                        <div class="sport-card-wrapper">
                            <div class="sport-card-item" v-for="(item, index) in state.footballList" :key="index" 
                            :data-view="state.drawer.includes(item.leagueID) ? 'slideDowm' : 'slideUp'">
                                <div class="sport-card-cell">
                                    <div class="cell-left">
                                        <img class="cell-logo" :src="item.leagueLogo" alt="">
                                        <span class="cell-name">{{item.leagueName}}</span>
                                    </div>
                                    <icon class="cell-right" icon-class="icon_arrow" :size="14" color="#999999" @click.self="onDrawerChange(item.leagueID)"></icon>
                                </div>
                                <div class="sport-card-main">
                                    <template v-for="(row, i) in item.matchList" :key="i">
                                        <div class="main-top">
                                            <div class="main-top-left">
                                                <icon icon-class="icon_collection" color="#F5D135" :size="20" />
                                                <icon icon-class="icon_home_live" color="#3FC07B" :size="16" />
                                            </div>
                                            <div class="main-top-right">
                                                <div v-for="(tt, ti) in row.homePageOdds" :key="ti">{{tt.title}}</div>
                                            </div>
                                        </div>
                                        <div class="main-bottom" @click="onHandlerDetail(row.matchID)">
                                            <div class="main-bottom-left">
                                                <div class="left-party">
                                                    <div class="left-party-item">
                                                        <img :src="row.homeLogo" alt="">{{row.homeName}}
                                                    </div>
                                                    <div class="left-party-item">
                                                        <img :src="row.awayLogo" alt="">{{row.awayName}}
                                                    </div>
                                                </div>
                                                <div class="left-date" v-if="row.status == 0">
                                                    12月20日 09:30
                                                </div>
                                                <div class="left-score" v-else>
                                                    <div class="score">
                                                        <span>{{row.homeScore}}</span>
                                                        <span>{{row.awayScore}}</span>
                                                    </div>
                                                    <div class="half">{{getDictLabelFilter(row.status, gameStatusDict)}}</div>
                                                </div>
                                            </div>
                                            <div class="main-bottom-right">
                                                <div class="right-item" v-for="(tt, ti) in row.homePageOdds" :key="ti">
                                                    <div class="right-item-chunk" :class="{ 
                                                        active: store.state.betList.includes(`${row.matchID}-${ti}-${ai}`),
                                                        close: tt.close
                                                    }" v-for="(at, ai) in tt.Arr" :key="ai" @click="onHandlerBet(row.matchID, ti, ai)">
                                                        <span v-if="ti == 0 && ai == 0">
                                                            1
                                                        </span>
                                                        <span v-else-if="ti == 0 && ai == 1">
                                                            x
                                                        </span>
                                                        <span v-else-if="ti == 0 && ai == 2">
                                                            2
                                                        </span>
                                                        <span v-else-if="ti == 2 && ai == 0">
                                                            大
                                                        </span>
                                                        <span v-else-if="ti == 2 && ai == 1">
                                                            小
                                                        </span>
                                                        <span v-else>
                                                            {{filter.oddsLabelFilter(at.label)}}
                                                        </span>
                                                        <span>{{at.oddObj.odds1}}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <league-view v-model:show="state.showLeague" />
        <no-build-view v-model:show="state.showBuildNo" />
        <bet-order-view v-model:show="state.showBetOrder" />
    </layout-view>
</template>

<style src="./style.scss" lang="scss" scoped></style>