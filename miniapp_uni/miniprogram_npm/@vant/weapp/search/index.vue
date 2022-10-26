<template>
    <view :class="utils.bem('search', { withaction: showAction || useActionSlot }) + ' custom-class'" :style="'background: ' + background">
        <view :class="utils.bem('search__content', [shape])">
            <view class="van-search__label" v-if="label">{{ label }}</view>
            <slot v-else name="label" />

            <van-field
                type="search"
                :left-icon="!useLeftIconSlot ? leftIcon : ''"
                :right-icon="!useRightIconSlot ? rightIcon : ''"
                :focus="focus"
                :error="error"
                :border="false"
                confirm-type="search"
                class="van-search__field field-class"
                :value="value"
                :disabled="disabled"
                :readonly="readonly"
                :clearable="clearable"
                :clear-trigger="clearTrigger"
                :clear-icon="clearIcon"
                :maxlength="maxlength"
                :input-align="inputAlign"
                input-class="input-class"
                :placeholder="placeholder"
                :placeholder-style="placeholderStyle"
                custom-style="padding: 5px 10px 5px 0; background-color: transparent;"
                @blur="onBlur"
                @focus="onFocus"
                @change="onChange"
                @confirm="onSearch"
                @clear="onClear"
                @click-input="onClickInput"
            >
                <slot v-if="useLeftIconSlot" name="left-icon" slot="left-icon" />
                <slot v-if="useRightIconSlot" name="right-icon" slot="right-icon" />
            </van-field>
        </view>

        <view v-if="showAction || useActionSlot" class="van-search__action" hover-class="van-search__action--hover" hover-stay-time="70">
            <slot v-if="useActionSlot" name="action" />
            <view v-else @tap="onCancel" class="cancel-class">{{ actionText }}</view>
        </view>
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script>
'use strict';
import vanField from '../field/index';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

var version_1 = require('../common/version');

export default {
    data() {
        return {
            value: ''
        };
    },
    components: {
        vanField
    },
    field: true,
    classes: ['field-class', 'input-class', 'cancel-class'],
    props: {
        label: String,
        focus: Boolean,
        error: Boolean,
        disabled: Boolean,
        readonly: Boolean,
        inputAlign: String,
        showAction: Boolean,
        useActionSlot: Boolean,
        useLeftIconSlot: Boolean,
        useRightIconSlot: Boolean,
        leftIcon: {
            type: String,
            default: 'search'
        },
        rightIcon: String,
        placeholder: String,
        placeholderStyle: String,
        actionText: {
            type: String,
            default: '取消'
        },
        background: {
            type: String,
            default: '#ffffff'
        },
        maxlength: {
            type: Number,
            default: -1
        },
        shape: {
            type: String,
            default: 'square'
        },
        clearable: {
            type: Boolean,
            default: true
        },
        clearTrigger: {
            type: String,
            default: 'focus'
        },
        clearIcon: {
            type: String,
            default: 'clear'
        }
    },
    methods: {
        onChange: function (event) {
            if ((0, version_1.canIUseModel)()) {
                this.setData({
                    value: event.detail
                });
            }

            this.$emit('change', event.detail);
        },
        onCancel: function () {
            var that = this;
            /**
             * 修复修改输入框值时，输入框失焦和赋值同时触发，赋值失效
             * https://github.com/youzan/@vant/weapp/issues/1768
             */

            setTimeout(function () {
                if ((0, version_1.canIUseModel)()) {
                    that.setData({
                        value: ''
                    });
                }

                that.$emit('cancel');
                that.$emit('change', '');
            }, 200);
        },
        onSearch: function (event) {
            this.$emit('search', event.detail);
        },
        onFocus: function (event) {
            this.$emit('focus', event.detail);
        },
        onBlur: function (event) {
            this.$emit('blur', event.detail);
        },
        onClear: function (event) {
            this.$emit('clear', event.detail);
        },
        onClickInput: function (event) {
            this.$emit('click-input', event.detail);
        }
    }
};
</script>
<style>
@import './index.css';
</style>
