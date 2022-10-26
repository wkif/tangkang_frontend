<template>
    <view class="van-dropdown-menu van-dropdown-menu--top-bottom custom-class">
        <view :data-index="index" :class="utils.bem('dropdown-menu__item', { disabled: item.disabled })" @tap="onTitleTap" v-for="(item, index) in itemListData" :key="index">
            <view
                :class="item.titleClass + ' ' + utils.bem('dropdown-menu__title', { active: item.showPopup, down: item.showPopup === (direction === 'down') })"
                :style="item.showPopup ? 'color:' + activeColor : ''"
            >
                <view class="van-ellipsis">
                    {{ computed.displayTitle(item) }}
                </view>
            </view>
        </view>

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

var relation_1 = require('../common/relation');

var utils_1 = require('../common/utils');

var ARRAY = [];
export default {
    data() {
        return {
            itemListData: []
        };
    },
    field: true,
    relation: (0, relation_1.useChildren)('dropdown-item', function () {
        this.updateItemListData();
    }),
    props: {
        activeColor: {
            type: String
        },
        overlay: {
            type: Boolean,
            default: true
        },
        zIndex: {
            type: Number,
            default: 10
        },
        duration: {
            type: Number,
            default: 200
        },
        direction: {
            type: String,
            default: 'down'
        },
        closeOnClickOverlay: {
            type: Boolean,
            default: true
        },
        closeOnClickOutside: {
            type: Boolean,
            default: true
        }
    },
    beforeCreate: function () {
        var windowHeight = (0, utils_1.getSystemInfoSync)().windowHeight;
        this.windowHeight = windowHeight;
        ARRAY.push(this);
    },
    destroyed: function () {
        var that = this;
        ARRAY = ARRAY.filter(function (item) {
            return item !== that;
        });
    },
    methods: {
        updateItemListData: function () {
            this.setData({
                itemListData: this.children.map(function (child) {
                    return child.data;
                })
            });
        },
        updateChildrenData: function () {
            this.children.forEach(function (child) {
                child.updateDataFromParent();
            });
        },
        toggleItem: function (active) {
            this.children.forEach(function (item, index) {
                var showPopup = item.data.showPopup;

                if (index === active) {
                    item.toggle();
                } else if (showPopup) {
                    item.toggle(false, {
                        immediate: true
                    });
                }
            });
        },
        close: function () {
            this.children.forEach(function (child) {
                child.toggle(false, {
                    immediate: true
                });
            });
        },
        getChildWrapperStyle: function () {
            var that = this;
            var _a = this;
            var zIndex = _a.zIndex;
            var direction = _a.direction;
            return (0, utils_1.getRect)(this, '.van-dropdown-menu').then(function (rect) {
                var _a = rect.top;
                var top = _a === void 0 ? 0 : _a;
                var _b = rect.bottom;
                var bottom = _b === void 0 ? 0 : _b;
                var offset = direction === 'down' ? bottom : that.windowHeight - top;
                var wrapperStyle = 'z-index: '.concat(zIndex, ';');

                if (direction === 'down') {
                    wrapperStyle += 'top: '.concat((0, utils_1.addUnit)(offset), ';');
                } else {
                    wrapperStyle += 'bottom: '.concat((0, utils_1.addUnit)(offset), ';');
                }

                return wrapperStyle;
            });
        },
        onTitleTap: function (event) {
            var that = this;
            var index = event.currentTarget.dataset.index;
            var child = this.children[index];

            if (!child.data.disabled) {
                ARRAY.forEach(function (menuItem) {
                    if (menuItem && menuItem.data.closeOnClickOutside && menuItem !== that) {
                        menuItem.close();
                    }
                });
                this.toggleItem(index);
            }
        }
    },
    watch: {
        activeColor: {
            handler: function () {
                this.children.forEach(function (child) {
                    child.updateDataFromParent();
                });
            },

            immediate: true
        },

        overlay: {
            handler: function () {
                this.children.forEach(function (child) {
                    child.updateDataFromParent();
                });
            },

            immediate: true
        },

        duration: {
            handler: function () {
                this.children.forEach(function (child) {
                    child.updateDataFromParent();
                });
            },

            immediate: true
        },

        direction: {
            handler: function () {
                this.children.forEach(function (child) {
                    child.updateDataFromParent();
                });
            },

            immediate: true
        },

        closeOnClickOverlay: {
            handler: function () {
                this.children.forEach(function (child) {
                    child.updateDataFromParent();
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
