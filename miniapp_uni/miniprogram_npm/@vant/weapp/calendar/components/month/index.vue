<template>
    <view class="van-calendar__month" :style="computed.getMonthStyle(visible, date, rowHeight)">
        <view v-if="showMonthTitle" class="van-calendar__month-title">
            {{ computed.formatMonthTitle(date) }}
        </view>

        <view v-if="visible" class="van-calendar__days">
            <view v-if="showMark" class="van-calendar__month-mark">
                {{ computed.getMark(date) }}
            </view>

            <view
                :style="computed.getDayStyle(item.type, index, date, rowHeight, color, firstDayOfWeek)"
                :class="utils.bem('calendar__day', [item.type]) + ' ' + item.className"
                :data-index="index"
                @tap="onClick"
                v-for="(item, index) in days"
                :key="index"
            >
                <view v-if="item.type === 'selected'" class="van-calendar__selected-day" :style="'width: ' + rowHeight + 'px; height: ' + rowHeight + 'px; background: ' + color">
                    <view v-if="item.topInfo" class="van-calendar__top-info">{{ item.topInfo }}</view>
                    {{ item.text }}
                    <view v-if="item.bottomInfo" class="van-calendar__bottom-info">
                        {{ item.bottomInfo }}
                    </view>
                </view>

                <view v-else>
                    <view v-if="item.topInfo" class="van-calendar__top-info">{{ item.topInfo }}</view>
                    {{ item.text }}
                    <view v-if="item.bottomInfo" class="van-calendar__bottom-info">
                        {{ item.bottomInfo }}
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
<script module="computed" lang="wxs" src="./index.wxs"></script>
<script module="utils" lang="wxs" src="../../../wxs/utils.wxs"></script>
<script>
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../../../common/component');

var utils_1 = require('../../utils');

export default {
    data() {
        return {
            visible: true,
            days: []
        };
    },
    props: {
        date: {
            type: null
        },
        type: {
            type: String
        },
        color: String,
        minDate: {
            type: null
        },
        maxDate: {
            type: null
        },
        showMark: Boolean,
        rowHeight: null,
        formatter: {
            type: null
        },
        currentDate: {
            type: null
        },
        firstDayOfWeek: {
            type: Number
        },
        allowSameDay: Boolean,
        showSubtitle: Boolean,
        showMonthTitle: Boolean
    },
    methods: {
        onClick: function (event) {
            var index = event.currentTarget.dataset.index;
            var item = this.days[index];

            if (item.type !== 'disabled') {
                this.$emit('click', item);
            }
        },
        setDays: function () {
            var days = [];
            var startDate = new Date(this.date);
            var year = startDate.getFullYear();
            var month = startDate.getMonth();
            var totalDay = (0, utils_1.getMonthEndDay)(startDate.getFullYear(), startDate.getMonth() + 1);

            for (var day = 1; day <= totalDay; day++) {
                var date = new Date(year, month, day);
                var type = this.getDayType(date);
                var config = {
                    date: date,
                    type: type,
                    text: day,
                    bottomInfo: this.getBottomInfo(type)
                };

                if (this.formatter) {
                    config = this.formatter(config);
                }

                days.push(config);
            }

            this.setData({
                days: days
            });
        },
        getMultipleDayType: function (day) {
            var currentDate = this.currentDate;

            if (!Array.isArray(currentDate)) {
                return '';
            }

            var isSelected = function (date) {
                return currentDate.some(function (item) {
                    return (0, utils_1.compareDay)(item, date) === 0;
                });
            };

            if (isSelected(day)) {
                var prevDay = (0, utils_1.getPrevDay)(day);
                var nextDay = (0, utils_1.getNextDay)(day);
                var prevSelected = isSelected(prevDay);
                var nextSelected = isSelected(nextDay);

                if (prevSelected && nextSelected) {
                    return 'multiple-middle';
                }

                if (prevSelected) {
                    return 'end';
                }

                return nextSelected ? 'start' : 'multiple-selected';
            }

            return '';
        },
        getRangeDayType: function (day) {
            var _a = this;
            var currentDate = _a.currentDate;
            var allowSameDay = _a.allowSameDay;
            if (!Array.isArray(currentDate)) {
                return '';
            }

            var startDay = currentDate[0];
            var endDay = currentDate[1];
            if (!startDay) {
                return '';
            }

            var compareToStart = (0, utils_1.compareDay)(day, startDay);

            if (!endDay) {
                return compareToStart === 0 ? 'start' : '';
            }

            var compareToEnd = (0, utils_1.compareDay)(day, endDay);

            if (compareToStart === 0 && compareToEnd === 0 && allowSameDay) {
                return 'start-end';
            }

            if (compareToStart === 0) {
                return 'start';
            }

            if (compareToEnd === 0) {
                return 'end';
            }

            if (compareToStart > 0 && compareToEnd < 0) {
                return 'middle';
            }

            return '';
        },
        getDayType: function (day) {
            var _a = this;
            var type = _a.type;
            var minDate = _a.minDate;
            var maxDate = _a.maxDate;
            var currentDate = _a.currentDate;
            if ((0, utils_1.compareDay)(day, minDate) < 0 || (0, utils_1.compareDay)(day, maxDate) > 0) {
                return 'disabled';
            }

            if (type === 'single') {
                return (0, utils_1.compareDay)(day, currentDate) === 0 ? 'selected' : '';
            }

            if (type === 'multiple') {
                return this.getMultipleDayType(day);
            }
            /* istanbul ignore else */

            if (type === 'range') {
                return this.getRangeDayType(day);
            }

            return '';
        },
        getBottomInfo: function (type) {
            if (this.type === 'range') {
                if (type === 'start') {
                    return '开始';
                }

                if (type === 'end') {
                    return '结束';
                }

                if (type === 'start-end') {
                    return '开始/结束';
                }
            }
        }
    },
    watch: {
        date: {
            handler: function () {
                var days = [];
                var startDate = new Date(this.date);
                var year = startDate.getFullYear();
                var month = startDate.getMonth();
                var totalDay = (0, utils_1.getMonthEndDay)(startDate.getFullYear(), startDate.getMonth() + 1);

                for (var day = 1; day <= totalDay; day++) {
                    var date = new Date(year, month, day);
                    var type = this.getDayType(date);
                    var config = {
                        date: date,
                        type: type,
                        text: day,
                        bottomInfo: this.getBottomInfo(type)
                    };

                    if (this.formatter) {
                        config = this.formatter(config);
                    }

                    days.push(config);
                }

                this.setData({
                    days: days
                });
            },

            immediate: true
        },

        type: {
            handler: function () {
                var days = [];
                var startDate = new Date(this.date);
                var year = startDate.getFullYear();
                var month = startDate.getMonth();
                var totalDay = (0, utils_1.getMonthEndDay)(startDate.getFullYear(), startDate.getMonth() + 1);

                for (var day = 1; day <= totalDay; day++) {
                    var date = new Date(year, month, day);
                    var type = this.getDayType(date);
                    var config = {
                        date: date,
                        type: type,
                        text: day,
                        bottomInfo: this.getBottomInfo(type)
                    };

                    if (this.formatter) {
                        config = this.formatter(config);
                    }

                    days.push(config);
                }

                this.setData({
                    days: days
                });
            },

            immediate: true
        },

        minDate: {
            handler: function () {
                var days = [];
                var startDate = new Date(this.date);
                var year = startDate.getFullYear();
                var month = startDate.getMonth();
                var totalDay = (0, utils_1.getMonthEndDay)(startDate.getFullYear(), startDate.getMonth() + 1);

                for (var day = 1; day <= totalDay; day++) {
                    var date = new Date(year, month, day);
                    var type = this.getDayType(date);
                    var config = {
                        date: date,
                        type: type,
                        text: day,
                        bottomInfo: this.getBottomInfo(type)
                    };

                    if (this.formatter) {
                        config = this.formatter(config);
                    }

                    days.push(config);
                }

                this.setData({
                    days: days
                });
            },

            immediate: true
        },

        maxDate: {
            handler: function () {
                var days = [];
                var startDate = new Date(this.date);
                var year = startDate.getFullYear();
                var month = startDate.getMonth();
                var totalDay = (0, utils_1.getMonthEndDay)(startDate.getFullYear(), startDate.getMonth() + 1);

                for (var day = 1; day <= totalDay; day++) {
                    var date = new Date(year, month, day);
                    var type = this.getDayType(date);
                    var config = {
                        date: date,
                        type: type,
                        text: day,
                        bottomInfo: this.getBottomInfo(type)
                    };

                    if (this.formatter) {
                        config = this.formatter(config);
                    }

                    days.push(config);
                }

                this.setData({
                    days: days
                });
            },

            immediate: true
        },

        formatter: {
            handler: function () {
                var days = [];
                var startDate = new Date(this.date);
                var year = startDate.getFullYear();
                var month = startDate.getMonth();
                var totalDay = (0, utils_1.getMonthEndDay)(startDate.getFullYear(), startDate.getMonth() + 1);

                for (var day = 1; day <= totalDay; day++) {
                    var date = new Date(year, month, day);
                    var type = this.getDayType(date);
                    var config = {
                        date: date,
                        type: type,
                        text: day,
                        bottomInfo: this.getBottomInfo(type)
                    };

                    if (this.formatter) {
                        config = this.formatter(config);
                    }

                    days.push(config);
                }

                this.setData({
                    days: days
                });
            },

            immediate: true
        },

        currentDate: {
            handler: function () {
                var days = [];
                var startDate = new Date(this.date);
                var year = startDate.getFullYear();
                var month = startDate.getMonth();
                var totalDay = (0, utils_1.getMonthEndDay)(startDate.getFullYear(), startDate.getMonth() + 1);

                for (var day = 1; day <= totalDay; day++) {
                    var date = new Date(year, month, day);
                    var type = this.getDayType(date);
                    var config = {
                        date: date,
                        type: type,
                        text: day,
                        bottomInfo: this.getBottomInfo(type)
                    };

                    if (this.formatter) {
                        config = this.formatter(config);
                    }

                    days.push(config);
                }

                this.setData({
                    days: days
                });
            },

            immediate: true
        },

        firstDayOfWeek: {
            handler: function () {
                var days = [];
                var startDate = new Date(this.date);
                var year = startDate.getFullYear();
                var month = startDate.getMonth();
                var totalDay = (0, utils_1.getMonthEndDay)(startDate.getFullYear(), startDate.getMonth() + 1);

                for (var day = 1; day <= totalDay; day++) {
                    var date = new Date(year, month, day);
                    var type = this.getDayType(date);
                    var config = {
                        date: date,
                        type: type,
                        text: day,
                        bottomInfo: this.getBottomInfo(type)
                    };

                    if (this.formatter) {
                        config = this.formatter(config);
                    }

                    days.push(config);
                }

                this.setData({
                    days: days
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
