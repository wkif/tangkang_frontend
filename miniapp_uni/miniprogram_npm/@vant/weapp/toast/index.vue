<template>
    <view>
        <van-overlay v-if="mask || forbidClick" :show="show" :z-index="zIndex" :custom-style="mask ? '' : 'background-color: transparent;'" />
        <van-transition :show="show" :custom-style="'z-index: ' + zIndex" custom-class="van-toast__container">
            <view :class="'van-toast van-toast--' + (type === 'text' || type === 'html' ? 'text' : 'icon') + ' van-toast--' + position" @touchmove.stop.prevent="noop">
                <!-- text only -->
                <text v-if="type === 'text'">{{ message }}</text>

                <!-- html only -->
                <rich-text v-else-if="type === 'html'" :nodes="message"></rich-text>

                <!-- with icon -->
                <block v-else>
                    <van-loading v-if="type === 'loading'" color="white" :type="loadingType" custom-class="van-toast__loading" />
                    <van-icon v-else class="van-toast__icon" :name="type" />
                    <text v-if="message" class="van-toast__text">{{ message }}</text>
                </block>

                <slot />
            </view>
        </van-transition>
    </view>
</template>

<script>
'use strict';
import vanIcon from '../icon/index';
import vanLoading from '../loading/index';
import vanOverlay from '../overlay/index';
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
        vanIcon,
        vanLoading,
        vanOverlay,
        vanTransition
    },
    props: {
        show: Boolean,
        mask: Boolean,
        message: String,
        forbidClick: Boolean,
        zIndex: {
            type: Number,
            default: 1000
        },
        type: {
            type: String,
            default: 'text'
        },
        loadingType: {
            type: String,
            default: 'circular'
        },
        position: {
            type: String,
            default: 'middle'
        }
    },
    methods: {
        // for prevent touchmove
        noop: function () {}
    }
};
</script>
<style>
@import './index.css';
</style>
