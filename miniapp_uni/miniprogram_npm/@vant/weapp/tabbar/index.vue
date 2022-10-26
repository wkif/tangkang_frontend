<template>
    <view>
        <view
            :class="(border ? 'van-hairline--top-bottom' : '') + ' ' + utils.bem('tabbar', { fixed, safe: safeAreaInsetBottom }) + ' custom-class'"
            :style="zIndex ? 'z-index: ' + zIndex : ''"
        >
            <slot />
        </view>

        <view v-if="fixed && placeholder" :style="'height: ' + height + 'px;'"></view>
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

var utils_1 = require('../common/utils');

export default {
    data() {
        return {
            height: 50
        };
    },
    relation: (0, relation_1.useChildren)('tabbar-item', function () {
        this.updateChildren();
    }),
    props: {
        active: {
            type: null
        },
        activeColor: {
            type: String
        },
        inactiveColor: {
            type: String
        },
        fixed: {
            type: Boolean,
            default: true
        },
        placeholder: {
            type: Boolean
        },
        border: {
            type: Boolean,
            default: true
        },
        zIndex: {
            type: Number,
            default: 1
        },
        safeAreaInsetBottom: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        updateChildren: function () {
            var children = this.children;

            if (!Array.isArray(children) || !children.length) {
                return;
            }

            children.forEach(function (child) {
                return child.updateFromParent();
            });
        },
        setHeight: function () {
            var that = this;

            if (!this.fixed || !this.placeholder) {
                return;
            }

            uni.nextTick(function () {
                (0, utils_1.getRect)(that, '.van-tabbar').then(function (res) {
                    that.setData({
                        height: res.height
                    });
                });
            });
        }
    },
    watch: {
        active: {
            handler: function () {
                var children = this.children;

                if (!Array.isArray(children) || !children.length) {
                    return;
                }

                children.forEach(function (child) {
                    return child.updateFromParent();
                });
            },

            immediate: true
        },

        activeColor: {
            handler: function () {
                var children = this.children;

                if (!Array.isArray(children) || !children.length) {
                    return;
                }

                children.forEach(function (child) {
                    return child.updateFromParent();
                });
            },

            immediate: true
        },

        inactiveColor: {
            handler: function () {
                var children = this.children;

                if (!Array.isArray(children) || !children.length) {
                    return;
                }

                children.forEach(function (child) {
                    return child.updateFromParent();
                });
            },

            immediate: true
        },

        fixed: {
            handler: function () {
                var that = this;

                if (!this.fixed || !this.placeholder) {
                    return;
                }

                uni.nextTick(function () {
                    (0, utils_1.getRect)(that, '.van-tabbar').then(function (res) {
                        that.setData({
                            height: res.height
                        });
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
                    (0, utils_1.getRect)(that, '.van-tabbar').then(function (res) {
                        that.setData({
                            height: res.height
                        });
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
