<template>
    <view :class="'custom-class van-collapse ' + (border ? 'van-hairline--top-bottom' : '')">
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
    relation: (0, relation_1.useChildren)('collapse-item'),
    props: {
        value: {
            type: null
        },
        accordion: {
            type: Boolean
        },
        border: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        updateExpanded: function () {
            this.children.forEach(function (child) {
                child.updateExpanded();
            });
        },
        switchFun: function (name, expanded) {
            var _a = this;
            var accordion = _a.accordion;
            var value = _a.value;
            var changeItem = name;

            if (!accordion) {
                if (expanded) {
                    name = (value || []).concat(name);
                } else {
                    name = (value || []).filter(function (activeName) {
                        return activeName !== name;
                    });
                }
            } else {
                if (expanded) {
                    name = name;
                } else {
                    name = '';
                }
            }

            if (expanded) {
                this.$emit('open', changeItem);
            } else {
                this.$emit('close', changeItem);
            }

            this.$emit('change', name);
            this.$emit('input', name);
        }
    },
    watch: {
        value: {
            handler: function () {
                this.children.forEach(function (child) {
                    child.updateExpanded();
                });
            },

            immediate: true
        },

        accordion: {
            handler: function () {
                this.children.forEach(function (child) {
                    child.updateExpanded();
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
