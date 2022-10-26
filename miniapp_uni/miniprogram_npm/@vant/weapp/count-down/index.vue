<template>
    <view class="van-count-down">
        <slot v-if="useSlot" />
        <block v-else>{{ formattedTime }}</block>
    </view>
</template>

<script>
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

var utils_1 = require('./utils');

function simpleTick(fn) {
    return setTimeout(fn, 30);
}

export default {
    data() {
        return {
            timeData: (0, utils_1.parseTimeData)(0),
            formattedTime: '0'
        };
    },
    props: {
        useSlot: Boolean,
        millisecond: Boolean,
        time: {
            type: Number
        },
        format: {
            type: String,
            default: 'HH:mm:ss'
        },
        autoStart: {
            type: Boolean,
            default: true
        }
    },
    destroyed: function () {
        clearTimeout(this.tid);
        this.tid = null;
    },
    methods: {
        // 开始
        start: function () {
            if (this.counting) {
                return;
            }

            this.counting = true;
            this.endTime = Date.now() + this.remain;
            this.tick();
        },
        // 暂停
        pause: function () {
            this.counting = false;
            clearTimeout(this.tid);
        },
        // 重置
        reset: function () {
            this.pause();
            this.remain = this.time;
            this.setRemain(this.remain);

            if (this.autoStart) {
                this.start();
            }
        },
        tick: function () {
            if (this.millisecond) {
                this.microTick();
            } else {
                this.macroTick();
            }
        },
        microTick: function () {
            var that = this;
            this.tid = simpleTick(function () {
                that.setRemain(that.getRemain());

                if (that.remain !== 0) {
                    that.microTick();
                }
            });
        },
        macroTick: function () {
            var that = this;
            this.tid = simpleTick(function () {
                var remain = that.getRemain();

                if (!(0, utils_1.isSameSecond)(remain, that.remain) || remain === 0) {
                    that.setRemain(remain);
                }

                if (that.remain !== 0) {
                    that.macroTick();
                }
            });
        },
        getRemain: function () {
            return Math.max(this.endTime - Date.now(), 0);
        },
        setRemain: function (remain) {
            this.remain = remain;
            var timeData = (0, utils_1.parseTimeData)(remain);

            if (this.useSlot) {
                this.$emit('change', timeData);
            }

            this.setData({
                formattedTime: (0, utils_1.parseFormat)(this.format, timeData)
            });

            if (remain === 0) {
                this.pause();
                this.$emit('finish');
            }
        }
    },
    watch: {
        time: {
            handler: function () {
                this.pause();
                this.remain = this.time;
                this.setRemain(this.remain);

                if (this.autoStart) {
                    this.start();
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
