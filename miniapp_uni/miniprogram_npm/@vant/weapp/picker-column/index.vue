<template>
    <view
        class="van-picker-column custom-class"
        :style="computed.rootStyle({ itemHeight, visibleItemCount })"
        @touchstart="onTouchStart"
        @touchmove.stop.prevent="onTouchMove"
        @touchend="onTouchEnd"
        @touchcancel="onTouchEnd"
    >
        <view :style="computed.wrapperStyle({ offset, itemHeight, visibleItemCount, duration })">
            <view
                :data-index="index"
                :style="'height: ' + itemHeight + 'px'"
                :class="
                    'van-ellipsis ' +
                    utils.bem('picker-column__item', { disabled: option && option.disabled, selected: index === currentIndex }) +
                    ' ' +
                    (index === currentIndex ? 'active-class' : '')
                "
                @tap="onClickItem"
                v-for="(option, index) in options"
                :key="index"
            >
                {{ computed.optionText(option, valueKey) }}
            </view>
        </view>
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

var utils_1 = require('../common/utils');

var validator_1 = require('../common/validator');

var DEFAULT_DURATION = 200;
export default {
    data() {
        return {
            startY: 0,
            offset: 0,
            duration: 0,
            startOffset: 0,
            options: [],
            currentIndex: 0,

            option: {
                disabled: ''
            }
        };
    },
    classes: ['active-class'],
    props: {
        valueKey: String,
        className: String,
        itemHeight: Number,
        visibleItemCount: Number,
        initialOptions: {
            type: Array,
            default: () => []
        },
        defaultIndex: {
            type: Number,
            default: 0
        }
    },
    created: function () {
        var that = this;
        var _a = this;
        var defaultIndex = _a.defaultIndex;
        var initialOptions = _a.initialOptions;
        this.set({
            currentIndex: defaultIndex,
            options: initialOptions
        }).then(function () {
            that.setIndex(defaultIndex);
        });
    },
    methods: {
        getCount: function () {
            return this.options.length;
        },
        onTouchStart: function (event) {
            this.setData({
                startY: event.touches[0].clientY,
                startOffset: this.offset,
                duration: 0
            });
        },
        onTouchMove: function (event) {
            var data = this;
            var deltaY = event.touches[0].clientY - data.startY;
            this.setData({
                offset: (0, utils_1.range)(data.startOffset + deltaY, -(this.getCount() * data.itemHeight), data.itemHeight)
            });
        },
        onTouchEnd: function () {
            var data = this;

            if (data.offset !== data.startOffset) {
                this.setData({
                    duration: DEFAULT_DURATION
                });
                var index = (0, utils_1.range)(Math.round(-data.offset / data.itemHeight), 0, this.getCount() - 1);
                this.setIndex(index, true);
            }
        },
        onClickItem: function (event) {
            var index = event.currentTarget.dataset.index;
            this.setIndex(index, true);
        },
        adjustIndex: function (index) {
            var data = this;
            var count = this.getCount();
            index = (0, utils_1.range)(index, 0, count);

            for (var i = index; i < count; i++) {
                if (!this.isDisabled(data.options[i])) {
                    return i;
                }
            }

            for (var i = index - 1; i >= 0; i--) {
                if (!this.isDisabled(data.options[i])) {
                    return i;
                }
            }
        },
        isDisabled: function (option) {
            return (0, validator_1.isObj)(option) && option.disabled;
        },
        getOptionText: function (option) {
            var data = this;
            return (0, validator_1.isObj)(option) && data.valueKey in option ? option[data.valueKey] : option;
        },
        setIndex: function (index, userAction) {
            var that = this;
            var data = this;
            index = this.adjustIndex(index) || 0;
            var offset = -index * data.itemHeight;

            if (index !== data.currentIndex) {
                return this.set({
                    offset: offset,
                    currentIndex: index
                }).then(function () {
                    if (userAction) {
                        that.$emit('change', index);
                    }
                });
            }

            return this.set({
                offset: offset
            });
        },
        setValue: function (value) {
            var options = this.options;

            for (var i = 0; i < options.length; i++) {
                if (this.getOptionText(options[i]) === value) {
                    return this.setIndex(i);
                }
            }

            return Promise.resolve();
        },
        getValue: function () {
            var data = this;
            return data.options[data.currentIndex];
        }
    },
    watch: {
        defaultIndex: {
            handler: function (value) {
                this.setIndex(value);
            },

            immediate: true
        }
    }
};
</script>
<style>
@import './index.css';
</style>
