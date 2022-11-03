<script setup>
import { getCurrentInstance } from 'vue';
import headerView from '@/components/header/index';

const vm = getCurrentInstance();
const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    logo: {
        type: String,
        default: ''
    }
});

</script>

<template>
    <div id="main">
        <!-- HEADER -->
        <template v-if="vm.slots.header">
            <slot name="header" />
        </template>
        <template v-else>
            <header-view :title="props.title" :logo="props.logo" />
        </template>
        <!-- CONTAINER -->
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#main {
    background-color: $body-bg-color;
}
.content {
    min-height: calc(100vh - #{$header-height});
}
</style>