<template>
    <view class="van-tree-select" :style="'height: ' + utils.addUnit(height)">
        <scroll-view scroll-y class="van-tree-select__nav">
            <van-sidebar :active-key="mainActiveIndex" @change="onClickNav" custom-class="van-tree-select__nav__inner">
                <van-sidebar-item
                    custom-class="main-item-class"
                    active-class="main-active-class"
                    disabled-class="main-disabled-class"
                    :badge="item.badge"
                    :dot="item.dot"
                    :title="item.text"
                    :disabled="item.disabled"
                    v-for="(item, index) in items"
                    :key="index"
                ></van-sidebar-item>
            </van-sidebar>
        </scroll-view>
        <scroll-view scroll-y class="van-tree-select__content">
            <slot name="content" />
            <view
                :class="
                    'van-ellipsis content-item-class ' +
                    utils.bem('tree-select__item', { active: wxs.isActive(activeId, item.id), disabled: item.disabled }) +
                    ' ' +
                    (wxs.isActive(activeId, item.id) ? 'content-active-class' : '') +
                    ' ' +
                    (item.disabled ? 'content-disabled-class' : '')
                "
                :data-item="item"
                @tap="onSelectItem"
                v-for="(item, index) in subItems"
                :key="item.id"
            >
                {{ item.text }}

                <van-icon v-if="wxs.isActive(activeId, item.id)" :name="selectedIcon" size="16px" class="van-tree-select__selected" />
            </view>
        </scroll-view>
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script module="wxs" lang="wxs" src="./index.wxs"></script>
<script>
'use strict';
import vanIcon from '../icon/index';
import vanSidebar from '../sidebar/index';
import vanSidebarItem from '../sidebar-item/index';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

export default {
    components: {
        vanIcon,
        vanSidebar,
        vanSidebarItem
    },
    data() {
        return {
            subItems: []
        };
    },
    classes: ['main-item-class', 'content-item-class', 'main-active-class', 'content-active-class', 'main-disabled-class', 'content-disabled-class'],
    props: {
        items: {
            type: Array
        },
        activeId: null,
        mainActiveIndex: {
            type: Number,
            default: 0
        },
        height: {
            type: null,
            default: 300
        },
        max: {
            type: Number,
            default: Infinity
        },
        selectedIcon: {
            type: String,
            default: 'success'
        }
    },
    methods: {
        // ???????????????????????????
        onSelectItem: function (event) {
            var item = event.currentTarget.dataset.item;
            var isArray = Array.isArray(this.activeId); // ?????????????????????????????????????????????

            var isOverMax = isArray && this.activeId.length >= this.max; // ??????????????????????????????, ???????????????????????????????????????????????????

            var isSelected = isArray ? this.activeId.indexOf(item.id) > -1 : this.activeId === item.id;

            if (!item.disabled && (!isOverMax || isSelected)) {
                this.$emit('click-item', item);
            }
        },
        // ???????????????????????????
        onClickNav: function (event) {
            var index = event.detail;
            var item = this.items[index];

            if (!item.disabled) {
                this.$emit('click-nav', {
                    index: index
                });
            }
        },
        // ??????????????????
        updateSubItems: function () {
            var _a = this;
            var items = _a.items;
            var mainActiveIndex = _a.mainActiveIndex;
            var _b = (items[mainActiveIndex] || {}).children;
            var children = _b === void 0 ? [] : _b;
            this.setData({
                subItems: children
            });
        }
    },
    watch: {
        items: {
            handler: function () {
                var _a = this;
                var items = _a.items;
                var mainActiveIndex = _a.mainActiveIndex;
                var _b = (items[mainActiveIndex] || {}).children;
                var children = _b === void 0 ? [] : _b;
                this.setData({
                    subItems: children
                });
            },

            immediate: true,
            deep: true
        },

        mainActiveIndex: {
            handler: function () {
                var _a = this;
                var items = _a.items;
                var mainActiveIndex = _a.mainActiveIndex;
                var _b = (items[mainActiveIndex] || {}).children;
                var children = _b === void 0 ? [] : _b;
                this.setData({
                    subItems: children
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
