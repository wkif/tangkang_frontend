<template>
    <view
        class="van-swipe-cell custom-class"
        data-key="cell"
        @tap.stop.prevent="onClick"
        @touchstart="startDrag"
        @touchmove.stop.prevent="parseEventDynamicCode($event, catchMove ? 'noop' : '')"
        @touchmove.capture="onDrag"
        @touchend="endDrag"
        @touchcancel="endDrag"
    >
        <view :style="wrapperStyle">
            <view v-if="leftWidth" class="van-swipe-cell__left" data-key="left" @tap.stop.prevent="onClick">
                <slot name="left" />
            </view>
            <slot />
            <view v-if="rightWidth" class="van-swipe-cell__right" data-key="right" @tap.stop.prevent="onClick">
                <slot name="right" />
            </view>
        </view>
    </view>
</template>

<script>
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

var touch_1 = require('../mixins/touch');

var utils_1 = require('../common/utils');

var THRESHOLD = 0.3;
var ARRAY = [];
export default {
    data() {
        return {
            catchMove: false,
            wrapperStyle: ''
        };
    },
    props: {
        disabled: Boolean,
        leftWidth: {
            type: Number,
            default: 0
        },
        rightWidth: {
            type: Number,
            default: 0
        },
        asyncClose: Boolean,
        name: {
            type: null,
            default: ''
        }
    },
    mixins: [touch_1.touch],
    created: function () {
        this.offset = 0;
        ARRAY.push(this);
    },
    destroyed: function () {
        var that = this;
        ARRAY = ARRAY.filter(function (item) {
            return item !== that;
        });
    },
    methods: {
        open: function (position) {
            var _a = this;
            var leftWidth = _a.leftWidth;
            var rightWidth = _a.rightWidth;
            var offset = position === 'left' ? leftWidth : -rightWidth;
            this.swipeMove(offset);
            this.$emit('open', {
                position: position,
                name: this.name
            });
        },
        close: function () {
            this.swipeMove(0);
        },
        swipeMove: function (offset) {
            if (offset === void 0) {
                offset = 0;
            }

            this.offset = (0, utils_1.range)(offset, -this.rightWidth, this.leftWidth);
            var transform = 'translate3d('.concat(this.offset, 'px, 0, 0)');
            var transition = this.dragging ? 'none' : 'transform .6s cubic-bezier(0.18, 0.89, 0.32, 1)';
            this.setData({
                wrapperStyle: '\n        -webkit-transform: '
                    .concat(transform, ';\n        -webkit-transition: ')
                    .concat(transition, ';\n        transform: ')
                    .concat(transform, ';\n        transition: ')
                    .concat(transition, ';\n      ')
            });
        },
        swipeLeaveTransition: function () {
            var _a = this;
            var leftWidth = _a.leftWidth;
            var rightWidth = _a.rightWidth;
            var offset = this.offset;

            if (rightWidth > 0 && -offset > rightWidth * THRESHOLD) {
                this.open('right');
            } else if (leftWidth > 0 && offset > leftWidth * THRESHOLD) {
                this.open('left');
            } else {
                this.swipeMove(0);
            }

            this.setData({
                catchMove: false
            });
        },
        startDrag: function (event) {
            if (this.disabled) {
                return;
            }

            this.startOffset = this.offset;
            this.touchStart(event);
        },
        noop: function () {},
        onDrag: function (event) {
            var that = this;

            if (this.disabled) {
                return;
            }

            this.touchMove(event);

            if (this.direction !== 'horizontal') {
                return;
            }

            this.dragging = true;
            ARRAY.filter(function (item) {
                return item !== that && item.offset !== 0;
            }).forEach(function (item) {
                return item.close();
            });
            this.setData({
                catchMove: true
            });
            this.swipeMove(this.startOffset + this.deltaX);
        },
        endDrag: function () {
            if (this.disabled) {
                return;
            }

            this.dragging = false;
            this.swipeLeaveTransition();
        },
        onClick: function (event) {
            var _a = event.currentTarget.dataset.key;
            var position = _a === void 0 ? 'outside' : _a;
            this.$emit('click', position);

            if (!this.offset) {
                return;
            }

            if (this.asyncClose) {
                this.$emit('close', {
                    position: position,
                    instance: this,
                    name: this.name
                });
            } else {
                this.swipeMove(0);
            }
        }
    },
    watch: {
        leftWidth: {
            handler: function (leftWidth) {
                if (leftWidth === void 0) {
                    leftWidth = 0;
                }

                if (this.offset > 0) {
                    this.swipeMove(leftWidth);
                }
            },

            immediate: true
        },

        rightWidth: {
            handler: function (rightWidth) {
                if (rightWidth === void 0) {
                    rightWidth = 0;
                }

                if (this.offset < 0) {
                    this.swipeMove(-rightWidth);
                }
            },

            immediate: true
        }
    }
};
</script>
<style>
@import './index.css';
</style>
