<template>
    <view :class="'custom-class ' + utils.bem('slider', { disabled, vertical })" :style="wrapperStyle" @tap="onClick">
        <view :class="utils.bem('slider__bar')" :style="barStyle + '; ' + style({ backgroundColor: activeColor })">
            <view
                v-if="range"
                :class="utils.bem('slider__button-wrapper-left')"
                :data-index="0"
                @touchstart="onTouchStart"
                @touchmove.stop.prevent="onTouchMove"
                @touchend="onTouchEnd"
                @touchcancel="onTouchEnd"
            >
                <slot v-if="useButtonSlot" name="left-button" />
                <view v-else :class="utils.bem('slider__button')" />
            </view>
            <view
                v-if="range"
                :class="utils.bem('slider__button-wrapper-right')"
                :data-index="1"
                @touchstart="onTouchStart"
                @touchmove.stop.prevent="onTouchMove"
                @touchend="onTouchEnd"
                @touchcancel="onTouchEnd"
            >
                <slot v-if="useButtonSlot" name="right-button" />
                <view v-else :class="utils.bem('slider__button')" />
            </view>

            <view
                v-if="!range"
                :class="utils.bem('slider__button-wrapper')"
                @touchstart="onTouchStart"
                @touchmove.stop.prevent="onTouchMove"
                @touchend="onTouchEnd"
                @touchcancel="onTouchEnd"
            >
                <slot v-if="useButtonSlot" name="button" />
                <view v-else :class="utils.bem('slider__button')" />
            </view>
        </view>
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script module="style" lang="wxs" src="../wxs/style.wxs"></script>
<script>
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

var touch_1 = require('../mixins/touch');

var version_1 = require('../common/version');

var utils_1 = require('../common/utils');

export default {
    data() {
        return {
            wrapperStyle: '',
            barStyle: '',
            valueClone: ''
        };
    },
    mixins: [touch_1.touch],
    props: {
        range: Boolean,
        disabled: Boolean,
        useButtonSlot: Boolean,
        activeColor: String,
        inactiveColor: String,
        max: {
            type: Number,
            default: 100
        },
        min: {
            type: Number,
            default: 0
        },
        step: {
            type: Number,
            default: 1
        },
        value: {
            type: null,
            default: 0
        },
        vertical: Boolean,
        barHeight: null
    },
    created: function () {
        this.updateValue(this.value);
    },
    methods: {
        onTouchStart: function (event) {
            var that = this;

            if (this.disabled) {
                return;
            }

            var index = event.currentTarget.dataset.index;

            if (typeof index === 'number') {
                this.buttonIndex = index;
            }

            this.touchStart(event);
            this.startValue = this.format(this.valueClone);
            this.newValue = this.valueClone;

            if (this.isRange(this.newValue)) {
                this.startValue = this.newValue.map(function (val) {
                    return that.format(val);
                });
            } else {
                this.startValue = this.format(this.newValue);
            }

            this.dragStatus = 'start';
        },
        onTouchMove: function (event) {
            var that = this;

            if (this.disabled) {
                return;
            }

            if (this.dragStatus === 'start') {
                this.$emit('drag-start');
            }

            this.touchMove(event);
            this.dragStatus = 'draging';
            (0, utils_1.getRect)(this, '.van-slider').then(function (rect) {
                var vertical = that.vertical;
                var delta = vertical ? that.deltaY : that.deltaX;
                var total = vertical ? rect.height : rect.width;
                var diff = (delta / total) * that.getRange();

                if (that.isRange(that.startValue)) {
                    that.newValue[that.buttonIndex] = that.startValue[that.buttonIndex] + diff;
                } else {
                    that.newValue = that.startValue + diff;
                }

                that.updateValue(that.newValue, false, true);
            });
        },
        onTouchEnd: function () {
            if (this.disabled) {
                return;
            }

            if (this.dragStatus === 'draging') {
                this.updateValue(this.newValue, true);
                this.$emit('drag-end');
            }
        },
        onClick: function (event) {
            var that = this;

            if (this.disabled) {
                return;
            }

            var min = this.min;
            (0, utils_1.getRect)(this, '.van-slider').then(function (rect) {
                var vertical = that.vertical;
                var touch = event.touches[0];
                var delta = vertical ? touch.clientY - rect.top : touch.clientX - rect.left;
                var total = vertical ? rect.height : rect.width;
                var value = Number(min) + (delta / total) * that.getRange();

                if (that.isRange(that.valueClone)) {
                    var _a = that.deepClone(value);
                    var left = _a[0];
                    var right = _a[1];
                    var middle = (left + right) / 2;

                    if (value <= middle) {
                        that.updateValue([value, right], true);
                    } else {
                        that.updateValue([left, value], true);
                    }
                } else {
                    that.updateValue(value, true);
                }
            });
        },
        isRange: function (val) {
            var range = this.range;
            return range && Array.isArray(val);
        },
        handleOverlap: function (value) {
            if (value[0] > value[1]) {
                return value.slice(0).reverse();
            }

            return value;
        },
        updateValue: function (value, end, drag) {
            var that = this;

            if (this.isRange(value)) {
                value = this.handleOverlap(value).map(function (val) {
                    return that.format(val);
                });
            } else {
                value = this.format(value);
            }

            this.valueClone = value;
            var vertical = this.vertical;
            var mainAxis = vertical ? 'height' : 'width';
            this.setData({
                wrapperStyle: '\n          background: '
                    .concat(this.inactiveColor || '', ';\n          ')
                    .concat(vertical ? 'width' : 'height', ': ')
                    .concat((0, utils_1.addUnit)(this.barHeight) || '', ';\n        '),
                barStyle: '\n          '
                    .concat(mainAxis, ': ')
                    .concat(this.calcMainAxis(), ';\n          left: ')
                    .concat(vertical ? 0 : this.calcOffset(), ';\n          top: ')
                    .concat(vertical ? this.calcOffset() : 0, ';\n          ')
                    .concat(drag ? 'transition: none;' : '', '\n        ')
            });

            if (drag) {
                this.$emit('drag', {
                    value: value
                });
            }

            if (end) {
                this.$emit('change', value);
            }

            if ((drag || end) && (0, version_1.canIUseModel)()) {
                this.setData({
                    valueClone: value
                });
            }
        },
        getScope: function () {
            return Number(this.max) - Number(this.min);
        },
        getRange: function () {
            var _a = this;
            var max = _a.max;
            var min = _a.min;
            return max - min;
        },
        // 计算选中条的长度百分比
        calcMainAxis: function () {
            var value = this.deepClone(newVal);
            var min = this.min;
            var scope = this.getScope();

            if (this.isRange(value)) {
                return ''.concat(((value[1] - value[0]) * 100) / scope, '%');
            }

            return ''.concat(((value - Number(min)) * 100) / scope, '%');
        },
        // 计算选中条的开始位置的偏移量
        calcOffset: function () {
            var value = this.deepClone(newVal);
            var min = this.min;
            var scope = this.getScope();

            if (this.isRange(value)) {
                return ''.concat(((value[0] - Number(min)) * 100) / scope, '%');
            }

            return '0%';
        },
        format: function (value) {
            var _a = this;
            var max = _a.max;
            var min = _a.min;
            var step = _a.step;
            return Math.round(Math.max(min, Math.min(value, max)) / step) * step;
        }
    },
    watch: {
        value: {
            handler: function (val) {
                this.valueClone = this.deepClone(this.value);
                if (val !== this.valueClone) {
                    this.updateValue(val);
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
