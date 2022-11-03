<script setup>
import { ref } from 'vue';
import XPopup from '@/components/popup/index.vue';


const show = ref(false);
</script>

<template>
    <x-popup v-model:show="show" position="center" width="343px" height="385px" title="Trebles">
        <div class="trebles">
            <div class="trebles-title">A Treble is 1 bet made up of 3 selections which must be successful to get a return</div>
            <div class="trebles-dt">Tips</div>
            <div class="trebles-dd">Bonuses not included</div>
            <div class="trebles-dd">To Return values are subject to maxmum payouts as detailed in our rules</div>
            <div class="trebles-table">
                <div class="trebles-table-thead">Selections</div>
                <div class="trebles-table-tbody">
                    <div class="trebles-table-tr">
                        <span class="trebles-table-td">1、2、3</span>
                        <span class="trebles-table-td">1、2、4</span>
                        <span class="trebles-table-td">1、3、4</span>
                    </div>
                    <div class="trebles-table-tr">
                        <span class="trebles-table-td">2、3、4</span>
                        <span class="trebles-table-td">2、3、5</span>
                        <span class="trebles-table-td">2、4、5</span>
                    </div>
                    <div class="trebles-table-tr">
                        <span class="trebles-table-td">3、4、5</span>
                        <span class="trebles-table-td"></span>
                        <span class="trebles-table-td"></span>
                    </div>
                </div>
            </div>
        </div>
    </x-popup>
</template>

<style lang="scss" scoped>
.trebles {
    margin-top: 8px;
    padding: 0 16px;
    &-title {
        @include font(400, 12px, 17px);
        margin-bottom: 16px;
    }
    &-dt {
        @include font(600, 14px, 20px);
        margin-bottom: 6px
    }
    &-dd {
        @include flex-align-center();
        @include font(400, 12px, 17px);
        margin-bottom: 8px;
        &:before {
            content: "";
            display: block;
            margin-right: 8px;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: $primary-color;
        }
    }
    &-table {
        border-radius: 8px;
        box-shadow: 0px 4px 12px rgba(30, 30, 30, 0.05);
        &-thead {
            @include flex-center();
            height: 40px;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            background: rgba(0, 0, 0, 0.05);
        }
        &-tbody {
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
        }
        &-tr {
            @include flex();
            @include border-bottom(100%, 1px);
            &:last-of-type {
                @include border-bottom(100%, 0px);
            }
        }
        &-td {
            @include flex-center();
            @include font(400, 12px, 17px); 
            @include border-right(1px, 100%);
            height: 40px;
            width: 33.33%;
            &:last-of-type {
                @include border-right(0px, 100%);
            }
        }
    }
}
</style>