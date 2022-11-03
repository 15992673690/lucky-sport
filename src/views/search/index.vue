<script setup>
import { reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import tabView from '@/components/tab/index.vue';
import { getDictLabelFilter } from '@/utils/filter';
import { ballDict } from '@/utils/dict';
import { matchSearch } from '@/api/search';

const router = useRouter();
const state = reactive({
    value: '',
    loading: false,
    tab: ballDict[0].value,
    tabList: ballDict,
    searchList: []
})

const onSearch = () => {
    state.searchList = [];
    if(state.value === '') {
        return false;
    }else {
        state.loading = true
        matchSearch({ name: state.value }).then(res => {
            if(res.code == 20000) {
                let { matchSearch } = res.data;
                state.searchList = matchSearch;
                state.loading = false
            }
        })
    }
};

const onHandlerItem = id => {
    let { key } = state.tabList.find(item => item.value == state.tab)
    router.push({name: key, params: { id }})
};

const onBack = () => {
    router.back(-1)
};

watch(() => state.tab, () => {
    onSearch()
})
</script>

<template>
    <div class="search-title">
        <van-field v-model="state.value" @update:model-value="onSearch">
            <template #left-icon>
                <icon icon-class="icon_search" :size="16" color="#B5B5B5"></icon>
            </template>
        </van-field>
        <span class="cancel" @click="onBack">取消</span>
    </div>
    <tab-view v-model:value="state.tab" :options="state.tabList" :spaceBetween="18">
        <template #default="{ row }">
            {{row.label}}
            {{row.num}}
        </template>
    </tab-view>
    <div class="search-list" v-loading="state.loading">
        <van-loading v-if="state.loading" type="spinner" />
        <div v-else class="search-list-item" v-for="(item, index) in state.searchList" @click="onHandlerItem(item.matchID)" :key="index">
            <div class="search-list-col">
                <div class="item-host">
                    <img class="item-logo" :src="item.homeLogo" alt="">
                    {{item.homeName}}
                </div>
                <div class="item-away">
                    <img class="item-logo" :src="item.awayLogo" alt="">
                    {{item.awayName}}
                </div>
            </div>
            <div class="search-list-col">
                <div class="item-date">12月2日</div>
                <div class="item-time">03:00{{item.matchTime}}</div>
            </div>
            <div class="search-list-col">
                <div class="item-ball">{{getDictLabelFilter(state.tab, state.tabList)}}</div>
                <div class="item-league">{{item.leagueName}}</div>
            </div>
        </div>
    </div>
</template>

<style src="./style.scss" lang="scss" scoped></style>