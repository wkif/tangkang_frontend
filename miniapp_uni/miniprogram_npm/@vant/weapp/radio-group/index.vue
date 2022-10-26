<template>
    <view :class="utils.bem('radio-group', [direction])">
        <slot></slot>
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script>
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

var relation_1 = require('../common/relation');

export default {
    data() {
        return {};
    },
    field: true,
    relation: (0, relation_1.useChildren)('radio'),
    props: {
        value: {
            type: null
        },
        direction: String,
        disabled: {
            type: Boolean
        }
    },
    methods: {
        updateChildren: function () {
            this.children.forEach(function (child) {
                return child.updateFromParent();
            });
        }
    },
    watch: {
        value: {
            handler: function () {
                this.children.forEach(function (child) {
                    return child.updateFromParent();
                });
            },

            immediate: true
        },

        disabled: {
            handler: function () {
                this.children.forEach(function (child) {
                    return child.updateFromParent();
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
