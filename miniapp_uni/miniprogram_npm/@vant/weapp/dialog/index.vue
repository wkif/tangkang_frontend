<template>
    <view>
        <van-popup
            :show="showClone"
            :z-index="zIndex"
            :overlay="overlay"
            :transition="transition"
            :custom-class="'van-dialog van-dialog--' + theme + ' ' + className"
            :custom-style="'width: ' + utils.addUnit(width) + ';' + customStyle"
            :overlay-style="overlayStyle"
            :close-on-click-overlay="closeOnClickOverlay"
            @close="onClickOverlay"
        >
            <view v-if="title || useTitleSlot" :class="utils.bem('dialog__header', { isolated: !(message || useSlot) })">
                <slot v-if="useTitleSlot" name="title" />
                <block v-else-if="title">{{ title }}</block>
            </view>

            <slot v-if="useSlot" />
            <view v-else-if="message" :class="utils.bem('dialog__message', [theme, messageAlign, { hasTitle: title }])">
                <text class="van-dialog__message-text">{{ message }}</text>
            </view>

            <van-goods-action v-if="theme === 'round-button'" custom-class="van-dialog__footer--round-button">
                <van-goods-action-button
                    v-if="showCancelButton"
                    size="large"
                    :loading="loading.cancel"
                    class="van-dialog__button van-hairline--right"
                    custom-class="van-dialog__cancel"
                    :custom-style="'color: ' + cancelButtonColor"
                    @click="onCancel"
                >
                    {{ cancelButtonText }}
                </van-goods-action-button>
                <van-goods-action-button
                    v-if="showConfirmButton"
                    size="large"
                    class="van-dialog__button"
                    :loading="loading.confirm"
                    custom-class="van-dialog__confirm"
                    :custom-style="'color: ' + confirmButtonColor"
                    :open-type="confirmButtonOpenType"
                    :lang="lang"
                    :business-id="businessId"
                    :session-from="sessionFrom"
                    :send-message-title="sendMessageTitle"
                    :send-message-path="sendMessagePath"
                    :send-message-img="sendMessageImg"
                    :show-message-card="showMessageCard"
                    :app-parameter="appParameter"
                    @click="onConfirm"
                    @getuserinfo="onGetUserInfo"
                    @contact="onContact"
                    @getphonenumber="onGetPhoneNumber"
                    @error="onError"
                    @launchapp="onLaunchApp"
                    @opensetting="onOpenSetting"
                >
                    {{ confirmButtonText }}
                </van-goods-action-button>
            </van-goods-action>

            <view v-else class="van-hairline--top van-dialog__footer">
                <van-button
                    v-if="showCancelButton"
                    size="large"
                    :loading="loading.cancel"
                    class="van-dialog__button van-hairline--right"
                    custom-class="van-dialog__cancel"
                    :custom-style="'color: ' + cancelButtonColor"
                    @click="onCancel"
                >
                    {{ cancelButtonText }}
                </van-button>
                <van-button
                    v-if="showConfirmButton"
                    size="large"
                    class="van-dialog__button"
                    :loading="loading.confirm"
                    custom-class="van-dialog__confirm"
                    :custom-style="'color: ' + confirmButtonColor"
                    :open-type="confirmButtonOpenType"
                    :lang="lang"
                    :business-id="businessId"
                    :session-from="sessionFrom"
                    :send-message-title="sendMessageTitle"
                    :send-message-path="sendMessagePath"
                    :send-message-img="sendMessageImg"
                    :show-message-card="showMessageCard"
                    :app-parameter="appParameter"
                    @click="onConfirm"
                    @getuserinfo="onGetUserInfo"
                    @contact="onContact"
                    @getphonenumber="onGetPhoneNumber"
                    @error="onError"
                    @launchapp="onLaunchApp"
                    @opensetting="onOpenSetting"
                >
                    {{ confirmButtonText }}
                </van-button>
            </view>
        </van-popup>
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script>
'use strict';
import vanPopup from '../popup/index';
import vanButton from '../button/index';
import vanGoodsAction from '../goods-action/index';
import vanGoodsActionButton from '../goods-action-button/index';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

var button_1 = require('../mixins/button');

var color_1 = require('../common/color');

var utils_1 = require('../common/utils');

export default {
    components: {
        vanPopup,
        vanButton,
        vanGoodsAction,
        vanGoodsActionButton
    },
    data() {
        return {
            loading: {
                confirm: false,
                cancel: false
            },

            callback: function () {},
            lang: '',
            businessId: '',
            sessionFrom: '',
            sendMessageTitle: '',
            sendMessagePath: '',
            sendMessageImg: '',
            showMessageCard: '',
            appParameter: '',
            showClone: false
        };
    },
    mixins: [button_1.button],
    props: {
        show: {
            type: Boolean
        },
        title: String,
        message: String,
        theme: {
            type: String,
            default: 'default'
        },
        useSlot: Boolean,
        className: String,
        customStyle: String,
        asyncClose: Boolean,
        messageAlign: String,
        beforeClose: null,
        overlayStyle: String,
        useTitleSlot: Boolean,
        showCancelButton: Boolean,
        closeOnClickOverlay: Boolean,
        confirmButtonOpenType: String,
        width: null,
        zIndex: {
            type: Number,
            default: 2000
        },
        confirmButtonText: {
            type: String,
            default: '确认'
        },
        cancelButtonText: {
            type: String,
            default: '取消'
        },
        confirmButtonColor: {
            type: String,
            default: color_1.RED
        },
        cancelButtonColor: {
            type: String,
            default: color_1.GRAY
        },
        showConfirmButton: {
            type: Boolean,
            default: true
        },
        overlay: {
            type: Boolean,
            default: true
        },
        transition: {
            type: String,
            default: 'scale'
        }
    },
    methods: {
        onConfirm: function () {
            this.handleAction('confirm');
        },

        onCancel: function () {
            this.handleAction('cancel');
        },

        onClickOverlay: function () {
            this.close('overlay');
        },

        close: function (action) {
            var that = this;
            this.setData({
                showClone: false
            });
            uni.nextTick(function () {
                that.$emit('close', action);
                var callback = that.callback;

                if (callback) {
                    callback(action, that);
                }
            });
        },

        stopLoading: function () {
            this.setData({
                loading: {
                    confirm: false,
                    cancel: false
                }
            });
        },

        handleAction: function (action) {
            var _a;

            var that = this;
            this.$emit(action, {
                dialog: this
            });
            var _b = this;
            var asyncClose = _b.asyncClose;
            var beforeClose = _b.beforeClose;

            if (!asyncClose && !beforeClose) {
                this.close(action);
                return;
            }

            if (beforeClose) {
                (0, utils_1.toPromise)(beforeClose(action)).then(function (value) {
                    if (value) {
                        that.close(action);
                    } else {
                        that.stopLoading();
                    }
                });
            }
        },

        onGetUserInfo() {
            console.log('占位：函数 onGetUserInfo 未声明');
        },

        onContact() {
            console.log('占位：函数 onContact 未声明');
        },

        onGetPhoneNumber() {
            console.log('占位：函数 onGetPhoneNumber 未声明');
        },

        onError() {
            console.log('占位：函数 onError 未声明');
        },

        onLaunchApp() {
            console.log('占位：函数 onLaunchApp 未声明');
        },

        onOpenSetting() {
            console.log('占位：函数 onOpenSetting 未声明');
        }
    },
    watch: {
        show: {
            handler: function (show) {
                this.showClone = this.deepClone(this.show);
                if (!show) {
                    this.stopLoading();
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
