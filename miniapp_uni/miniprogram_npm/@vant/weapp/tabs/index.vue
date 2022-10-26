<template>
    <view :class="'custom-class ' + utils.bem('tabs', [type])">
        <van-sticky :disabled="!sticky" :z-index="zIndex" :offset-top="offsetTop" :container="container" @scroll="onTouchScroll">
            <view :class="utils.bem('tabs__wrap', { scrollable }) + ' ' + (type === 'line' && border ? 'van-hairline--top-bottom' : '')">
                <slot name="nav-left" />

                <scroll-view
                    :scroll-x="scrollable"
                    :scroll-with-animation="scrollWithAnimation"
                    :scroll-left="scrollLeft"
                    :class="utils.bem('tabs__scroll', [type])"
                    :style="color ? 'border-color: ' + color : ''"
                >
                    <view :class="utils.bem('tabs__nav', [type, { complete: !ellipsis }]) + ' nav-class'" :style="computed.navStyle(color, type)">
                        <view
                            v-if="type === 'line'"
                            class="van-tabs__line"
                            :style="computed.lineStyle({ color, lineOffsetLeft, lineHeight, skipTransition, duration, lineWidth })"
                        />
                        <view
                            :data-index="index"
                            :class="
                                computed.tabClass(index === currentIndex, ellipsis) +
                                ' ' +
                                utils.bem('tab', { active: index === currentIndex, disabled: item.disabled, complete: !ellipsis })
                            "
                            :style="
                                computed.tabStyle({
                                    active: index === currentIndex,
                                    ellipsis,
                                    color,
                                    type,
                                    disabled: item.disabled,
                                    titleActiveColor,
                                    titleInactiveColor,
                                    swipeThreshold,
                                    scrollable
                                })
                            "
                            @tap="onTap"
                            v-for="(item, index) in tabs"
                            :key="index"
                        >
                            <view :class="ellipsis ? 'van-ellipsis' : ''" :style="item.titleStyle">
                                {{ item.title }}
                                <van-info v-if="item.info !== null || item.dot" :info="item.info" :dot="item.dot" custom-class="van-tab__title__info" />
                            </view>
                        </view>
                    </view>
                </scroll-view>

                <slot name="nav-right" />
            </view>
        </van-sticky>

        <view class="van-tabs__content" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" @touchcancel="onTouchEnd">
            <view :class="utils.bem('tabs__track', [{ animated }]) + ' van-tabs__track'" :style="computed.trackStyle({ duration, currentIndex, animated })">
                <slot />
            </view>
        </view>
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script module="computed" lang="wxs" src="./index.wxs"></script>
<script>
'use strict';
import vanInfo from '../info/index';
import vanSticky from '../sticky/index';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

var touch_1 = require('../mixins/touch');

var utils_1 = require('../common/utils');

var validator_1 = require('../common/validator');

var relation_1 = require('../common/relation');

export default {
    components: {
        vanInfo,
        vanSticky
    },
    data() {
        return {
            tabs: [],
            scrollLeft: 0,
            scrollable: false,
            currentIndex: 0,
            container: null,
            skipTransition: true,
            scrollWithAnimation: false,
            lineOffsetLeft: 0
        };
    },
    mixins: [touch_1.touch],
    classes: ['nav-class', 'tab-class', 'tab-active-class', 'line-class'],
    relation: (0, relation_1.useChildren)('tab', function () {
        this.updateTabs();
    }),
    props: {
        sticky: Boolean,
        border: Boolean,
        swipeable: Boolean,
        titleActiveColor: String,
        titleInactiveColor: String,
        color: String,
        animated: {
            type: Boolean
        },
        lineWidth: {
            type: null,
            default: 40
        },
        lineHeight: {
            type: null,
            default: -1
        },
        active: {
            type: null,
            default: 0
        },
        type: {
            type: String,
            default: 'line'
        },
        ellipsis: {
            type: Boolean,
            default: true
        },
        duration: {
            type: Number,
            default: 0.3
        },
        zIndex: {
            type: Number,
            default: 1
        },
        swipeThreshold: {
            type: Number,
            default: 5
        },
        offsetTop: {
            type: Number,
            default: 0
        },
        lazyRender: {
            type: Boolean,
            default: true
        }
    },
    mounted: function () {
        var that = this;
        (0, utils_1.requestAnimationFrame)(function () {
            that.swiping = true;
            that.setData({
                container: function () {
                    return that.createSelectorQuery().select('.van-tabs');
                }
            });
            that.resize();
            that.scrollIntoView();
        });
    },
    methods: {
        updateTabs: function () {
            var that = this;
            var _b = that.children;
            var children = _b === void 0 ? [] : _b;
            var data = that;
            this.setData({
                tabs: children.map(function (child) {
                    return child.data;
                }),
                scrollable: this.children.length > data.swipeThreshold || !data.ellipsis
            });
            this.setCurrentIndexByName(data.active || this.getCurrentName());
        },
        trigger: function (eventName, child) {
            var currentIndex = this.currentIndex;
            var currentChild = child || this.children[currentIndex];

            if (!(0, validator_1.isDef)(currentChild)) {
                return;
            }

            this.$emit(eventName, {
                index: currentChild.index,
                name: currentChild.getComputedName(),
                title: currentChild.data.title
            });
        },
        onTap: function (event) {
            var that = this;
            var index = event.currentTarget.dataset.index;
            var child = this.children[index];

            if (child.data.disabled) {
                this.trigger('disabled', child);
            } else {
                this.setCurrentIndex(index);
                (0, utils_1.nextTick)(function () {
                    that.trigger('click');
                });
            }
        },
        // correct the index of active tab
        setCurrentIndexByName: function (name) {
            var _a = this.children;
            var children = _a === void 0 ? [] : _a;
            var matched = children.filter(function (child) {
                return child.getComputedName() === name;
            });

            if (matched.length) {
                this.setCurrentIndex(matched[0].index);
            }
        },
        setCurrentIndex: function (currentIndex) {
            var that = this;

            var _a = this;

            var data = _a;
            var _b = _a.children;
            var children = _b === void 0 ? [] : _b;
            if (!(0, validator_1.isDef)(currentIndex) || currentIndex >= children.length || currentIndex < 0) {
                return;
            }

            (0, utils_1.groupSetData)(this, function () {
                children.forEach(function (item, index) {
                    var active = index === currentIndex;

                    if (active !== item.data.active || !item.inited) {
                        item.updateRender(active, that);
                    }
                });
            });

            if (currentIndex === data.currentIndex) {
                return;
            }

            var shouldEmitChange = data.currentIndex !== null;
            this.setData({
                currentIndex: currentIndex
            });
            (0, utils_1.requestAnimationFrame)(function () {
                that.resize();
                that.scrollIntoView();
            });
            (0, utils_1.nextTick)(function () {
                that.trigger('input');

                if (shouldEmitChange) {
                    that.trigger('change');
                }
            });
        },
        getCurrentName: function () {
            var activeTab = this.children[this.currentIndex];

            if (activeTab) {
                return activeTab.getComputedName();
            }
        },
        resize: function () {
            var that = this;

            if (this.type !== 'line') {
                return;
            }

            var _a = this;
            var currentIndex = _a.currentIndex;
            var ellipsis = _a.ellipsis;
            var skipTransition = _a.skipTransition;
            Promise.all([(0, utils_1.getAllRect)(this, '.van-tab'), (0, utils_1.getRect)(this, '.van-tabs__line')]).then(function (_a) {
                var _b = _a[0];
                var rects = _b === void 0 ? [] : _b;
                var lineRect = _a[1];
                var rect = rects[currentIndex];

                if (rect == null) {
                    return;
                }

                var lineOffsetLeft = rects.slice(0, currentIndex).reduce(function (prev, curr) {
                    return prev + curr.width;
                }, 0);
                lineOffsetLeft += (rect.width - lineRect.width) / 2 + (ellipsis ? 0 : 8);
                that.setData({
                    lineOffsetLeft: lineOffsetLeft
                });
                that.swiping = true;

                if (skipTransition) {
                    (0, utils_1.nextTick)(function () {
                        that.setData({
                            skipTransition: false
                        });
                    });
                }
            });
        },
        // scroll active tab into view
        scrollIntoView: function () {
            var that = this;
            var _a = this;
            var currentIndex = _a.currentIndex;
            var scrollable = _a.scrollable;
            var scrollWithAnimation = _a.scrollWithAnimation;
            if (!scrollable) {
                return;
            }

            Promise.all([(0, utils_1.getAllRect)(this, '.van-tab'), (0, utils_1.getRect)(this, '.van-tabs__nav')]).then(function (_a) {
                var tabRects = _a[0];
                var navRect = _a[1];
                var tabRect = tabRects[currentIndex];
                var offsetLeft = tabRects.slice(0, currentIndex).reduce(function (prev, curr) {
                    return prev + curr.width;
                }, 0);
                that.setData({
                    scrollLeft: offsetLeft - (navRect.width - tabRect.width) / 2
                });

                if (!scrollWithAnimation) {
                    (0, utils_1.nextTick)(function () {
                        that.setData({
                            scrollWithAnimation: true
                        });
                    });
                }
            });
        },
        onTouchScroll: function (event) {
            this.$emit('scroll', event.detail);
        },
        onTouchStart: function (event) {
            if (!this.swipeable) {
                return;
            }

            this.swiping = true;
            this.touchStart(event);
        },
        onTouchMove: function (event) {
            if (!this.swipeable || !this.swiping) {
                return;
            }

            this.touchMove(event);
        },
        // watch swipe touch end
        onTouchEnd: function () {
            if (!this.swipeable || !this.swiping) {
                return;
            }

            var that = this;
            var direction = that.direction;
            var deltaX = that.deltaX;
            var offsetX = that.offsetX;
            var minSwipeDistance = 50;

            if (direction === 'horizontal' && offsetX >= minSwipeDistance) {
                var index = this.getAvaiableTab(deltaX);

                if (index !== -1) {
                    this.setCurrentIndex(index);
                }
            }

            this.swiping = false;
        },
        getAvaiableTab: function (direction) {
            var _a = this;
            var tabs = _a.tabs;
            var currentIndex = _a.currentIndex;
            var step = direction > 0 ? -1 : 1;

            for (var i = step; currentIndex + i < tabs.length && currentIndex + i >= 0; i += step) {
                var index = currentIndex + i;

                if (index >= 0 && index < tabs.length && tabs[index] && !tabs[index].disabled) {
                    return index;
                }
            }

            return -1;
        }
    },
    watch: {
        animated: {
            handler: function () {
                var that = this;
                this.children.forEach(function (child, index) {
                    return child.updateRender(index === that.currentIndex, that);
                });
            },

            immediate: true
        },

        lineWidth: {
            handler: function () {
                var that = this;

                if (this.type !== 'line') {
                    return;
                }

                var _a = this;
                var currentIndex = _a.currentIndex;
                var ellipsis = _a.ellipsis;
                var skipTransition = _a.skipTransition;
                Promise.all([(0, utils_1.getAllRect)(this, '.van-tab'), (0, utils_1.getRect)(this, '.van-tabs__line')]).then(function (_a) {
                    var _b = _a[0];
                    var rects = _b === void 0 ? [] : _b;
                    var lineRect = _a[1];
                    var rect = rects[currentIndex];

                    if (rect == null) {
                        return;
                    }

                    var lineOffsetLeft = rects.slice(0, currentIndex).reduce(function (prev, curr) {
                        return prev + curr.width;
                    }, 0);
                    lineOffsetLeft += (rect.width - lineRect.width) / 2 + (ellipsis ? 0 : 8);
                    that.setData({
                        lineOffsetLeft: lineOffsetLeft
                    });
                    that.swiping = true;

                    if (skipTransition) {
                        (0, utils_1.nextTick)(function () {
                            that.setData({
                                skipTransition: false
                            });
                        });
                    }
                });
            },

            immediate: true
        },

        active: {
            handler: function (name) {
                if (name !== this.getCurrentName()) {
                    this.setCurrentIndexByName(name);
                }
            },

            immediate: true
        },

        swipeThreshold: {
            handler: function (value) {
                this.setData({
                    scrollable: this.children.length > value || !this.ellipsis
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
