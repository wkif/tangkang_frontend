<template>
    <view
        :class="utils.bem('sidebar-item', { selected, disabled }) + ' ' + (selected ? 'active-class' : '') + ' ' + (disabled ? 'disabled-class' : '') + ' custom-class'"
        hover-class="van-sidebar-item--hover"
        hover-stay-time="70"
        @tap="onClick"
    >
        <view class="van-sidebar-item__text">
            <van-info v-if="badge != null || info !== null || dot" :dot="dot" :info="badge != null ? badge : info" />
            <view v-if="title">{{ title }}</view>
            <slot v-else name="title" />
        </view>
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script>
'use strict';
import vanInfo from '../info/index';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

var relation_1 = require('../common/relation');

export default {
    data() {
        return {
            selected: ''
        };
    },
    components: {
        vanInfo
    },
    classes: ['active-class', 'disabled-class'],
    relation: (0, relation_1.useParent)('sidebar'),
    props: {
        dot: Boolean,
        badge: null,
        info: null,
        title: String,
        disabled: Boolean
    },
    methods: {
        onClick: function () {
            var that = this;
            var parent = this.parent;

            if (!parent || this.disabled) {
                return;
            }

            var index = parent.children.indexOf(this);
            parent.setActive(index).then(function () {
                that.$emit('click', index);
                parent.$emit('change', index);
            });
        },
        setActive: function (selected) {
            return this.setData({
                selected: selected
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
