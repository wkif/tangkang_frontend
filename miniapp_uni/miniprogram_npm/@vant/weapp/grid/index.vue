<template>
    <view :class="'van-grid custom-class ' + (border && !gutter ? 'van-hairline--top' : '')" :style="computed.rootStyle({ gutter })">
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

var relation_1 = require('../common/relation');

export default {
    data() {
        return {};
    },
    relation: (0, relation_1.useChildren)('grid-item'),
    props: {
        square: {
            type: Boolean
        },
        gutter: {
            type: null,
            default: 0
        },
        clickable: {
            type: Boolean
        },
        columnNum: {
            type: Number,
            default: 4
        },
        center: {
            type: Boolean,
            default: true
        },
        border: {
            type: Boolean,
            default: true
        },
        direction: {
            type: String
        },
        iconSize: {
            type: String
        },
        reverse: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        updateChildren: function () {
            this.children.forEach(function (child) {
                child.updateStyle();
            });
        }
    },
    watch: {
        square: {
            handler: function () {
                this.children.forEach(function (child) {
                    child.updateStyle();
                });
            },

            immediate: true
        },

        gutter: {
            handler: function () {
                this.children.forEach(function (child) {
                    child.updateStyle();
                });
            },

            immediate: true
        },

        clickable: {
            handler: function () {
                this.children.forEach(function (child) {
                    child.updateStyle();
                });
            },

            immediate: true
        },

        columnNum: {
            handler: function () {
                this.children.forEach(function (child) {
                    child.updateStyle();
                });
            },

            immediate: true
        },

        center: {
            handler: function () {
                this.children.forEach(function (child) {
                    child.updateStyle();
                });
            },

            immediate: true
        },

        border: {
            handler: function () {
                this.children.forEach(function (child) {
                    child.updateStyle();
                });
            },

            immediate: true
        },

        direction: {
            handler: function () {
                this.children.forEach(function (child) {
                    child.updateStyle();
                });
            },

            immediate: true
        },

        iconSize: {
            handler: function () {
                this.children.forEach(function (child) {
                    child.updateStyle();
                });
            },

            immediate: true
        },

        reverse: {
            handler: function () {
                this.children.forEach(function (child) {
                    child.updateStyle();
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
