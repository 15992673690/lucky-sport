<script setup>
import { toRefs } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/free-mode";

const props = defineProps({
    value: {
        type: [String, Number],
        default: ''
    },
    options: {
        type: [Object, Array],
        default: () => new Array()
    },
    spaceBetween: {
        type: Number,
        default: 18
    }
});
const { value } = toRefs(props);

const emits = defineEmits(['update:value']);

const onTab = e => {
    emits('update:value', e)
}
</script>

<template>
    <swiper class="tab" :spaceBetween="props.spaceBetween" slidesPerView="auto" :freeMode="true">
        <swiper-slide class="tab-item" :class="{ active: value == item.value }"
            v-for="(item, index) in props.options" :key="index" @click="onTab(item.value)">
            <div class="tab-item-inner">
                <slot :row="item"></slot>
            </div>
        </swiper-slide>
    </swiper>
</template>

<style lang="scss" scoped>
.tab {
    height: $tab-height;
    background-color: $white;
    padding: 0 16px;
    &-item {
        width: auto;
        height: 100%;
        @include flex-align-center();
        &-inner {
            @include font(400, 14px, 20px, $black);
        }
        &.active {
            @include border-bottom(32px, 4px, $primary-color, 12px);
            .tab-item-inner {
                @include font(600, 14px, 22px);
            }
        }
    }
}
</style>