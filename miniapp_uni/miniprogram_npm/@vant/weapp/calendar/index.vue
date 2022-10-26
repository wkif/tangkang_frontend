<template>
    <view>
        <van-popup
            v-if="poppable"
            :custom-class="'van-calendar__popup--' + position"
            close-icon-class="van-calendar__close-icon"
            :show="show"
            :round="round"
            :position="position"
            :closeable="showTitle || showSubtitle"
            :close-on-click-overlay="closeOnClickOverlay"
            @enter="onOpen"
            @close="onClose"
            @after-enter="onOpened"
            @after-leave="onClosed"
        >
            <!-- parse <include src="./calendar.wxml"/> -->
            <view class="van-calendar">
                <header :title="title" :showTitle="showTitle" :subtitle="subtitle" :showSubtitle="showSubtitle" :firstDayOfWeek="firstDayOfWeek" @click-subtitle="onClickSubtitle">
                    <slot name="title" slot="title"></slot>
                </header>

                <scroll-view class="van-calendar__body" scroll-y :scroll-into-view="scrollIntoView">
                    <month
                        :id="'month' + index"
                        class="month"
                        :data-date="item"
                        :date="item"
                        :type="type"
                        :color="color"
                        :minDate="minDate"
                        :maxDate="maxDate"
                        :showMark="showMark"
                        :formatter="formatter"
                        :rowHeight="rowHeight"
                        :currentDate="currentDate"
                        :showSubtitle="showSubtitle"
                        :allowSameDay="allowSameDay"
                        :showMonthTitle="index !== 0 || !showSubtitle"
                        :firstDayOfWeek="firstDayOfWeek"
                        @click="onClickDay($event, { date: item, tagId: 'month' + index })"
                        v-for="(item, index) in computed.getMonths(minDate, maxDate)"
                        :key="index"
                    ></month>
                </scroll-view>

                <view :class="utils.bem('calendar__footer', { safeAreaInsetBottom })">
                    <slot name="footer"></slot>
                </view>

                <view :class="utils.bem('calendar__footer', { safeAreaInsetBottom })">
                    <van-button
                        v-if="showConfirm"
                        round
                        block
                        type="danger"
                        :color="color"
                        custom-class="van-calendar__confirm"
                        :disabled="computed.getButtonDisabled(type, currentDate)"
                        nativeType="text"
                        @click="onConfirm"
                    >
                        {{ computed.getButtonDisabled(type, currentDate) ? confirmDisabledText : confirmText }}
                    </van-button>
                </view>
            </view>
        </van-popup>

        <!-- parse <include v-else src="./calendar.wxml"/> -->
        <view class="van-calendar">
            <header :title="title" :showTitle="showTitle" :subtitle="subtitle" :showSubtitle="showSubtitle" :firstDayOfWeek="firstDayOfWeek" @click-subtitle="onClickSubtitle">
                <slot name="title" slot="title"></slot>
            </header>

            <scroll-view class="van-calendar__body" scroll-y :scroll-into-view="scrollIntoView">
                <month
                    :id="'month' + index"
                    class="month"
                    :data-date="item"
                    :date="item"
                    :type="type"
                    :color="color"
                    :minDate="minDate"
                    :maxDate="maxDate"
                    :showMark="showMark"
                    :formatter="formatter"
                    :rowHeight="rowHeight"
                    :currentDate="currentDate"
                    :showSubtitle="showSubtitle"
                    :allowSameDay="allowSameDay"
                    :showMonthTitle="index !== 0 || !showSubtitle"
                    :firstDayOfWeek="firstDayOfWeek"
                    @click="onClickDay($event, { date: item, tagId: 'month' + index })"
                    v-for="(item, index) in computed.getMonths(minDate, maxDate)"
                    :key="index"
                ></month>
            </scroll-view>

            <view :class="utils.bem('calendar__footer', { safeAreaInsetBottom })">
                <slot name="footer"></slot>
            </view>

            <view :class="utils.bem('calendar__footer', { safeAreaInsetBottom })">
                <van-button
                    v-if="showConfirm"
                    round
                    block
                    type="danger"
                    :color="color"
                    custom-class="van-calendar__confirm"
                    :disabled="computed.getButtonDisabled(type, currentDate)"
                    nativeType="text"
                    @click="onConfirm"
                >
                    {{ computed.getButtonDisabled(type, currentDate) ? confirmDisabledText : confirmText }}
                </van-button>
            </view>
        </view>

        <van-toast id="van-toast" />
    </view>
</template>
<script module="computed" lang="wxs" src="./index.wxs"></script>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script>
'use strict';
import header from './components/header/index';
import month from './components/month/index';
import vanButton from '../button/index';
import vanPopup from '../popup/index';
import vanToast from '../toast/index';

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

var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule
            ? mod
            : {
                  default: mod
              };
    };

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

var utils_1 = require('./utils');

var toast_1 = __importDefault(require('../toast/toast'));

var utils_2 = require('../common/utils');

var initialMinDate = (0, utils_1.getToday)().getTime();

var initialMaxDate = (function () {
    var now = (0, utils_1.getToday)();
    return new Date(now.getFullYear(), now.getMonth() + 6, now.getDate()).getTime();
})();

var getTime = function (date) {
    return date instanceof Date ? date.getTime() : date;
};

export default {
    components: {
        header,
        month,
        vanButton,
        vanPopup,
        vanToast
    },
    data() {
        return {
            subtitle: '',
            currentDate: null,
            scrollIntoView: ''
        };
    },
    props: {
        title: {
            type: String,
            default: '日期选择'
        },
        color: String,
        show: {
            type: Boolean
        },
        formatter: null,
        confirmText: {
            type: String,
            default: '确定'
        },
        confirmDisabledText: {
            type: String,
            default: '确定'
        },
        rangePrompt: String,
        showRangePrompt: {
            type: Boolean,
            default: true
        },
        defaultDate: {
            type: null
        },
        allowSameDay: Boolean,
        type: {
            type: String,
            default: 'single'
        },
        minDate: {
            type: Number,
            default: initialMinDate
        },
        maxDate: {
            type: Number,
            default: initialMaxDate
        },
        position: {
            type: String,
            default: 'bottom'
        },
        rowHeight: {
            type: null,
            default: utils_1.ROW_HEIGHT
        },
        round: {
            type: Boolean,
            default: true
        },
        poppable: {
            type: Boolean,
            default: true
        },
        showMark: {
            type: Boolean,
            default: true
        },
        showTitle: {
            type: Boolean,
            default: true
        },
        showConfirm: {
            type: Boolean,
            default: true
        },
        showSubtitle: {
            type: Boolean,
            default: true
        },
        safeAreaInsetBottom: {
            type: Boolean,
            default: true
        },
        closeOnClickOverlay: {
            type: Boolean,
            default: true
        },
        maxRange: {
            type: null,
            default: null
        },
        firstDayOfWeek: {
            type: Number,
            default: 0
        },
        readonly: Boolean
    },
    created: function () {
        this.setData({
            currentDate: this.getInitialDate(this.defaultDate)
        });
    },
    mounted: function () {
        if (this.show || !this.poppable) {
            this.initRect();
            this.scrollIntoViewFun();
        }
    },
    methods: {
        reset: function () {
            this.setData({
                currentDate: this.getInitialDate()
            });
            this.scrollIntoViewFun();
        },
        initRect: function () {
            var that = this;

            if (this.contentObserver != null) {
                this.contentObserver.disconnect();
            }

            var contentObserver = this.createIntersectionObserver({
                thresholds: [0, 0.1, 0.9, 1],
                observeAll: true
            });
            this.contentObserver = contentObserver;
            contentObserver.relativeTo('.van-calendar__body');
            contentObserver.observe('.month', function (res) {
                if (res.boundingClientRect.top <= res.relativeRect.top) {
                    // @ts-ignore
                    that.setData({
                        subtitle: (0, utils_1.formatMonthTitle)(res.dataset.date)
                    });
                }
            });
        },
        limitDateRange: function (date, minDate, maxDate) {
            if (minDate === void 0) {
                minDate = null;
            }

            if (maxDate === void 0) {
                maxDate = null;
            }

            minDate = minDate || this.minDate;
            maxDate = maxDate || this.maxDate;

            if ((0, utils_1.compareDay)(date, minDate) === -1) {
                return minDate;
            }

            if ((0, utils_1.compareDay)(date, maxDate) === 1) {
                return maxDate;
            }

            return date;
        },
        getInitialDate: function (defaultDate) {
            var that = this;

            if (defaultDate === void 0) {
                defaultDate = null;
            }

            var _a = this;
            var type = _a.type;
            var minDate = _a.minDate;
            var maxDate = _a.maxDate;
            var now = (0, utils_1.getToday)().getTime();

            if (type === 'range') {
                if (!Array.isArray(defaultDate)) {
                    defaultDate = [];
                }

                var _b = defaultDate || [];

                var startDay = _b[0];
                var endDay = _b[1];
                var start = this.limitDateRange(startDay || now, minDate, (0, utils_1.getPrevDay)(new Date(maxDate)).getTime());
                var end = this.limitDateRange(endDay || now, (0, utils_1.getNextDay)(new Date(minDate)).getTime());
                return [start, end];
            }

            if (type === 'multiple') {
                if (Array.isArray(defaultDate)) {
                    return defaultDate.map(function (date) {
                        return that.limitDateRange(date);
                    });
                }

                return [this.limitDateRange(now)];
            }

            if (!defaultDate || Array.isArray(defaultDate)) {
                defaultDate = now;
            }

            return this.limitDateRange(defaultDate);
        },
        scrollIntoViewFun: function () {
            var that = this;
            (0, utils_2.requestAnimationFrame)(function () {
                var _a = that;
                var currentDate = _a.currentDate;
                var type = _a.type;
                var show = _a.show;
                var poppable = _a.poppable;
                var minDate = _a.minDate;
                var maxDate = _a.maxDate; // @ts-ignore
                var targetDate = type === 'single' ? currentDate : currentDate[0];
                var displayed = show || !poppable;

                if (!targetDate || !displayed) {
                    return;
                }

                var months = (0, utils_1.getMonths)(minDate, maxDate);
                months.some(function (month, index) {
                    if ((0, utils_1.compareMonth)(month, targetDate) === 0) {
                        that.setData({
                            scrollIntoView: 'month'.concat(index)
                        });
                        return true;
                    }

                    return false;
                });
            });
        },
        onOpen: function () {
            this.$emit('open');
        },
        onOpened: function () {
            this.$emit('opened');
        },
        onClose: function () {
            this.$emit('close');
        },
        onClosed: function () {
            this.$emit('closed');
        },
        onClickDay: function (event, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(event, _dataset);
            /* ---处理dataset end--- */
            if (this.readonly) {
                return;
            }

            var date = event.detail.date;
            var _a = this;
            var type = _a.type;
            var currentDate = _a.currentDate;
            var allowSameDay = _a.allowSameDay;

            if (type === 'range') {
                var startDay_1 = currentDate[0];
                var endDay = currentDate[1];
                // @ts-ignore
                if (startDay_1 && !endDay) {
                    var compareToStart = (0, utils_1.compareDay)(date, startDay_1);

                    if (compareToStart === 1) {
                        var days_1 = this.$mp.page.selectComponent('.month').$vm.data.days;
                        days_1.some(function (day, index) {
                            var isDisabled = day.type === 'disabled' && getTime(startDay_1) < getTime(day.date) && getTime(day.date) < getTime(date);

                            if (isDisabled) {
                                date = days_1[index - 1].date;
                            }

                            return isDisabled;
                        });
                        this.select([startDay_1, date], true);
                    } else if (compareToStart === -1) {
                        this.select([date, null]);
                    } else if (allowSameDay) {
                        this.select([date, date]);
                    }
                } else {
                    this.select([date, null]);
                }
            } else if (type === 'multiple') {
                var selectedIndex_1; // @ts-ignore

                var selected = currentDate.some(function (dateItem, index) {
                    var equal = (0, utils_1.compareDay)(dateItem, date) === 0;

                    if (equal) {
                        selectedIndex_1 = index;
                    }

                    return equal;
                });

                if (selected) {
                    // @ts-ignore
                    var cancelDate = currentDate.splice(selectedIndex_1, 1);
                    this.setData({
                        currentDate: currentDate
                    });
                    this.unselect(cancelDate);
                } else {
                    // @ts-ignore
                    this.select(__spreadArray(__spreadArray([], currentDate, true), [date], false));
                }
            } else {
                this.select(date, true);
            }
        },
        unselect: function (dateArray) {
            var date = dateArray[0];

            if (date) {
                this.$emit('unselect', (0, utils_1.copyDates)(date));
            }
        },
        select: function (date, complete) {
            if (complete && this.type === 'range') {
                var valid = this.checkRange(date);

                if (!valid) {
                    // auto selected to max range if showConfirm
                    if (this.showConfirm) {
                        this.emit([date[0], (0, utils_1.getDayByOffset)(date[0], this.maxRange - 1)]);
                    } else {
                        this.emit(date);
                    }

                    return;
                }
            }

            this.emit(date);

            if (complete && !this.showConfirm) {
                this.onConfirm();
            }
        },
        emit: function (date) {
            this.setData({
                currentDate: Array.isArray(date) ? date.map(getTime) : getTime(date)
            });
            this.$emit('select', (0, utils_1.copyDates)(date));
        },
        checkRange: function (date) {
            var _a = this;
            var maxRange = _a.maxRange;
            var rangePrompt = _a.rangePrompt;
            var showRangePrompt = _a.showRangePrompt;
            if (maxRange && (0, utils_1.calcDateNum)(date) > maxRange) {
                if (showRangePrompt) {
                    (0, toast_1.default)({
                        context: this,
                        message: rangePrompt || '\u9009\u62E9\u5929\u6570\u4E0D\u80FD\u8D85\u8FC7 '.concat(maxRange, ' \u5929')
                    });
                }

                this.$emit('over-range');
                return false;
            }

            return true;
        },
        onConfirm: function () {
            var that = this;

            if (this.type === 'range' && !this.checkRange(this.currentDate)) {
                return;
            }

            uni.nextTick(function () {
                // @ts-ignore
                that.$emit('confirm', (0, utils_1.copyDates)(that.currentDate));
            });
        },
        onClickSubtitle: function (event) {
            this.$emit('click-subtitle', event);
        }
    },
    watch: {
        show: {
            handler: function (val) {
                if (val) {
                    this.initRect();
                    this.scrollIntoViewFun();
                }
            },

            immediate: true
        },

        defaultDate: {
            handler: function (val) {
                this.setData({
                    currentDate: val
                });
                this.scrollIntoViewFun();
            },

            immediate: true
        },

        type: {
            handler: function () {
                this.setData({
                    currentDate: this.getInitialDate()
                });
                this.scrollIntoViewFun();
            },

            immediate: true
        }
    }
};
</script>
<style>
@import './index.css';
</style>
