<template>
    <view>
        <van-transition name="slide-down" :show="show" custom-class="van-notify__container" :custom-style="computed.rootStyle({ zIndex, top })" @tap.native="onTap">
            <view :class="'van-notify van-notify--' + type" :style="computed.notifyStyle({ background, color })">
                <view v-if="safeAreaInsetTop" :style="'height: ' + statusBarHeight + 'px'" />
                <text>{{ message }}</text>
            </view>
        </van-transition>
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script module="computed" lang="wxs" src="./index.wxs"></script>
<script>
'use strict';
import vanTransition from '../transition/index';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

var color_1 = require('../common/color');

var utils_1 = require('../common/utils');

export default {
    components: {
        vanTransition
    },
    data() {
        return {
            show: false,
            onOpened: null,
            onClose: null,
            onClick: null,
            statusBarHeight: ''
        };
    },
    props: {
        message: String,
        background: String,
        type: {
            type: String,
            default: 'danger'
        },
        color: {
            type: String,
            default: color_1.WHITE
        },
        duration: {
            type: Number,
            default: 3000
        },
        zIndex: {
            type: Number,
            default: 110
        },
        safeAreaInsetTop: {
            type: Boolean,
            default: false
        },
        top: null
    },
    created: function () {
        var statusBarHeight = (0, utils_1.getSystemInfoSync)().statusBarHeight;
        this.setData({
            statusBarHeight: statusBarHeight
        });
    },
    methods: {
        showFun: function () {
            var that = this;
            var _a = this;
            var duration = _a.duration;
            var onOpened = _a.onOpened;
            clearTimeout(this.timer);
            this.setData({
                show: true
            });
            uni.nextTick(onOpened);

            if (duration > 0 && duration !== Infinity) {
                this.timer = setTimeout(function () {
                    that.hide();
                }, duration);
            }
        },
        hide: function () {
            var onClose = this.onClose;
            clearTimeout(this.timer);
            this.setData({
                show: false
            });
            uni.nextTick(onClose);
        },
        onTap: function (event) {
            var onClick = this.onClick;

            if (onClick) {
                onClick(event.detail);
            }
        }
    }
};
</script>
<style>
@import './index.css';
</style>
