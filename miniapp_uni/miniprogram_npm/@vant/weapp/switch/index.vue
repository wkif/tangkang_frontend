<template>
    <view
        :class="utils.bem('switch', { on: checked === activeValue, disabled }) + ' custom-class'"
        :style="computed.rootStyle({ size, checked, activeColor, inactiveColor, activeValue })"
        @tap="onClick"
    >
        <view class="van-switch__node node-class">
            <van-loading v-if="loading" :color="computed.loadingColor({ checked, activeColor, inactiveColor, activeValue })" custom-class="van-switch__loading" />
        </view>
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script module="computed" lang="wxs" src="./index.wxs"></script>
<script>
'use strict';
import vanLoading from '../loading/index';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

export default {
    data() {
        return {};
    },
    components: {
        vanLoading
    },
    field: true,
    classes: ['node-class'],
    props: {
        checked: null,
        loading: Boolean,
        disabled: Boolean,
        activeColor: String,
        inactiveColor: String,
        size: {
            type: String,
            default: '30'
        },
        activeValue: {
            type: null,
            default: true
        },
        inactiveValue: {
            type: null,
            default: false
        }
    },
    methods: {
        onClick: function () {
            var _a = this;
            var activeValue = _a.activeValue;
            var inactiveValue = _a.inactiveValue;
            var disabled = _a.disabled;
            var loading = _a.loading;
            if (disabled || loading) {
                return;
            }

            var checked = this.checked === activeValue;
            var value = checked ? inactiveValue : activeValue;
            this.$emit('input', value);
            this.$emit('change', value);
        }
    }
};
</script>
<style>
@import './index.css';
</style>
