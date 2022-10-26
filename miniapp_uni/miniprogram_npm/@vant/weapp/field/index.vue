<template>
    <view>
        <van-cell
            :size="size"
            :icon="leftIcon"
            :center="center"
            :border="border"
            :is-link="isLink"
            :required="required"
            :clickable="clickable"
            :title-width="titleWidth"
            title-style="margin-right: 12px;"
            :custom-style="customStyle"
            :arrow-direction="arrowDirection"
            custom-class="van-field"
        >
            <slot name="left-icon" slot="icon" />
            <view v-if="label" :class="'label-class ' + utils.bem('field__label', { disabled })" slot="title">
                {{ label }}
            </view>
            <slot v-else name="label" slot="title" />
            <view :class="utils.bem('field__body', [type])">
                <view :class="utils.bem('field__control', [inputAlign, 'custom'])" @tap="onClickInput">
                    <slot name="input" />
                </view>
                <!-- parse <include v-if="type === 'textarea'" src="./textarea.wxml"/> -->
                <textarea
                    :class="utils.bem('field__control', [inputAlign, type, { disabled, error }]) + ' input-class'"
                    :fixed="fixed"
                    :focus="focus"
                    :cursor="cursor"
                    :value="innerValue"
                    :auto-focus="autoFocus"
                    :disabled="disabled || readonly"
                    :maxlength="maxlength"
                    :placeholder="placeholder"
                    :placeholder-style="placeholderStyle"
                    :placeholder-class="utils.bem('field__placeholder', { error, disabled })"
                    :auto-height="!!autosize"
                    :style="computed.inputStyle(autosize)"
                    :cursor-spacing="cursorSpacing"
                    :adjust-position="adjustPosition"
                    :show-confirm-bar="showConfirmBar"
                    :hold-keyboard="holdKeyboard"
                    :selection-end="selectionEnd"
                    :selection-start="selectionStart"
                    :disable-default-padding="disableDefaultPadding"
                    @input="onInput"
                    @tap="onClickInput"
                    @blur="onBlur"
                    @focus="onFocus"
                    @confirm="onConfirm"
                    @linechange="onLineChange"
                    @keyboardheightchange="onKeyboardHeightChange"
                />

                <!-- parse <include v-else src="./input.wxml"/> -->
                <input
                    :class="utils.bem('field__control', [inputAlign, { disabled, error }]) + ' input-class'"
                    :type="type"
                    :focus="focus"
                    :cursor="cursor"
                    :value="innerValue"
                    :auto-focus="autoFocus"
                    :disabled="disabled || readonly"
                    :maxlength="maxlength"
                    :placeholder="placeholder"
                    :placeholder-style="placeholderStyle"
                    :placeholder-class="utils.bem('field__placeholder', { error })"
                    :confirm-type="confirmType"
                    :confirm-hold="confirmHold"
                    :hold-keyboard="holdKeyboard"
                    :cursor-spacing="cursorSpacing"
                    :adjust-position="adjustPosition"
                    :selection-end="selectionEnd"
                    :selection-start="selectionStart"
                    :always-embed="alwaysEmbed"
                    :password="password || type === 'password'"
                    @input="onInput"
                    @tap="onClickInput"
                    @blur="onBlur"
                    @focus="onFocus"
                    @confirm="onConfirm"
                    @keyboardheightchange="onKeyboardHeightChange"
                />

                <van-icon v-if="showClear" :name="clearIcon" class="van-field__clear-root van-field__icon-root" @touchstart.native.stop.prevent="onClear" />
                <view class="van-field__icon-container" @tap="onClickIcon">
                    <van-icon v-if="rightIcon || icon" :name="rightIcon || icon" :class="'van-field__icon-root ' + iconClass" custom-class="right-icon-class" />
                    <slot name="right-icon" />
                    <slot name="icon" />
                </view>
                <view class="van-field__button">
                    <slot name="button" />
                </view>
            </view>
            <view v-if="showWordLimit && maxlength" class="van-field__word-limit">
                <view :class="utils.bem('field__word-num', { full: value.length >= maxlength })">{{ value.length >= maxlength ? maxlength : value.length }}</view>
                /{{ maxlength }}
            </view>
            <view v-if="errorMessage" :class="utils.bem('field__error-message', [errorMessageAlign, { disabled, error }])">
                {{ errorMessage }}
            </view>
        </van-cell>
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script module="computed" lang="wxs" src="./index.wxs"></script>
<script>
'use strict';
import vanCell from '../cell/index';
import vanIcon from '../icon/index';

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

var utils_1 = require('../common/utils');

var component_1 = require('../common/component');

var props_1 = require('./props');

export default {
    components: {
        vanCell,
        vanIcon
    },
    data() {
        return {
            focused: false,
            innerValue: '',
            showClear: false,
            value: '',
            size: '',
            leftIcon: 0,
            center: '',
            border: '',
            isLink: false,
            required: '',
            clickable: '',
            titleWidth: 0,
            customStyle: '',
            arrowDirection: [],
            label: '',
            fixed: '',
            focus: '',
            cursor: '',
            autoFocus: [],
            disabled: '',
            readonly: '',
            maxlength: 0,
            placeholder: '',
            placeholderStyle: '',
            autosize: '',
            cursorSpacing: '',
            adjustPosition: '',
            showConfirmBar: '',
            holdKeyboard: '',
            selectionEnd: '',
            selectionStart: '',
            disableDefaultPadding: '',
            type: '',
            confirmType: '',
            confirmHold: '',
            alwaysEmbed: '',
            password: '',
            clearIcon: '',
            rightIcon: '',
            icon: '',
            iconClass: '',
            showWordLimit: '',
            errorMessage: ''
        };
    },
    field: true,
    classes: ['input-class', 'right-icon-class', 'label-class'],
    props: __assign(__assign(__assign(__assign({}, props_1.commonProps), props_1.inputProps), props_1.textareaProps), {
        size: String,
        icon: String,
        label: String,
        error: Boolean,
        center: Boolean,
        isLink: Boolean,
        leftIcon: String,
        rightIcon: String,
        autosize: null,
        required: Boolean,
        iconClass: String,
        clickable: Boolean,
        inputAlign: String,
        customStyle: String,
        errorMessage: String,
        arrowDirection: String,
        showWordLimit: Boolean,
        errorMessageAlign: String,
        readonly: {
            type: Boolean,
            observer: 'setShowClear'
        },
        clearable: {
            type: Boolean,
            observer: 'setShowClear'
        },
        clearTrigger: {
            type: String,
            value: 'focus'
        },
        border: {
            type: Boolean,
            value: true
        },
        titleWidth: {
            type: String,
            value: '6.2em'
        },
        clearIcon: {
            type: String,
            value: 'clear'
        }
    }),
    created: function () {
        this.value = this.value;
        this.setData({
            innerValue: this.value
        });
    },
    methods: {
        onInput: function (event) {
            var _a = (event.detail || {}).value;
            var value = _a === void 0 ? '' : _a;
            this.value = value;
            this.setShowClear();
            this.emitChange();
        },
        onFocus: function (event) {
            this.focused = true;
            this.setShowClear();
            this.$emit('focus', event.detail);
        },
        onBlur: function (event) {
            this.focused = false;
            this.setShowClear();
            this.$emit('blur', event.detail);
        },
        onClickIcon: function () {
            this.$emit('click-icon');
        },
        onClickInput: function (event) {
            this.$emit('click-input', event.detail);
        },
        onClear: function () {
            var that = this;
            this.setData({
                innerValue: ''
            });
            this.value = '';
            this.setShowClear();
            (0, utils_1.nextTick)(function () {
                that.emitChange();
                that.$emit('clear', '');
            });
        },
        onConfirm: function (event) {
            var _a = (event.detail || {}).value;
            var value = _a === void 0 ? '' : _a;
            this.value = value;
            this.setShowClear();
            this.$emit('confirm', value);
        },
        setValue: function (value) {
            this.value = value;
            this.setShowClear();

            if (value === '') {
                this.setData({
                    innerValue: ''
                });
            }

            this.emitChange();
        },
        onLineChange: function (event) {
            this.$emit('linechange', event.detail);
        },
        onKeyboardHeightChange: function (event) {
            this.$emit('keyboardheightchange', event.detail);
        },
        emitChange: function () {
            var that = this;
            this.setData({
                value: this.value
            });
            (0, utils_1.nextTick)(function () {
                that.$emit('input', that.value);
                that.$emit('change', that.value);
            });
        },
        setShowClear: function () {
            var _a = this;
            var clearable = _a.clearable;
            var readonly = _a.readonly;
            var clearTrigger = _a.clearTrigger;
            var that = this;
            var focused = that.focused;
            var value = that.value;
            var showClear = false;

            if (clearable && !readonly) {
                var hasValue = !!value;
                var trigger = clearTrigger === 'always' || (clearTrigger === 'focus' && focused);
                showClear = hasValue && trigger;
            }

            this.setData({
                showClear: showClear
            });
        },
        noop: function () {}
    }
};
</script>
<style>
@import './index.css';
</style>
