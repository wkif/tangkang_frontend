<template>
    <view :style="computed.rootStyle({ width, height, radius })" :class="'custom-class ' + utils.bem('image', { round })" @tap="onClick">
        <image
            v-if="!error"
            :src="src"
            :mode="computed.mode(fit)"
            :lazy-load="lazyLoad"
            class="image-class van-image__img"
            :show-menu-by-longpress="showMenuByLongpress"
            @load="onLoad"
            @error="onError"
        />

        <view v-if="loading && showLoading" class="loading-class van-image__loading">
            <slot v-if="useLoadingSlot" name="loading" />
            <van-icon v-else name="photo" custom-class="van-image__loading-icon" />
        </view>
        <view v-if="error && showError" class="error-class van-image__error">
            <slot v-if="useErrorSlot" name="error" />
            <van-icon v-else name="photo-fail" custom-class="van-image__error-icon" />
        </view>
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script module="computed" lang="wxs" src="./index.wxs"></script>
<script>
'use strict';
import vanIcon from '../icon/index';
import vanLoading from '../loading/index';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

var button_1 = require('../mixins/button');

export default {
    components: {
        vanIcon,
        vanLoading
    },
    data() {
        return {
            error: false,
            loading: true,
            viewStyle: ''
        };
    },
    mixins: [button_1.button],
    classes: ['custom-class', 'loading-class', 'error-class', 'image-class'],
    props: {
        src: {
            type: String
        },
        round: Boolean,
        width: null,
        height: null,
        radius: null,
        lazyLoad: Boolean,
        useErrorSlot: Boolean,
        useLoadingSlot: Boolean,
        showMenuByLongpress: Boolean,
        fit: {
            type: String,
            default: 'fill'
        },
        showError: {
            type: Boolean,
            default: true
        },
        showLoading: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        onLoad: function (event) {
            this.setData({
                loading: false
            });
            this.$emit('load', event.detail);
        },
        onError: function (event) {
            this.setData({
                loading: false,
                error: true
            });
            this.$emit('error', event.detail);
        },
        onClick: function (event) {
            this.$emit('click', event.detail);
        }
    },
    watch: {
        src: {
            handler: function () {
                this.setData({
                    error: false,
                    loading: true
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
