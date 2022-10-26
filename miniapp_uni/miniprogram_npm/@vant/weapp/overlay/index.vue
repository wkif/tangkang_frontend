<template>
    <view>
        <van-transition
            v-if="lockScroll"
            :show="show"
            custom-class="van-overlay"
            :custom-style="'z-index: ' + zIndex + '; ' + customStyle"
            :duration="duration"
            @tap.native="onClick"
            @touchmove.native.stop.prevent="noop"
        >
            <slot></slot>
        </van-transition>
        <van-transition v-else :show="show" custom-class="van-overlay" :custom-style="'z-index: ' + zIndex + '; ' + customStyle" :duration="duration" @tap.native="onClick">
            <slot></slot>
        </van-transition>
    </view>
</template>

<script>
'use strict';
import vanTransition from '../transition/index';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

export default {
    data() {
        return {};
    },
    components: {
        vanTransition
    },
    props: {
        show: Boolean,
        customStyle: String,
        duration: {
            type: null,
            default: 300
        },
        zIndex: {
            type: Number,
            default: 1
        },
        lockScroll: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        onClick: function () {
            this.$emit('click');
        },
        // for prevent touchmove
        noop: function () {}
    }
};
</script>
<style>
@import './index.css';
</style>
