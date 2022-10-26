<template>
    <view :class="utils.bem('share-sheet__options', { border: showBorder })">
        <view class="van-share-sheet__option" :data-index="index" @tap="onSelect" v-for="(item, index) in options" :key="index">
            <button class="van-share-sheet__button" :open-type="item.openType">
                <image :src="computed.getIconURL(item.icon)" class="van-share-sheet__icon" />
                <view v-if="item.name" class="van-share-sheet__name">{{ item.name }}</view>
                <view v-if="item.description" class="van-share-sheet__option-description">
                    {{ item.description }}
                </view>
            </button>
        </view>
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script module="computed" lang="wxs" src="./options.wxs"></script>
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

export default {
    data() {
        return {};
    },
    props: {
        options: Array,
        showBorder: Boolean
    },
    methods: {
        onSelect: function (event) {
            var index = event.currentTarget.dataset.index;
            var option = this.options[index];
            this.$emit(
                'select',
                __assign(__assign({}, option), {
                    index: index
                })
            );
        }
    }
};
</script>
<style>
@import './options.css';
</style>
