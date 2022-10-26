<template>
    <view :class="'custom-class ' + utils.bem('steps', [direction])">
        <view class="van-step__wrapper">
            <view
                @tap="onClick"
                :data-index="index"
                :class="utils.bem('step', [direction, status(index, active)]) + ' van-hairline'"
                :style="status(index, active) === 'inactive' ? 'color: ' + inactiveColor : ''"
                v-for="(item, index) in steps"
                :key="index"
            >
                <view class="van-step__title" :style="index === active ? 'color: ' + activeColor : ''">
                    <view>{{ item.text }}</view>
                    <view class="desc-class">{{ item.desc }}</view>
                </view>

                <view class="van-step__circle-container">
                    <block v-if="index !== active">
                        <van-icon
                            v-if="item.inactiveIcon || inactiveIcon"
                            :color="status(index, active) === 'inactive' ? inactiveColor : activeColor"
                            :name="item.inactiveIcon || inactiveIcon"
                            custom-class="van-step__icon"
                        />
                        <view v-else class="van-step__circle" :style="'background-color: ' + (index < active ? activeColor : inactiveColor)" />
                    </block>

                    <van-icon v-else :name="item.activeIcon || activeIcon" :color="activeColor" custom-class="van-step__icon" />
                </view>

                <view v-if="index !== steps.length - 1" class="van-step__line" :style="'background-color: ' + (index < active ? activeColor : inactiveColor)" />
            </view>
        </view>
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script module="status" lang="wxs">
function get(index, active) {
  if (index < active) {
    return 'finish';
  } else if (index === active) {
    return 'process';
  }

  return 'inactive';
}

module.exports = get;
</script>
<script>
'use strict';
import vanIcon from '../icon/index';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

var color_1 = require('../common/color');

export default {
    data() {
        return {};
    },
    components: {
        vanIcon
    },
    classes: ['desc-class'],
    props: {
        icon: String,
        steps: Array,
        active: Number,
        direction: {
            type: String,
            default: 'horizontal'
        },
        activeColor: {
            type: String,
            default: color_1.GREEN
        },
        inactiveColor: {
            type: String,
            default: color_1.GRAY_DARK
        },
        activeIcon: {
            type: String,
            default: 'checked'
        },
        inactiveIcon: String
    },
    methods: {
        onClick: function (event) {
            var index = event.currentTarget.dataset.index;
            this.$emit('click-step', index);
        }
    }
};
</script>
<style>
@import './index.css';
</style>
