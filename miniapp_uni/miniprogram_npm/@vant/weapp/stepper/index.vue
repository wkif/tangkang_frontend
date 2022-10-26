<template>
    <view :class="utils.bem('stepper', [theme]) + ' custom-class'">
        <view
            v-if="showMinus"
            data-type="minus"
            :style="computed.buttonStyle({ buttonSize })"
            :class="'minus-class ' + utils.bem('stepper__minus', { disabled: disabled || disableMinus || currentValue <= min })"
            hover-class="van-stepper__minus--hover"
            hover-stay-time="70"
            @tap="onTap"
            @touchstart="onTouchStart"
            @touchend="onTouchEnd"
        >
            <slot name="minus" />
        </view>
        <input
            :always-embed="alwaysEmbed"
            :type="integer ? 'number' : 'digit'"
            :class="'input-class ' + utils.bem('stepper__input', { disabled: disabled || disableInput })"
            :style="computed.inputStyle({ buttonSize, inputWidth })"
            :value="currentValue"
            :focus="focus"
            :disabled="disabled || disableInput"
            @input="onInput"
            @focus="onFocus"
            @blur="onBlur"
        />
        <view
            v-if="showPlus"
            data-type="plus"
            :style="computed.buttonStyle({ buttonSize })"
            :class="'plus-class ' + utils.bem('stepper__plus', { disabled: disabled || disablePlus || currentValue >= max })"
            hover-class="van-stepper__plus--hover"
            hover-stay-time="70"
            @tap="onTap"
            @touchstart="onTouchStart"
            @touchend="onTouchEnd"
        >
            <slot name="plus" />
        </view>
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script module="computed" lang="wxs" src="./index.wxs"></script>
<script>
'use strict';

var __assign =
    (this && this.__assign) ||
    function () {
        __assign =
            Object.assign ||
            function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];

                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) {
                            t[p] = s[p];
                        }
                    }
                }

                return t;
            };

        return __assign.apply(this, arguments);
    };

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

var validator_1 = require('../common/validator');

var LONG_PRESS_START_TIME = 600;
var LONG_PRESS_INTERVAL = 200; // add num and avoid float number

function add(num1, num2) {
    var cardinal = Math.pow(10, 10);
    return Math.round((num1 + num2) * cardinal) / cardinal;
}

function equal(value1, value2) {
    return String(value1) === String(value2);
}

export default {
    data() {
        return {
            currentValue: '',
            focus: ''
        };
    },
    field: true,
    classes: ['input-class', 'plus-class', 'minus-class'],
    props: {
        value: {
            type: null
        },
        integer: {
            type: Boolean
        },
        disabled: Boolean,
        inputWidth: String,
        buttonSize: String,
        asyncChange: Boolean,
        disableInput: Boolean,
        decimalLength: {
            type: Number,
            default: null
        },
        min: {
            type: null,
            default: 1
        },
        max: {
            type: null,
            default: Number.MAX_SAFE_INTEGER
        },
        step: {
            type: null,
            default: 1
        },
        showPlus: {
            type: Boolean,
            default: true
        },
        showMinus: {
            type: Boolean,
            default: true
        },
        disablePlus: Boolean,
        disableMinus: Boolean,
        longPress: {
            type: Boolean,
            default: true
        },
        theme: String,
        alwaysEmbed: Boolean
    },
    created: function () {
        this.setData({
            currentValue: this.format(this.value)
        });
    },
    methods: {
        observeValue: function () {
            var _a = this;
            var value = _a.value;
            var currentValue = _a.currentValue;
            if (!equal(value, currentValue)) {
                this.setData({
                    currentValue: this.format(value)
                });
            }
        },
        check: function () {
            var val = this.format(this.currentValue);

            if (!equal(val, this.currentValue)) {
                this.setData({
                    currentValue: val
                });
            }
        },
        isDisabled: function (type) {
            var _a = this;
            var disabled = _a.disabled;
            var disablePlus = _a.disablePlus;
            var disableMinus = _a.disableMinus;
            var currentValue = _a.currentValue;
            var max = _a.max;
            var min = _a.min;
            if (type === 'plus') {
                return disabled || disablePlus || currentValue >= max;
            }

            return disabled || disableMinus || currentValue <= min;
        },
        onFocus: function (event) {
            this.$emit('focus', event.detail);
        },
        onBlur: function (event) {
            var value = this.format(event.detail.value);
            this.emitChange(value);
            this.$emit(
                'blur',
                __assign(__assign({}, event.detail), {
                    value: value
                })
            );
        },
        // filter illegal characters
        filter: function (value) {
            value = String(value).replace(/[^0-9.-]/g, '');

            if (this.integer && value.indexOf('.') !== -1) {
                value = value.split('.')[0];
            }

            return value;
        },
        // limit value range
        format: function (value) {
            value = this.filter(value); // format range

            if (value === '') {
                value = 0;
            } else {
                value = +value;
            }

            value = Math.max(Math.min(this.max, value), this.min); // format decimal

            if ((0, validator_1.isDef)(this.decimalLength)) {
                value = value.toFixed(this.decimalLength);
            }

            return value;
        },
        onInput: function (event) {
            var _a = (event.detail || {}).value;
            var value = _a === void 0 ? '' : _a; // allow input to be empty
            if (value === '') {
                return;
            }

            var formatted = this.filter(value); // limit max decimal length

            if ((0, validator_1.isDef)(this.decimalLength) && formatted.indexOf('.') !== -1) {
                var pair = formatted.split('.');
                formatted = ''.concat(pair[0], '.').concat(pair[1].slice(0, this.decimalLength));
            }

            this.emitChange(formatted);
        },
        emitChange: function (value) {
            if (!this.asyncChange) {
                this.setData({
                    currentValue: value
                });
            }

            this.$emit('change', value);
        },
        onChange: function () {
            var type = this.type;

            if (this.isDisabled(type)) {
                this.$emit('overlimit', type);
                return;
            }

            var diff = type === 'minus' ? -this.step : +this.step;
            var value = this.format(add(+this.currentValue, diff));
            this.emitChange(value);
            this.$emit(type);
        },
        longPressStep: function () {
            var that = this;
            this.longPressTimer = setTimeout(function () {
                that.onChange();
                that.longPressStep();
            }, LONG_PRESS_INTERVAL);
        },
        onTap: function (event) {
            var type = event.currentTarget.dataset.type;
            this.type = type;
            this.onChange();
        },
        onTouchStart: function (event) {
            var that = this;

            if (!this.longPress) {
                return;
            }

            clearTimeout(this.longPressTimer);
            var type = event.currentTarget.dataset.type;
            this.type = type;
            this.isLongPress = false;
            this.longPressTimer = setTimeout(function () {
                that.isLongPress = true;
                that.onChange();
                that.longPressStep();
            }, LONG_PRESS_START_TIME);
        },
        onTouchEnd: function () {
            if (!this.longPress) {
                return;
            }

            clearTimeout(this.longPressTimer);
        }
    },
    watch: {
        value: {
            handler: function () {
                var _a = this;
                var value = _a.value;
                var currentValue = _a.currentValue;
                if (!equal(value, currentValue)) {
                    this.setData({
                        currentValue: this.format(value)
                    });
                }
            },

            immediate: true
        },

        integer: {
            handler: function () {
                var val = this.format(this.currentValue);

                if (!equal(val, this.currentValue)) {
                    this.setData({
                        currentValue: val
                    });
                }
            },

            immediate: true
        },

        decimalLength: {
            handler: function () {
                var val = this.format(this.currentValue);

                if (!equal(val, this.currentValue)) {
                    this.setData({
                        currentValue: val
                    });
                }
            },

            immediate: true
        },

        min: {
            handler: function () {
                var val = this.format(this.currentValue);

                if (!equal(val, this.currentValue)) {
                    this.setData({
                        currentValue: val
                    });
                }
            },

            immediate: true
        },

        max: {
            handler: function () {
                var val = this.format(this.currentValue);

                if (!equal(val, this.currentValue)) {
                    this.setData({
                        currentValue: val
                    });
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
