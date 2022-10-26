<template>
    <view class="custom-class van-sticky" :style="computed.containerStyle({ fixed, height, zIndex })">
        <view :class="utils.bem('sticky-wrap', { fixed })" :style="computed.wrapStyle({ fixed, offsetTop, transform, zIndex })">
            <slot />
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

var utils_1 = require('../common/utils');

var component_1 = require('../common/component');

var validator_1 = require('../common/validator');

var page_scroll_1 = require('../mixins/page-scroll');

var ROOT_ELEMENT = '.van-sticky';
export default {
    data() {
        return {
            height: 0,
            fixed: false,
            transform: 0
        };
    },
    props: {
        zIndex: {
            type: Number,
            default: 99
        },
        offsetTop: {
            type: Number,
            default: 0
        },
        disabled: {
            type: Boolean
        },
        container: {
            type: null
        },
        scrollTop: {
            type: null
        }
    },
    mixins: [
        (0, page_scroll_1.pageScrollMixin)(function (event) {
            if (this.scrollTop != null) {
                return;
            }

            this.onScroll(event);
        })
    ],
    mounted: function () {
        this.onScroll();
    },
    methods: {
        onScroll: function (_a) {
            var that = this;

            var _b = _a === void 0 ? {} : _a;

            var scrollTop = _b.scrollTop;
            var _c = this;
            var container = _c.container;
            var offsetTop = _c.offsetTop;
            var disabled = _c.disabled;
            if (disabled) {
                this.setDataAfterDiff({
                    fixed: false,
                    transform: 0
                });
                return;
            }

            this.scrollTop = scrollTop || this.scrollTop;

            if (typeof container === 'function') {
                Promise.all([(0, utils_1.getRect)(this, ROOT_ELEMENT), this.getContainerRect()]).then(function (_a) {
                    var root = _a[0];
                    var container = _a[1];
                    if (offsetTop + root.height > container.height + container.top) {
                        that.setDataAfterDiff({
                            fixed: false,
                            transform: container.height - root.height
                        });
                    } else if (offsetTop >= root.top) {
                        that.setDataAfterDiff({
                            fixed: true,
                            height: root.height,
                            transform: 0
                        });
                    } else {
                        that.setDataAfterDiff({
                            fixed: false,
                            transform: 0
                        });
                    }
                });
                return;
            }

            (0, utils_1.getRect)(this, ROOT_ELEMENT).then(function (root) {
                if (!(0, validator_1.isDef)(root)) {
                    return;
                }

                if (offsetTop >= root.top) {
                    that.setDataAfterDiff({
                        fixed: true,
                        height: root.height
                    });
                    that.transform = 0;
                } else {
                    that.setDataAfterDiff({
                        fixed: false
                    });
                }
            });
        },
        setDataAfterDiff: function (data) {
            var that = this;
            uni.nextTick(function () {
                var diff = Object.keys(data).reduce(function (prev, key) {
                    if (data[key] !== that[key]) {
                        prev[key] = data[key];
                    }

                    return prev;
                }, {});

                if (Object.keys(diff).length > 0) {
                    that.setData(diff);
                }

                that.$emit('scroll', {
                    scrollTop: that.scrollTop,
                    isFixed: data.fixed || that.fixed
                });
            });
        },
        getContainerRect: function () {
            var nodesRef = this.container();
            return new Promise(function (resolve) {
                return nodesRef.boundingClientRect(resolve).exec();
            });
        }
    },
    watch: {
        offsetTop: {
            handler: function (_a) {
                var that = this;

                var _b = _a === void 0 ? {} : _a;

                var scrollTop = _b.scrollTop;
                var _c = this;
                var container = _c.container;
                var offsetTop = _c.offsetTop;
                var disabled = _c.disabled;
                if (disabled) {
                    this.setDataAfterDiff({
                        fixed: false,
                        transform: 0
                    });
                    return;
                }

                this.scrollTop = scrollTop || this.scrollTop;

                if (typeof container === 'function') {
                    Promise.all([(0, utils_1.getRect)(this, ROOT_ELEMENT), this.getContainerRect()]).then(function (_a) {
                        var root = _a[0];
                        var container = _a[1];
                        if (offsetTop + root.height > container.height + container.top) {
                            that.setDataAfterDiff({
                                fixed: false,
                                transform: container.height - root.height
                            });
                        } else if (offsetTop >= root.top) {
                            that.setDataAfterDiff({
                                fixed: true,
                                height: root.height,
                                transform: 0
                            });
                        } else {
                            that.setDataAfterDiff({
                                fixed: false,
                                transform: 0
                            });
                        }
                    });
                    return;
                }

                (0, utils_1.getRect)(this, ROOT_ELEMENT).then(function (root) {
                    if (!(0, validator_1.isDef)(root)) {
                        return;
                    }

                    if (offsetTop >= root.top) {
                        that.setDataAfterDiff({
                            fixed: true,
                            height: root.height
                        });
                        that.transform = 0;
                    } else {
                        that.setDataAfterDiff({
                            fixed: false
                        });
                    }
                });
            },

            immediate: true
        },

        disabled: {
            handler: function (_a) {
                var that = this;

                var _b = _a === void 0 ? {} : _a;

                var scrollTop = _b.scrollTop;
                var _c = this;
                var container = _c.container;
                var offsetTop = _c.offsetTop;
                var disabled = _c.disabled;
                if (disabled) {
                    this.setDataAfterDiff({
                        fixed: false,
                        transform: 0
                    });
                    return;
                }

                this.scrollTop = scrollTop || this.scrollTop;

                if (typeof container === 'function') {
                    Promise.all([(0, utils_1.getRect)(this, ROOT_ELEMENT), this.getContainerRect()]).then(function (_a) {
                        var root = _a[0];
                        var container = _a[1];
                        if (offsetTop + root.height > container.height + container.top) {
                            that.setDataAfterDiff({
                                fixed: false,
                                transform: container.height - root.height
                            });
                        } else if (offsetTop >= root.top) {
                            that.setDataAfterDiff({
                                fixed: true,
                                height: root.height,
                                transform: 0
                            });
                        } else {
                            that.setDataAfterDiff({
                                fixed: false,
                                transform: 0
                            });
                        }
                    });
                    return;
                }

                (0, utils_1.getRect)(this, ROOT_ELEMENT).then(function (root) {
                    if (!(0, validator_1.isDef)(root)) {
                        return;
                    }

                    if (offsetTop >= root.top) {
                        that.setDataAfterDiff({
                            fixed: true,
                            height: root.height
                        });
                        that.transform = 0;
                    } else {
                        that.setDataAfterDiff({
                            fixed: false
                        });
                    }
                });
            },

            immediate: true
        },

        container: {
            handler: function (_a) {
                var that = this;

                var _b = _a === void 0 ? {} : _a;

                var scrollTop = _b.scrollTop;
                var _c = this;
                var container = _c.container;
                var offsetTop = _c.offsetTop;
                var disabled = _c.disabled;
                if (disabled) {
                    this.setDataAfterDiff({
                        fixed: false,
                        transform: 0
                    });
                    return;
                }

                this.scrollTop = scrollTop || this.scrollTop;

                if (typeof container === 'function') {
                    Promise.all([(0, utils_1.getRect)(this, ROOT_ELEMENT), this.getContainerRect()]).then(function (_a) {
                        var root = _a[0];
                        var container = _a[1];
                        if (offsetTop + root.height > container.height + container.top) {
                            that.setDataAfterDiff({
                                fixed: false,
                                transform: container.height - root.height
                            });
                        } else if (offsetTop >= root.top) {
                            that.setDataAfterDiff({
                                fixed: true,
                                height: root.height,
                                transform: 0
                            });
                        } else {
                            that.setDataAfterDiff({
                                fixed: false,
                                transform: 0
                            });
                        }
                    });
                    return;
                }

                (0, utils_1.getRect)(this, ROOT_ELEMENT).then(function (root) {
                    if (!(0, validator_1.isDef)(root)) {
                        return;
                    }

                    if (offsetTop >= root.top) {
                        that.setDataAfterDiff({
                            fixed: true,
                            height: root.height
                        });
                        that.transform = 0;
                    } else {
                        that.setDataAfterDiff({
                            fixed: false
                        });
                    }
                });
            },

            immediate: true
        },

        scrollTop: {
            handler: function (val) {
                this.onScroll({
                    scrollTop: val
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
