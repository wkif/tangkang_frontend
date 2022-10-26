<template>
    <view class="van-calendar__header">
        <block v-if="showTitle">
            <view class="van-calendar__header-title"><slot name="title"></slot></view>
            <view class="van-calendar__header-title">{{ title }}</view>
        </block>

        <view v-if="showSubtitle" class="van-calendar__header-subtitle" @tap="onClickSubtitle">
            {{ subtitle }}
        </view>

        <view class="van-calendar__weekdays">
            <view class="van-calendar__weekday" v-for="(item, index) in weekdays" :key="index">
                {{ item }}
            </view>
        </view>
    </view>
</template>

<script>
'use strict';

var __spreadArray =
    (this && this.__spreadArray) ||
    function (to, from, pack) {
        if (pack || arguments.length === 2) {
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar) {
                        ar = Array.prototype.slice.call(from, 0, i);
                    }

                    ar[i] = from[i];
                }
            }
        }

        return to.concat(ar || Array.prototype.slice.call(from));
    };

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../../../common/component');

export default {
    data() {
        return {
            weekdays: []
        };
    },
    props: {
        title: {
            type: String,
            default: '日期选择'
        },
        subtitle: String,
        showTitle: Boolean,
        showSubtitle: Boolean,
        firstDayOfWeek: {
            type: Number
        }
    },
    created: function () {
        this.initWeekDay();
    },
    methods: {
        initWeekDay: function () {
            var defaultWeeks = ['日', '一', '二', '三', '四', '五', '六'];
            var firstDayOfWeek = this.firstDayOfWeek || 0;
            this.setData({
                weekdays: __spreadArray(__spreadArray([], defaultWeeks.slice(firstDayOfWeek, 7), true), defaultWeeks.slice(0, firstDayOfWeek), true)
            });
        },
        onClickSubtitle: function (event) {
            this.$emit('click-subtitle', event);
        }
    },
    watch: {
        firstDayOfWeek: {
            handler: function () {
                var defaultWeeks = ['日', '一', '二', '三', '四', '五', '六'];
                var firstDayOfWeek = this.firstDayOfWeek || 0;
                this.setData({
                    weekdays: __spreadArray(__spreadArray([], defaultWeeks.slice(firstDayOfWeek, 7), true), defaultWeeks.slice(0, firstDayOfWeek), true)
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
