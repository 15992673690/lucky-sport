<script setup>
// import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    hideBack: {
        type: Boolean,
        default: false
    },
    logo: {
        type: String,
        default: ''
    }
});
const router = useRouter();

const onBack = () => {
    router.back(-1)
}
</script>

<template>
    <van-nav-bar>
        <template #left>
            <icon icon-class="icon_arrow" :size="24" color="#1E1E1E"
            class="header-back" @click="onBack" v-if="!hideBack"></icon>
        </template>
        <template #title>
            <img class="header-logo" v-if="props.logo" :src="props.logo" alt="" />
            <span class="header-title">{{ props.title }}</span>
        </template>
        <template #right>
            
        </template>
    </van-nav-bar>
</template>

<style lang="scss">
.van-nav-bar {
    --van-nav-bar-height: #{$header-height};
    .header-back {
        transform: rotate(90deg);
        transform-origin: center;
    }
    .header-logo {
        width: 16px;
        height: 16px;
        margin-right: 4px;
    }
    .header-title {
        @include font(600, 16px, 22px);
    }
    &__title {
        @include flex-align-center();
    }
}
</style>