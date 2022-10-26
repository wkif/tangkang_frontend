<template>
    <view>
        <van-overlay v-if="overlay" :show="show" :z-index="zIndex" :custom-style="overlayStyle" :duration="duration" @click="onClickOverlay" :lock-scroll="lockScroll" />
        <view
            v-if="inited"
            :class="'custom-class ' + classes + ' ' + utils.bem('popup', [position, { round, safe: safeAreaInsetBottom, safeTop: safeAreaInsetTop }])"
            :style="computed.popupStyle({ zIndex, currentDuration, display, customStyle })"
            @transitionend="onTransitionEnd"
        >
            <slot />
            <van-icon
                v-if="closeable"
                :name="closeIcon"
                :class="'close-icon-class van-popup__close-icon van-popup__close-icon--' + closeIconPosition"
                @tap.native="onClickCloseIcon"
            />
        </view>
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script module="computed" lang="wxs" src="./index.wxs"></script>
<script>
'use strict';
import vanIcon from '../icon/index';
import vanOverlay from '../overlay/index';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

var transition_1 = require('../mixins/transition');

export default {
    data() {
        return {
            show: '',
            duration: '',
            inited: '',
            classes: ''
        };
    },
    components: {
        vanIcon,
        vanOverlay
    },
    classes: ['enter-class', 'enter-active-class', 'enter-to-class', 'leave-class', 'leave-active-class', 'leave-to-class', 'close-icon-class'],
    mixins: [(0, transition_1.transition)(false)],
    props: {
        round: Boolean,
        closeable: Boolean,
        customStyle: String,
        overlayStyle: String,
        transition: {
            type: String
        },
        zIndex: {
            type: Number,
            default: 100
        },
        overlay: {
            type: Boolean,
            default: true
        },
        closeIcon: {
            type: String,
            default: 'cross'
        },
        closeIconPosition: {
            type: String,
            default: 'top-right'
        },
        closeOnClickOverlay: {
            type: Boolean,
            default: true
        },
        position: {
            type: String,
            default: 'center'
        },
        safeAreaInsetBottom: {
            type: Boolean,
            default: true
        },
        safeAreaInsetTop: {
            type: Boolean,
            default: false
        },
        lockScroll: {
            type: Boolean,
            default: true
        }
    },
    created: function () {
        this.observeClass();
    },
    methods: {
        onClickCloseIcon: function () {
            this.$emit('close');
        },

        onClickOverlay: function () {
            this.$emit('click-overlay');

            if (this.closeOnClickOverlay) {
                this.$emit('close');
            }
        },

        observeClass: function () {
            var _a = this;
            var transition = _a.transition;
            var position = _a.position;
            var duration = _a.duration;
            var updateData = {
                name: transition || position
            };

            if (transition === 'none') {
                updateData.duration = 0;
                this.originDuration = duration;
            } else if (this.originDuration != null) {
                updateData.duration = this.originDuration;
            }

            this.setData(updateData);
        },

        onTransitionEnd() {
            console.log('占位：函数 onTransitionEnd 未声明');
        }
    },
    watch: {
        transition: {
            handler: function () {
                var _a = this;
                var transition = _a.transition;
                var position = _a.position;
                var duration = _a.duration;
                var updateData = {
                    name: transition || position
                };

                if (transition === 'none') {
                    updateData.duration = 0;
                    this.originDuration = duration;
                } else if (this.originDuration != null) {
                    updateData.duration = this.originDuration;
                }

                this.setData(updateData);
            },

            immediate: true
        },

        position: {
            handler: function () {
                var _a = this;
                var transition = _a.transition;
                var position = _a.position;
                var duration = _a.duration;
                var updateData = {
                    name: transition || position
                };

                if (transition === 'none') {
                    updateData.duration = 0;
                    this.originDuration = duration;
                } else if (this.originDuration != null) {
                    updateData.duration = this.originDuration;
                }

                this.setData(updateData);
            },

            immediate: true
        }
    }
};
</script>
<style>
@import './index.css';
</style>
