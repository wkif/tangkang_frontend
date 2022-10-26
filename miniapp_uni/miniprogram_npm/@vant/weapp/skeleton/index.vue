<template>
    <view>
        <view v-if="loading" :class="'custom-class ' + utils.bem('skeleton', [{ animate }])">
            <view v-if="avatar" :class="'avatar-class ' + utils.bem('skeleton__avatar', [avatarShape])" :style="'width:' + avatarSize + ';height:' + avatarSize" />
            <view :class="utils.bem('skeleton__content')">
                <view v-if="title" :class="'title-class ' + utils.bem('skeleton__title')" :style="'width:' + titleWidth" />
                <view
                    :class="'row-class ' + utils.bem('skeleton__row')"
                    :style="'width:' + (isArray ? rowWidth[index] : rowWidth)"
                    v-for="(item, index) in rowArray"
                    :key="index"
                ></view>
            </view>
        </view>
        <view v-else :class="utils.bem('skeleton__content')">
            <slot />
        </view>
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script>
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

export default {
    data() {
        return {
            isArray: false,
            rowArray: []
        };
    },
    classes: ['avatar-class', 'title-class', 'row-class'],
    props: {
        row: {
            type: Number,
            default: 0
        },
        title: Boolean,
        avatar: Boolean,
        loading: {
            type: Boolean,
            default: true
        },
        animate: {
            type: Boolean,
            default: true
        },
        avatarSize: {
            type: String,
            default: '32px'
        },
        avatarShape: {
            type: String,
            default: 'round'
        },
        titleWidth: {
            type: String,
            default: '40%'
        },
        rowWidth: {
            type: null,
            default: '100%'
        }
    },
    watch: {
        row: {
            handler: function (value) {
                this.setData({
                    rowArray: Array.from({
                        length: value
                    })
                });
            },

            immediate: true
        },

        rowWidth: {
            handler: function (val) {
                this.setData({
                    isArray: val instanceof Array
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
