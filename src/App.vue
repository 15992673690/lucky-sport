<template>
    <slide-view />
    <router-view v-slot="{ Component }">
        <component :is="Component" :key="$route.name"/>
    </router-view>
</template>

<script setup>
import slideView from '@/components/slide/index';
</script>

<style lang="scss">
#app {
    min-height: 100vh;
    background-color: $body-bg-color;
}
</style>
