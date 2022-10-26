<template>
    <view :class="'custom-class ' + utils.bem('loading', { vertical })">
        <view :class="'van-loading__spinner van-loading__spinner--' + type" :style="computed.spinnerStyle({ color, size })">
            <view v-if="type === 'spinner'" class="van-loading__dot" v-for="(item, index) in array12" :key="index"></view>
        </view>
        <view class="van-loading__text" :style="computed.textStyle({ textSize })">
            <slot />
        </view>
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script module="computed" lang="wxs" src="./index.wxs"></script>
<script>
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

export default {
    data() {
        return {
            array12: Array.from({
                length: 12
            })
        };
    },
    props: {
        color: String,
        vertical: Boolean,
        type: {
            type: String,
            default: 'circular'
        },
        size: String,
        textSize: String
    }
};
</script>
<style>
@import './index.css';
</style>
