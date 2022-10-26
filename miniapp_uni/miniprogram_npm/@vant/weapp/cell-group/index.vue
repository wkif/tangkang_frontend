<template>
    <view>
        <view v-if="title" :class="utils.bem('cell-group__title', { inset })">
            {{ title }}
        </view>
        <view :class="'custom-class ' + utils.bem('cell-group', { inset }) + ' ' + (border ? 'van-hairline--top-bottom' : '')">
            <slot />
        </view>
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script>
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

export default {
    data() {
        return {};
    },
    props: {
        title: String,
        border: {
            type: Boolean,
            default: true
        },
        inset: Boolean
    }
};
</script>
<style>
@import './index.css';
</style>
