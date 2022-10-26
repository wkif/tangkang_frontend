<template>
    <view :class="'custom-class ' + utils.bem('tag', [type, size, { mark, plain, round }])" :style="computed.rootStyle({ plain, color, textColor })">
        <slot />
        <van-icon v-if="closeable" name="cross" custom-class="van-tag__close" @click="onClose" />
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script module="computed" lang="wxs" src="./index.wxs"></script>
<script>
'use strict';
import vanIcon from '../icon/index';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

export default {
    data() {
        return {};
    },
    components: {
        vanIcon
    },
    props: {
        size: String,
        mark: Boolean,
        color: String,
        plain: Boolean,
        round: Boolean,
        textColor: String,
        type: {
            type: String,
            default: 'default'
        },
        closeable: Boolean
    },
    methods: {
        onClose: function () {
            this.$emit('close');
        }
    }
};
</script>
<style>
@import './index.css';
</style>
