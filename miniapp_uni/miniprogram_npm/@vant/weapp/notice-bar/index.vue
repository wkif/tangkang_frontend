<template>
    <view
        v-if="show"
        :class="'custom-class ' + utils.bem('notice-bar', { withicon: mode, wrapable })"
        :style="computed.rootStyle({ color, backgroundColor, background })"
        @tap="onClick"
    >
        <van-icon v-if="leftIcon" :name="leftIcon" class="van-notice-bar__left-icon" />
        <slot v-else name="left-icon" />

        <view class="van-notice-bar__wrap">
            <view :class="'van-notice-bar__content ' + (scrollable === false && !wrapable ? 'van-ellipsis' : '')" :animation="animationData">
                {{ text }}
                <slot v-if="!text"></slot>
            </view>
        </view>

        <van-icon v-if="mode === 'closeable'" class="van-notice-bar__right-icon" name="cross" @tap.native.stop.prevent="onClickIcon" />
        <navigator v-else-if="mode === 'link'" :url="url" :open-type="openType">
            <van-icon class="van-notice-bar__right-icon" name="arrow" />
        </navigator>
        <slot v-else name="right-icon" />
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
            show: true,
            animationData: ''
        };
    },
    props: {
        text: {
            type: String,
            default: ''
        },
        mode: {
            type: String,
            default: ''
        },
        url: {
            type: String,
            default: ''
        },
        openType: {
            type: String,
            default: 'navigate'
        },
        delay: {
            type: Number,
            default: 1
        },
        speed: {
            type: Number,
            default: 60
        },
        scrollable: null,
        leftIcon: {
            type: String,
            default: ''
        },
        color: String,
        backgroundColor: String,
        background: String,
        wrapable: Boolean
    },
    created: function () {
        this.resetAnimation = uni.createAnimation({
            duration: 0,
            timingFunction: 'linear'
        });
    },
    destroyed: function () {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    },
    mounted: function () {
        this.init();
    },
    methods: {
        init: function () {
            var that = this;
            (0, utils_1.requestAnimationFrame)(function () {
                Promise.all([(0, utils_1.getRect)(that, '.van-notice-bar__content'), (0, utils_1.getRect)(that, '.van-notice-bar__wrap')]).then(function (rects) {
                    var contentRect = rects[0];
                    var wrapRect = rects[1];
                    var _a = that;
                    var speed = _a.speed;
                    var scrollable = _a.scrollable;
                    var delay = _a.delay;
                    if (contentRect == null || wrapRect == null || !contentRect.width || !wrapRect.width || scrollable === false) {
                        return;
                    }

                    if (scrollable || wrapRect.width < contentRect.width) {
                        var duration = ((wrapRect.width + contentRect.width) / speed) * 1000;
                        that.wrapWidth = wrapRect.width;
                        that.contentWidth = contentRect.width;
                        that.duration = duration;
                        that.animation = uni.createAnimation({
                            duration: duration,
                            timingFunction: 'linear',
                            delay: delay
                        });
                        that.scroll(true);
                    }
                });
            });
        },
        scroll: function (isInit) {
            var that = this;

            if (isInit === void 0) {
                isInit = false;
            }

            if (this.timer) {
                clearTimeout(this.timer);
            }

            this.timer = null;
            this.setData({
                animationData: this.resetAnimation
                    .translateX(isInit ? 0 : this.wrapWidth)
                    .step()
                    .export()
            });
            (0, utils_1.requestAnimationFrame)(function () {
                that.setData({
                    animationData: that.animation.translateX(-that.contentWidth).step().export()
                });
            });
            this.timer = setTimeout(function () {
                that.scroll();
            }, this.duration);
        },
        onClickIcon: function (event) {
            if (this.mode === 'closeable') {
                if (this.timer) {
                    clearTimeout(this.timer);
                }

                this.timer = null;
                this.setData({
                    show: false
                });
                this.$emit('close', event.detail);
            }
        },
        onClick: function (event) {
            this.$emit('click', event);
        }
    },
    watch: {
        text: {
            handler: function () {
                var that = this;
                (0, utils_1.requestAnimationFrame)(function () {
                    Promise.all([(0, utils_1.getRect)(that, '.van-notice-bar__content'), (0, utils_1.getRect)(that, '.van-notice-bar__wrap')]).then(function (rects) {
                        var contentRect = rects[0];
                        var wrapRect = rects[1];
                        var _a = that;
                        var speed = _a.speed;
                        var scrollable = _a.scrollable;
                        var delay = _a.delay;
                        if (contentRect == null || wrapRect == null || !contentRect.width || !wrapRect.width || scrollable === false) {
                            return;
                        }

                        if (scrollable || wrapRect.width < contentRect.width) {
                            var duration = ((wrapRect.width + contentRect.width) / speed) * 1000;
                            that.wrapWidth = wrapRect.width;
                            that.contentWidth = contentRect.width;
                            that.duration = duration;
                            that.animation = uni.createAnimation({
                                duration: duration,
                                timingFunction: 'linear',
                                delay: delay
                            });
                            that.scroll(true);
                        }
                    });
                });
            },

            immediate: true
        },

        speed: {
            handler: function () {
                var that = this;
                (0, utils_1.requestAnimationFrame)(function () {
                    Promise.all([(0, utils_1.getRect)(that, '.van-notice-bar__content'), (0, utils_1.getRect)(that, '.van-notice-bar__wrap')]).then(function (rects) {
                        var contentRect = rects[0];
                        var wrapRect = rects[1];
                        var _a = that;
                        var speed = _a.speed;
                        var scrollable = _a.scrollable;
                        var delay = _a.delay;
                        if (contentRect == null || wrapRect == null || !contentRect.width || !wrapRect.width || scrollable === false) {
                            return;
                        }

                        if (scrollable || wrapRect.width < contentRect.width) {
                            var duration = ((wrapRect.width + contentRect.width) / speed) * 1000;
                            that.wrapWidth = wrapRect.width;
                            that.contentWidth = contentRect.width;
                            that.duration = duration;
                            that.animation = uni.createAnimation({
                                duration: duration,
                                timingFunction: 'linear',
                                delay: delay
                            });
                            that.scroll(true);
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
