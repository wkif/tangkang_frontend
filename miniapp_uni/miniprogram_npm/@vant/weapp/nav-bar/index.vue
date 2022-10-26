<template>
    <view>
        <view v-if="fixed && placeholder" :style="'height: ' + height + 'px;'" />

        <view
            :class="utils.bem('nav-bar', { fixed }) + ' custom-class ' + (border ? 'van-hairline--bottom' : '')"
            :style="computed.barStyle({ zIndex, statusBarHeight, safeAreaInsetTop }) + '; ' + customStyle"
        >
            <view class="van-nav-bar__content">
                <view class="van-nav-bar__left" @tap="onClickLeft">
                    <block v-if="leftArrow || leftText">
                        <van-icon v-if="leftArrow" size="16px" name="arrow-left" custom-class="van-nav-bar__arrow" />
                        <view v-if="leftText" class="van-nav-bar__text" hover-class="van-nav-bar__text--hover" hover-stay-time="70">{{ leftText }}</view>
                    </block>
                    <slot v-else name="left" />
                </view>
                <view class="van-nav-bar__title title-class van-ellipsis">
                    <block v-if="title">{{ title }}</block>
                    <slot v-else name="title" />
                </view>
                <view class="van-nav-bar__right" @tap="onClickRight">
                    <view v-if="rightText" class="van-nav-bar__text" hover-class="van-nav-bar__text--hover" hover-stay-time="70">{{ rightText }}</view>
                    <slot v-else name="right" />
                </view>
            </view>
        </view>
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

var utils_1 = require('../common/utils');

export default {
    components: {
        vanIcon
    },
    data() {
        return {
            height: 46,
            statusBarHeight: ''
        };
    },
    classes: ['title-class'],
    props: {
        title: String,
        fixed: {
            type: Boolean
        },
        placeholder: {
            type: Boolean
        },
        leftText: String,
        rightText: String,
        customStyle: String,
        leftArrow: Boolean,
        border: {
            type: Boolean,
            default: true
        },
        zIndex: {
            type: Number,
            default: 1
        },
        safeAreaInsetTop: {
            type: Boolean,
            default: true
        }
    },
    created: function () {
        var statusBarHeight = (0, utils_1.getSystemInfoSync)().statusBarHeight;
        this.setData({
            statusBarHeight: statusBarHeight,
            height: 46 + statusBarHeight
        });
    },
    mounted: function () {
        this.setHeight();
    },
    methods: {
        onClickLeft: function () {
            this.$emit('click-left');
        },
        onClickRight: function () {
            this.$emit('click-right');
        },
        setHeight: function () {
            var that = this;

            if (!this.fixed || !this.placeholder) {
                return;
            }

            uni.nextTick(function () {
                (0, utils_1.getRect)(that, '.van-nav-bar').then(function (res) {
                    if (res && 'height' in res) {
                        that.setData({
                            height: res.height
                        });
                    }
                });
            });
        }
    },
    watch: {
        fixed: {
            handler: function () {
                var that = this;

                if (!this.fixed || !this.placeholder) {
                    return;
                }

                uni.nextTick(function () {
                    (0, utils_1.getRect)(that, '.van-nav-bar').then(function (res) {
                        if (res && 'height' in res) {
                            that.setData({
                                height: res.height
                            });
                        }
                    });
                });
            },

            immediate: true
        },

        placeholder: {
            handler: function () {
                var that = this;

                if (!this.fixed || !this.placeholder) {
                    return;
                }

                uni.nextTick(function () {
                    (0, utils_1.getRect)(that, '.van-nav-bar').then(function (res) {
                        if (res && 'height' in res) {
                            that.setData({
                                height: res.height
                            });
                        }
                    });
                });
            },

            immediate: true
        }
    }
};
</script>
<style>
@import './index.css';
</style>
