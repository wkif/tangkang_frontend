<template>
    <view class="van-submit-bar custom-class">
        <slot name="top" />

        <view class="van-submit-bar__tip">
            <van-icon v-if="tipIcon" size="12px" :name="tipIcon" custom-class="van-submit-bar__tip-icon" />
            <view v-if="hasTip" class="van-submit-bar__tip-text">
                {{ tip }}
            </view>
            <slot name="tip" />
        </view>

        <view class="bar-class van-submit-bar__bar">
            <slot />
            <view v-if="hasPrice" class="van-submit-bar__text">
                <text>{{ label || '合计：' }}</text>
                <text class="van-submit-bar__price price-class">
                    <text class="van-submit-bar__currency">{{ currency }}</text>
                    <text class="van-submit-bar__price-integer">{{ integerStr }}</text>
                    <text>{{ decimalStr }}</text>
                </text>
                <text class="van-submit-bar__suffix-label">{{ suffixLabel }}</text>
            </view>
            <van-button
                round
                :type="buttonType"
                :loading="loading"
                :disabled="disabled"
                class="van-submit-bar__button"
                custom-class="button-class"
                custom-style="width: 100%;"
                @click="onSubmit"
            >
                {{ loading ? '' : buttonText }}
            </van-button>
        </view>

        <view v-if="safeAreaInsetBottom" class="van-submit-bar__safe" />
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script>
'use strict';
import vanButton from '../button/index';
import vanIcon from '../icon/index';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

export default {
    data() {
        return {
            hasPrice: '',
            integerStr: '',
            decimalStr: '',
            hasTip: ''
        };
    },
    components: {
        vanButton,
        vanIcon
    },
    classes: ['bar-class', 'price-class', 'button-class'],
    props: {
        tip: {
            type: null
        },
        tipIcon: String,
        type: Number,
        price: {
            type: null
        },
        label: String,
        loading: Boolean,
        disabled: Boolean,
        buttonText: String,
        currency: {
            type: String,
            default: '¥'
        },
        buttonType: {
            type: String,
            default: 'danger'
        },
        decimalLength: {
            type: Number,
            default: 2
        },
        suffixLabel: String,
        safeAreaInsetBottom: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        updatePrice: function () {
            var _a = this;
            var price = _a.price;
            var decimalLength = _a.decimalLength;
            var priceStrArr = typeof price === 'number' && (price / 100).toFixed(decimalLength).split('.');
            this.setData({
                hasPrice: typeof price === 'number',
                integerStr: priceStrArr && priceStrArr[0],
                decimalStr: decimalLength && priceStrArr ? '.'.concat(priceStrArr[1]) : ''
            });
        },
        updateTip: function () {
            this.setData({
                hasTip: typeof this.tip === 'string'
            });
        },
        onSubmit: function (event) {
            this.$emit('submit', event.detail);
        }
    },
    watch: {
        tip: {
            handler: function () {
                this.setData({
                    hasTip: typeof this.tip === 'string'
                });
            },

            immediate: true
        },

        price: {
            handler: function () {
                var _a = this;
                var price = _a.price;
                var decimalLength = _a.decimalLength;
                var priceStrArr = typeof price === 'number' && (price / 100).toFixed(decimalLength).split('.');
                this.setData({
                    hasPrice: typeof price === 'number',
                    integerStr: priceStrArr && priceStrArr[0],
                    decimalStr: decimalLength && priceStrArr ? '.'.concat(priceStrArr[1]) : ''
                });
            },

            immediate: true
        },

        decimalLength: {
            handler: function () {
                var _a = this;
                var price = _a.price;
                var decimalLength = _a.decimalLength;
                var priceStrArr = typeof price === 'number' && (price / 100).toFixed(decimalLength).split('.');
                this.setData({
                    hasPrice: typeof price === 'number',
                    integerStr: priceStrArr && priceStrArr[0],
                    decimalStr: decimalLength && priceStrArr ? '.'.concat(priceStrArr[1]) : ''
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
