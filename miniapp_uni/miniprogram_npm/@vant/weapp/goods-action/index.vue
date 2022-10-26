<template>
    <view :class="'custom-class ' + utils.bem('goods-action', { safe: safeAreaInsetBottom })">
        <slot />
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script>
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

var relation_1 = require('../common/relation');

export default {
    data() {
        return {};
    },
    relation: (0, relation_1.useChildren)('goods-action-button', function () {
        this.children.forEach(function (item) {
            item.updateStyle();
        });
    }),
    props: {
        safeAreaInsetBottom: {
            type: Boolean,
            default: true
        }
    }
};
</script>
<style>
@import './index.css';
</style>
