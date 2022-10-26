<template>
    <view
        :class="'custom-class ' + utils.bem('cell', [size, { center, required, borderless: !border, clickable: isLink || clickable }])"
        hover-class="van-cell--hover hover-class"
        hover-stay-time="70"
        :style="customStyle"
        @tap="onClick"
    >
        <van-icon v-if="icon" :name="icon" class="van-cell__left-icon-wrap" custom-class="van-cell__left-icon" />
        <slot v-else name="icon" />

        <view :style="computed.titleStyle({ titleWidth, titleStyle })" class="van-cell__title title-class">
            <block v-if="title">{{ title }}</block>
            <slot v-else name="title" />

            <view v-if="label || useLabelSlot" class="van-cell__label label-class">
                <slot v-if="useLabelSlot" name="label" />
                <block v-else-if="label">{{ label }}</block>
            </view>
        </view>

        <view class="van-cell__value value-class">
            <block v-if="value || value === 0">{{ value }}</block>
            <slot v-else />
        </view>

        <van-icon
            v-if="isLink"
            :name="arrowDirection ? 'arrow' + '-' + arrowDirection : 'arrow'"
            class="van-cell__right-icon-wrap right-icon-class"
            custom-class="van-cell__right-icon"
        />
        <slot v-else name="right-icon" />

        <slot name="extra" />
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script module="computed" lang="wxs" src="./index.wxs"></script>
<script>
'use strict';
import vanIcon from '../icon/index';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var link_1 = require('../mixins/link');

var component_1 = require('../common/component');

export default {
    data() {
        return {};
    },
    components: {
        vanIcon
    },
    classes: ['title-class', 'label-class', 'value-class', 'right-icon-class', 'hover-class'],
    mixins: [link_1.link],
    props: {
        title: null,
        value: null,
        icon: String,
        size: String,
        label: String,
        center: Boolean,
        isLink: Boolean,
        required: Boolean,
        clickable: Boolean,
        titleWidth: String,
        customStyle: String,
        arrowDirection: String,
        useLabelSlot: Boolean,
        border: {
            type: Boolean,
            default: true
        },
        titleStyle: String
    },
    methods: {
        onClick: function (event) {
            this.$emit('click', event.detail);
            this.jumpLink();
        }
    }
};
</script>
<style>
@import './index.css';
</style>
