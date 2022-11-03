import { createStore, createLogger } from 'vuex';

const debug =  process.env.NODE_ENV === 'development'; // 开发环境

const state = {
    slideShow: false,
    slideRule: '',
    slideSort: '',
    betList: []
};

const mutations = {
    setSilde: function(state, value) {
        state.slideShow = value;
    },
    setSildeRule: function(state, value) {
        state.slideRule = value;
    },
    setSildeSort: function(state, value) {
        state.slideSort = value;
    },
    setBetList: function(state, arr) {
        state.betList = arr;
    }
};

const actions = {
    SET_SLIDESHOW: function({ commit }, value) {
        commit('setSilde', value)
    },
    SET_SLIDERULE: function({ commit }, value) {
        commit('setSildeRule', value)
    },
    SET_SLIDESORT: function({ commit }, value) {
        commit('setSildeSort', value)
    },
    SET_BETLIST: function({ commit, state }, id) {
        let list = state.betList.concat();
        if(list.includes(id)) {
            list.splice(list.indexOf(id), 1)
        }else {
            list.push(id)
        }
        commit('setBetList', list)
    }
};

export default createStore({
    state,
    mutations,
    actions,
    strict: debug, // true 严格使用 mutations 改变 state
    plugins: debug ? [
        createLogger()
    ] : [] // 开发模式使用日志 非开发不使用
})