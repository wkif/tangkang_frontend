<template>
    <view v-if="(info !== null && info !== '') || dot" :class="'van-info ' + utils.bem('info', { dot }) + ' custom-class'" :style="customStyle">{{ dot ? '' : info }}</view>
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
        dot: Boolean,
        info: null,
        customStyle: String
    }
};
</script>
<style>
@import './index.css';
</style>
