<template>
    <view :class="utils.bem('checkbox-group', [{ horizontal: directionClone === 'horizontal' }])">
        <slot />
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
            parentDisabled: '',
            valueClone: [],
            directionClone: ''
        };
    },
    field: true,
    relation: (0, relation_1.useChildren)('checkbox', function (target) {
        this.updateChild(target);
    }),
    props: {
        max: Number,
        value: {
            type: Array
        },
        disabled: {
            type: Boolean
        },
        direction: {
            type: String,
            default: 'vertical'
        }
    },
    methods: {
        updateChildren: function () {
            var that = this;
            this.children.forEach(function (child) {
                return that.updateChild(child);
            });
        },
        updateChild: function (child) {
            var _a = this;
            var value = _a.value;
            var disabled = _a.disabled;
            var direction = _a.direction;
            child.setData({
                valueClone: value.indexOf(child.data.name) !== -1,
                parentDisabled: disabled,
                directionClone: direction
            });
        }
    },
    watch: {
        value: {
            handler: function () {
                this.valueClone = this.deepClone(this.value);
                var that = this;
                this.children.forEach(function (child) {
                    return that.updateChild(child);
                });
            },

            immediate: true,
            deep: true
        },

        disabled: {
            handler: function () {
                var that = this;
                this.children.forEach(function (child) {
                    return that.updateChild(child);
                });
            },

            immediate: true
        },

        direction: {
            handler: function (newVal, oldVal) {
                this.directionClone = newVal;
            },

            immediate: true
        }
    }
};
</script>
<style>
@import './index.css';
</style>
