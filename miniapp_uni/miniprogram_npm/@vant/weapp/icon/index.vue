<template>
    <view :class="computed.rootClass({ classPrefix, name })" :style="computed.rootStyle({ customStyle, color, size })" @tap="onClick">
        <van-info v-if="info !== null || dot" :dot="dot" :info="info" custom-class="van-icon__info" />
        <image v-if="computed.isImage(name)" :src="name" mode="aspectFit" class="van-icon__image" />
    </view>
</template>
<script module="computed" lang="wxs" src="./index.wxs"></script>
<script>
'use strict';
import vanInfo from '../info/index';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

export default {
    data() {
        return {};
    },
    components: {
        vanInfo
    },
    props: {
        dot: Boolean,
        info: null,
        size: null,
        color: String,
        customStyle: String,
        classPrefix: {
            type: String,
            default: 'van-icon'
        },
        name: String
    },
    methods: {
        onClick: function () {
            this.$emit('click');
        }
    }
};
</script>
<style>
@import './index.css';
</style>
