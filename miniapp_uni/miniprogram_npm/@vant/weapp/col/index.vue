<template>
    <view :class="'custom-class ' + utils.bem('col', [span]) + ' ' + (offset ? 'van-col--offset-' + offset : '')" :style="computed.rootStyle({ gutter })">
        <slot />
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script module="computed" lang="wxs" src="./index.wxs"></script>
<script>
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var relation_1 = require('../common/relation');

var component_1 = require('../common/component');

export default {
    data() {
        return {};
    },
    relation: (0, relation_1.useParent)('row'),
    props: {
        span: Number,
        offset: Number
    }
};
</script>
<style>
@import './index.css';
</style>
