<template>
    <view :class="'custom-class ' + utils.bem('divider', [{ dashed, hairline }, contentPosition])" :style="computed.rootStyle({ borderColor, textColor, fontSize, customStyle })">
        <slot />
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script module="computed" lang="wxs" src="./index.wxs"></script>
<script>
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

export default {
    data() {
        return {};
    },
    props: {
        dashed: Boolean,
        hairline: Boolean,
        contentPosition: String,
        fontSize: String,
        borderColor: String,
        textColor: String,
        customStyle: String
    }
};
</script>
<style>
@import './index.css';
</style>
