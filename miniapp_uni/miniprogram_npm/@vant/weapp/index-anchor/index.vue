<template>
    <view class="van-index-anchor-wrapper" :style="wrapperStyle">
        <view :class="'van-index-anchor ' + (active ? 'van-index-anchor--active van-hairline--bottom' : '')" :style="anchorStyle">
            <slot v-if="useSlot" />
            <block v-else>
                <text>{{ index }}</text>
            </block>
        </view>
    </view>
</template>

<script>
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var utils_1 = require('../common/utils');

var component_1 = require('../common/component');

var relation_1 = require('../common/relation');

export default {
    data() {
        return {
            active: false,
            wrapperStyle: '',
            anchorStyle: ''
        };
    },
    relation: (0, relation_1.useParent)('index-bar'),
    props: {
        useSlot: Boolean,
        index: null
    },
    methods: {
        scrollIntoView: function (scrollTop) {
            var that = this;
            (0, utils_1.getRect)(this, '.van-index-anchor-wrapper').then(function (rect) {
                uni.pageScrollTo({
                    duration: 0,
                    scrollTop: scrollTop + rect.top - that.parent.data.stickyOffsetTop
                });
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
