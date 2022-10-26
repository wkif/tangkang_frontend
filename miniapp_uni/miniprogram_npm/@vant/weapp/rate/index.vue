<template>
    <view :class="utils.bem('rate') + ' custom-class'" @touchmove="onTouchMove">
        <view
            :class="utils.bem('rate__item')"
            :style="style({ paddingRight: index !== count - 1 ? utils.addUnit(gutter) : null })"
            v-for="(item, index) in innerCountArray"
            :key="index"
        >
            <van-icon
                :name="index + 1 <= innerValue ? icon : voidIcon"
                :class="utils.bem('rate__icon', [{ disabled, full: index + 1 <= innerValue }])"
                :style="style({ fontSize: utils.addUnit(size) })"
                custom-class="icon-class"
                :data-score="index"
                :color="disabled ? disabledColor : index + 1 <= innerValue ? color : voidColor"
                @click="onSelect($event, { score: index })"
            />

            <van-icon
                v-if="allowHalf"
                :name="index + 0.5 <= innerValue ? icon : voidIcon"
                :class="utils.bem('rate__icon', ['half', { disabled, full: index + 0.5 <= innerValue }])"
                :style="style({ fontSize: utils.addUnit(size) })"
                custom-class="icon-class"
                :data-score="index - 0.5"
                :color="disabled ? disabledColor : index + 0.5 <= innerValue ? color : voidColor"
                @click="onSelect($event, { score: index - 0.5 })"
            />
        </view>
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script module="style" lang="wxs" src="../wxs/style.wxs"></script>
<script>
'use strict';
import vanIcon from '../icon/index';

var __assign =
    (this && this.__assign) ||
    function () {
        __assign =
            Object.assign ||
            function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];

                    for (var p in s) {
                        if (Object.prototype.hasOwnProperty.call(s, p)) {
                            t[p] = s[p];
                        }
                    }
                }

                return t;
            };

        return __assign.apply(this, arguments);
    };

Object.defineProperty(exports, '__esModule', {
    value: true
});

var utils_1 = require('../common/utils');

var component_1 = require('../common/component');

var version_1 = require('../common/version');

export default {
    components: {
        vanIcon
    },
    data() {
        return {
            innerValue: 0,

            innerCountArray: Array.from({
                length: 5
            }),

            valueClone: 0
        };
    },
    field: true,
    classes: ['icon-class'],
    props: {
        value: {
            type: Number
        },
        readonly: Boolean,
        disabled: Boolean,
        allowHalf: Boolean,
        size: null,
        icon: {
            type: String,
            default: 'star'
        },
        voidIcon: {
            type: String,
            default: 'star-o'
        },
        color: String,
        voidColor: String,
        disabledColor: String,
        count: {
            type: Number,
            default: 5
        },
        gutter: null,
        touchable: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        onSelect: function (event, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(event, _dataset);
            /* ---处理dataset end--- */
            var that = this;
            var data = this;
            var score = event.currentTarget.dataset.score;

            if (!data.disabled && !data.readonly) {
                this.setData({
                    innerValue: score + 1
                });

                if ((0, version_1.canIUseModel)()) {
                    this.setData({
                        valueClone: score + 1
                    });
                }

                uni.nextTick(function () {
                    that.$emit('input', score + 1);
                    that.$emit('change', score + 1);
                });
            }
        },
        onTouchMove: function (event) {
            var that = this;
            var touchable = this.touchable;

            if (!touchable) {
                return;
            }

            var clientX = event.touches[0].clientX;
            (0, utils_1.getAllRect)(this, '.van-rate__icon').then(function (list) {
                var target = list
                    .sort(function (cur, next) {
                        return cur.dataset.score - next.dataset.score;
                    })
                    .find(function (item) {
                        return clientX >= item.left && clientX <= item.right;
                    });

                if (target != null) {
                    that.onSelect(
                        __assign(__assign({}, event), {
                            currentTarget: target
                        })
                    );
                }
            });
        }
    },
    watch: {
        value: {
            handler: function (value) {
                this.valueClone = this.deepClone(this.value);
                if (value !== this.innerValue) {
                    this.setData({
                        innerValue: value
                    });
                }
            },

            immediate: true
        },

        count: {
            handler: function (value) {
                this.setData({
                    innerCountArray: Array.from({
                        length: value
                    })
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
