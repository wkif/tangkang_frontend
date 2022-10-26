<template>
    <view :class="'custom-class ' + utils.bem('tab__pane', { active, inactive: !active })" :style="shouldShow ? '' : 'display: none;'">
        <slot v-if="shouldRender" />
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script>
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var relation_1 = require('../common/relation');

var component_1 = require('../common/component');

export default {
    data() {
        return {
            active: false,
            shouldRender: '',
            shouldShow: ''
        };
    },
    relation: (0, relation_1.useParent)('tabs'),
    props: {
        dot: {
            type: Boolean
        },
        info: {
            type: null
        },
        title: {
            type: String
        },
        disabled: {
            type: Boolean
        },
        titleStyle: {
            type: String
        },
        name: {
            type: null,
            default: ''
        }
    },
    methods: {
        getComputedName: function () {
            if (this.name !== '') {
                return this.name;
            }

            return this.index;
        },
        updateRender: function (active, parent) {
            var parentData = parent.data;
            this.inited = this.inited || active;
            this.setData({
                active: active,
                shouldRender: this.inited || !parentData.lazyRender,
                shouldShow: active || parentData.animated
            });
        },
        update: function () {
            if (this.parent) {
                this.parent.updateTabs();
            }
        }
    },
    watch: {
        dot: {
            handler: function () {
                if (this.parent) {
                    this.parent.updateTabs();
                }
            },

            immediate: true
        },

        info: {
            handler: function () {
                if (this.parent) {
                    this.parent.updateTabs();
                }
            },

            immediate: true
        },

        title: {
            handler: function () {
                if (this.parent) {
                    this.parent.updateTabs();
                }
            },

            immediate: true
        },

        disabled: {
            handler: function () {
                if (this.parent) {
                    this.parent.updateTabs();
                }
            },

            immediate: true
        },

        titleStyle: {
            handler: function () {
                if (this.parent) {
                    this.parent.updateTabs();
                }
            },

            immediate: true
        }
    }
};
</script>
<style>
@import './index.css';
</style>
