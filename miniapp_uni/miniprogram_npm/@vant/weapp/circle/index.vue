<template>
    <view class="van-circle">
        <canvas class="van-circle__canvas" :type="type" :style="'width: ' + utils.addUnit(size) + ';height:' + utils.addUnit(size)" id="van-circle" canvas-id="van-circle"></canvas>
        <view v-if="!text" class="van-circle__text">
            <slot></slot>
        </view>
        <cover-view v-else class="van-circle__text">{{ text }}</cover-view>
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script>
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var color_1 = require('../common/color');

var component_1 = require('../common/component');

var utils_1 = require('../common/utils');

var validator_1 = require('../common/validator');

var version_1 = require('../common/version');

var canvas_1 = require('./canvas');

function format(rate) {
    return Math.min(Math.max(rate, 0), 100);
}

var PERIMETER = 2 * Math.PI;
var BEGIN_ANGLE = -Math.PI / 2;
var STEP = 1;
export default {
    data() {
        return {
            hoverColor: color_1.BLUE
        };
    },
    props: {
        text: String,
        lineCap: {
            type: String,
            default: 'round'
        },
        value: {
            type: Number,
            default: 0
        },
        speed: {
            type: Number,
            default: 50
        },
        size: {
            type: Number,
            default: 100
        },
        fill: String,
        layerColor: {
            type: String,
            default: color_1.WHITE
        },
        color: {
            type: null,
            default: color_1.BLUE
        },
        type: {
            type: String,
            default: ''
        },
        strokeWidth: {
            type: Number,
            default: 4
        },
        clockwise: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        getContext: function () {
            var that = this;
            var _a = this;
            var type = _a.type;
            var size = _a.size;
            if (type === '' || !(0, version_1.canIUseCanvas2d)()) {
                var ctx = uni.createCanvasContext('van-circle', this);
                return Promise.resolve(ctx);
            }

            var dpr = (0, utils_1.getSystemInfoSync)().pixelRatio;
            return new Promise(function (resolve) {
                uni.createSelectorQuery()
                    .in(that)
                    .select('#van-circle')
                    .node()
                    .exec(function (res) {
                        var canvas = res[0].node;
                        var ctx = canvas.getContext(type);

                        if (!that.inited) {
                            that.inited = true;
                            canvas.width = size * dpr;
                            canvas.height = size * dpr;
                            ctx.scale(dpr, dpr);
                        }

                        resolve((0, canvas_1.adaptor)(ctx));
                    });
            });
        },
        setHoverColor: function () {
            var that = this;
            var _a = this;
            var color = _a.color;
            var size = _a.size;
            if ((0, validator_1.isObj)(color)) {
                return this.getContext().then(function (context) {
                    var LinearColor = context.createLinearGradient(size, 0, 0, 0);
                    Object.keys(color)
                        .sort(function (a, b) {
                            return parseFloat(a) - parseFloat(b);
                        })
                        .map(function (key) {
                            return LinearColor.addColorStop(parseFloat(key) / 100, color[key]);
                        });
                    that.hoverColor = LinearColor;
                });
            }

            this.hoverColor = color;
            return Promise.resolve();
        },
        presetCanvas: function (context, strokeStyle, beginAngle, endAngle, fill) {
            var _a = this;
            var strokeWidth = _a.strokeWidth;
            var lineCap = _a.lineCap;
            var clockwise = _a.clockwise;
            var size = _a.size;
            var position = size / 2;
            var radius = position - strokeWidth / 2;
            context.setStrokeStyle(strokeStyle);
            context.setLineWidth(strokeWidth);
            context.setLineCap(lineCap);
            context.beginPath();
            context.arc(position, position, radius, beginAngle, endAngle, !clockwise);
            context.stroke();

            if (fill) {
                context.setFillStyle(fill);
                context.fill();
            }
        },
        renderLayerCircle: function (context) {
            var _a = this;
            var layerColor = _a.layerColor;
            var fill = _a.fill;
            this.presetCanvas(context, layerColor, 0, PERIMETER, fill);
        },
        renderHoverCircle: function (context, formatValue) {
            var clockwise = this.clockwise; // 结束角度

            var progress = PERIMETER * (formatValue / 100);
            var endAngle = clockwise ? BEGIN_ANGLE + progress : 3 * Math.PI - (BEGIN_ANGLE + progress);
            this.presetCanvas(context, this.hoverColor, BEGIN_ANGLE, endAngle);
        },
        drawCircle: function (currentValue) {
            var that = this;
            var size = this.size;
            this.getContext().then(function (context) {
                context.clearRect(0, 0, size, size);
                that.renderLayerCircle(context);
                var formatValue = format(currentValue);

                if (formatValue !== 0) {
                    that.renderHoverCircle(context, formatValue);
                }

                context.draw();
            });
        },
        reRender: function () {
            var that = this; // tofector 动画暂时没有想到好的解决方案

            var _a = this;
            var value = _a.value;
            var speed = _a.speed;
            if (speed <= 0 || speed > 1000) {
                this.drawCircle(value);
                return;
            }

            this.clearMockInterval();
            this.currentValue = this.currentValue || 0;

            var run = function () {
                that.interval = setTimeout(function () {
                    if (that.currentValue !== value) {
                        if (Math.abs(that.currentValue - value) < STEP) {
                            that.currentValue = value;
                        } else if (that.currentValue < value) {
                            that.currentValue += STEP;
                        } else {
                            that.currentValue -= STEP;
                        }

                        that.drawCircle(that.currentValue);
                        run();
                    } else {
                        that.clearMockInterval();
                    }
                }, 1000 / speed);
            };

            run();
        },
        clearMockInterval: function () {
            if (this.interval) {
                clearTimeout(this.interval);
                this.interval = null;
            }
        }
    },
    mounted: function () {
        var that = this;
        this.currentValue = this.value;
        this.setHoverColor().then(function () {
            that.drawCircle(that.currentValue);
        });
    },
    destroyed: function () {
        this.clearMockInterval();
    },
    watch: {
        value: {
            handler: function () {
                var that = this; // tofector 动画暂时没有想到好的解决方案

                var _a = this;
                var value = _a.value;
                var speed = _a.speed;
                if (speed <= 0 || speed > 1000) {
                    this.drawCircle(value);
                    return;
                }

                this.clearMockInterval();
                this.currentValue = this.currentValue || 0;

                var run = function () {
                    that.interval = setTimeout(function () {
                        if (that.currentValue !== value) {
                            if (Math.abs(that.currentValue - value) < STEP) {
                                that.currentValue = value;
                            } else if (that.currentValue < value) {
                                that.currentValue += STEP;
                            } else {
                                that.currentValue -= STEP;
                            }

                            that.drawCircle(that.currentValue);
                            run();
                        } else {
                            that.clearMockInterval();
                        }
                    }, 1000 / speed);
                };

                run();
            },

            immediate: true
        },

        size: {
            handler: function () {
                this.drawCircle(this.currentValue);
            },

            immediate: true
        },

        color: {
            handler: function () {
                var that = this;
                this.setHoverColor().then(function () {
                    that.drawCircle(that.currentValue);
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
