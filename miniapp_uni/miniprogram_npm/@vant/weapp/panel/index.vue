<template>
    <view class="van-panel van-hairline--top-bottom custom-class">
        <van-cell v-if="title || desc || status" :title="title" :label="desc" :value="status" custom-class="header-class" value-class="van-panel__header-value" />
        <slot v-else name="header" />

        <view class="van-panel__content">
            <slot />
        </view>

        <view class="van-panel__footer van-hairline--top footer-class">
            <slot name="footer" />
        </view>
    </view>
</template>

<script>
'use strict';
import vanCell from '../cell/index';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

export default {
    data() {
        return {};
    },
    components: {
        vanCell
    },
    classes: ['header-class', 'footer-class'],
    props: {
        desc: String,
        title: String,
        status: String
    }
};
</script>
<style>
@import './index.css';
</style>
