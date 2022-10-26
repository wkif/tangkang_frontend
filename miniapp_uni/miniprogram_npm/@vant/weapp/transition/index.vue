<template>
    <view v-if="inited" :class="'van-transition custom-class ' + classes" :style="computed.rootStyle({ currentDuration, display, customStyle })" @transitionend="onTransitionEnd">
        <slot />
    </view>
</template>
<script module="computed" lang="wxs" src="./index.wxs"></script>
<script>
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

var transition_1 = require('../mixins/transition');

export default {
    data() {
        return {
            inited: '',
            classes: ''
        };
    },
    classes: ['enter-class', 'enter-active-class', 'enter-to-class', 'leave-class', 'leave-active-class', 'leave-to-class'],
    mixins: [(0, transition_1.transition)(true)]
};
</script>
<style>
@import './index.css';
</style>
