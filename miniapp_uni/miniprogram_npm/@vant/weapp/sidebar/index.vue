<template>
    <view class="van-sidebar custom-class">
        <slot />
    </view>
</template>

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
    relation: (0, relation_1.useChildren)('sidebar-item', function () {
        this.setActive(this.activeKey);
    }),
    props: {
        activeKey: {
            type: Number,
            default: 0
        }
    },
    beforeCreate: function () {
        this.currentActive = -1;
    },
    methods: {
        setActive: function (activeKey) {
            var that = this;
            var children = that.children;
            var currentActive = that.currentActive;
            if (!children.length) {
                return Promise.resolve();
            }

            this.currentActive = activeKey;
            var stack = [];

            if (currentActive !== activeKey && children[currentActive]) {
                stack.push(children[currentActive].setActive(false));
            }

            if (children[activeKey]) {
                stack.push(children[activeKey].setActive(true));
            }

            return Promise.all(stack);
        }
    },
    watch: {
        activeKey: {
            handler: function (activeKey) {
                var that = this;
                var children = that.children;
                var currentActive = that.currentActive;
                if (!children.length) {
                    return Promise.resolve();
                }

                this.currentActive = activeKey;
                var stack = [];

                if (currentActive !== activeKey && children[currentActive]) {
                    stack.push(children[currentActive].setActive(false));
                }

                if (children[activeKey]) {
                    stack.push(children[activeKey].setActive(true));
                }

                return Promise.all(stack);
            },

            immediate: true
        }
    }
};
</script>
<style>
@import './index.css';
</style>
