<template>
    <view :class="utils.bem('tabbar-item', { active }) + ' custom-class'" :style="'color: ' + (active ? activeColor : inactiveColor)" @tap="onClick">
        <view class="van-tabbar-item__icon">
            <van-icon v-if="icon" :name="icon" :class-prefix="iconPrefix" custom-class="van-tabbar-item__icon__inner" />
            <block v-else>
                <slot v-if="active" name="icon-active" />
                <slot v-else name="icon" />
            </block>
            <van-info :dot="dot" :info="info" custom-class="van-tabbar-item__info" />
        </view>
        <view class="van-tabbar-item__text">
            <slot />
        </view>
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script>
'use strict';
import vanIcon from '../icon/index';
import vanInfo from '../info/index';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

var relation_1 = require('../common/relation');

export default {
    components: {
        vanIcon,
        vanInfo
    },
    data() {
        return {
            active: false,
            activeColor: '',
            inactiveColor: ''
        };
    },
    props: {
        info: null,
        name: null,
        icon: String,
        dot: Boolean,
        iconPrefix: {
            type: String,
            default: 'van-icon'
        }
    },
    relation: (0, relation_1.useParent)('tabbar'),
    methods: {
        onClick: function () {
            var parent = this.parent;

            if (parent) {
                var index = parent.children.indexOf(this);
                var active = this.name || index;

                if (active !== this.active) {
                    parent.$emit('change', active);
                }
            }

            this.$emit('click');
        },
        updateFromParent: function () {
            var parent = this.parent;

            if (!parent) {
                return;
            }

            var index = parent.children.indexOf(this);
            var parentData = parent.data;
            var data = this;
            var active = (data.name || index) === parentData.active;
            var patch = {};

            if (active !== data.active) {
                patch.active = active;
            }

            if (parentData.activeColor !== data.activeColor) {
                patch.activeColor = parentData.activeColor;
            }

            if (parentData.inactiveColor !== data.inactiveColor) {
                patch.inactiveColor = parentData.inactiveColor;
            }

            if (Object.keys(patch).length > 0) {
                this.setData(patch);
            }
        }
    }
};
</script>
<style>
@import './index.css';
</style>
