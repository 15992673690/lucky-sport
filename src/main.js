import { createApp, provide, h } from 'vue';
import { ConfigProvider } from 'vant';
import { DefaultApolloClient } from "@vue/apollo-composable";
import apolloClient from "@/utils/ApolloClient";
import router from './router';
import store from './store'
import App from './App.vue';
import LayoutView from '@/components/layout';
import Icon from '@/components/icon';
// import { Loading } from 'vant'; 
import '@/utils/locale';

// const messages = {

// }
const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient)
    },
    render: () => h(App),
})

app.component('layout-view', LayoutView);
app.component('icon', Icon);
app.directive('loading', () => {//e, { value }
    
})

app.use(router).use(store).use(ConfigProvider).mount('#app')
