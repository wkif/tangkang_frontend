<template>
    <view class="custom-class van-empty">
        <view class="van-empty__image">
            <slot name="image"></slot>
        </view>
        <view class="van-empty__image">
            <image v-if="image" class="van-empty__image__img" :src="computed.imageUrl(image)" />
        </view>

        <view class="van-empty__description">
            <slot name="description"></slot>
        </view>
        <view class="van-empty__description">
            {{ description }}
        </view>

        <view class="van-empty__bottom">
            <slot></slot>
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
        return {};
    },
    props: {
        description: String,
        image: {
            type: String,
            default: 'default'
        }
    }
};
</script>
<style>
@import './index.css';
</style>
