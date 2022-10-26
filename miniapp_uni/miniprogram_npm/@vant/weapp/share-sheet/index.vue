<template>
    <view>
        <van-popup
            round
            class="van-share-sheet"
            :show="show"
            position="bottom"
            :overlay="overlay"
            :duration="duration"
            :z-index="zIndex"
            :overlay-style="overlayStyle"
            :close-on-click-overlay="closeOnClickOverlay"
            :safe-area-inset-bottom="safeAreaInsetBottom"
            @close="onClose"
            @click-overlay="onClickOverlay"
        >
            <view class="van-share-sheet__header">
                <view class="van-share-sheet__title">
                    <slot name="title" />
                </view>
                <view v-if="title" class="van-share-sheet__title">{{ title }}</view>

                <view class="van-share-sheet__description">
                    <slot name="description" />
                </view>
                <view v-if="description" class="van-share-sheet__description">
                    {{ description }}
                </view>
            </view>

            <block v-if="computed.isMulti(options)">
                <options :show-border="index !== 0" :options="item" @select="onSelect" v-for="(item, index) in options" :key="index"></options>
            </block>

            <options v-else :options="options" @select="onSelect" />

            <button type="button" class="van-share-sheet__cancel" @tap="onCancel">
                {{ cancelText }}
            </button>
        </van-popup>
    </view>
</template>
<script module="computed" lang="wxs" src="./index.wxs"></script>
<script>
'use strict';
import vanPopup from '../popup/index';
import options from './options';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

export default {
    data() {
        return {};
    },
    components: {
        vanPopup,
        options
    },
    props: {
        // whether to show popup
        show: Boolean,
        // overlay custom style
        overlayStyle: String,
        // z-index
        zIndex: {
            type: Number,
            default: 100
        },
        title: String,
        cancelText: {
            type: String,
            default: '取消'
        },
        description: String,
        options: {
            type: Array,
            default: () => []
        },
        overlay: {
            type: Boolean,
            default: true
        },
        safeAreaInsetBottom: {
            type: Boolean,
            default: true
        },
        closeOnClickOverlay: {
            type: Boolean,
            default: true
        },
        duration: {
            type: null,
            default: 300
        }
    },
    methods: {
        onClickOverlay: function () {
            this.$emit('click-overlay');
        },
        onCancel: function () {
            this.onClose();
            this.$emit('cancel');
        },
        onSelect: function (event) {
            this.$emit('select', event.detail);
        },
        onClose: function () {
            this.$emit('close');
        }
    }
};
</script>
<style>
@import './index.css';
</style>
