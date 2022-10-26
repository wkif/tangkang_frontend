<template>
    <view>
        <van-popup
            :show="show"
            position="bottom"
            :round="round"
            :z-index="zIndex"
            :overlay="overlay"
            custom-class="van-action-sheet"
            :safe-area-inset-bottom="safeAreaInsetBottom"
            :close-on-click-overlay="closeOnClickOverlay"
            @close="onClickOverlay"
        >
            <view v-if="title" class="van-action-sheet__header">
                {{ title }}
                <van-icon name="cross" custom-class="van-action-sheet__close" @click="onClose" />
            </view>
            <view v-if="description" class="van-action-sheet__description van-hairline--bottom">
                {{ description }}
            </view>
            <view v-if="actions && actions.length">
                <!-- button外包一层view，防止actions动态变化，导致渲染时button被打散 -->
                <button
                    :open-type="item.disabled || item.loading || (canIUseGetUserProfile && item.openType === 'getUserInfo') ? '' : item.openType"
                    :style="item.color ? 'color: ' + item.color : ''"
                    :class="utils.bem('action-sheet__item', { disabled: item.disabled || item.loading }) + ' ' + (item.className || '')"
                    hover-class="van-action-sheet__item--hover"
                    :data-index="index"
                    @tap="parseEventDynamicCode($event, item.disabled || item.loading ? '' : 'onSelect')"
                    @getuserinfo="onGetUserInfo"
                    @contact="onContact"
                    @getphonenumber="onGetPhoneNumber"
                    @error="onError"
                    @launchapp="onLaunchApp"
                    @opensetting="onOpenSetting"
                    :lang="lang"
                    :session-from="sessionFrom"
                    :send-message-title="sendMessageTitle"
                    :send-message-path="sendMessagePath"
                    :send-message-img="sendMessageImg"
                    :show-message-card="showMessageCard"
                    :app-parameter="appParameter"
                    v-for="(item, index) in actions"
                    :key="index"
                >
                    <block v-if="!item.loading">
                        {{ item.name }}
                        <view v-if="item.subname" class="van-action-sheet__subname">{{ item.subname }}</view>
                    </block>

                    <van-loading v-else custom-class="van-action-sheet__loading" size="22px" />
                </button>
            </view>
            <slot />
            <block v-if="cancelText">
                <view class="van-action-sheet__gap" />
                <view class="van-action-sheet__cancel" hover-class="van-action-sheet__cancel--hover" hover-stay-time="70" @tap="onCancel">
                    {{ cancelText }}
                </view>
            </block>
        </van-popup>
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script>
'use strict';
import vanIcon from '../icon/index';
import vanPopup from '../popup/index';
import vanLoading from '../loading/index';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

var button_1 = require('../mixins/button');

export default {
    data() {
        return {
            canIUseGetUserProfile: '',
            lang: '',
            sessionFrom: '',
            sendMessageTitle: '',
            sendMessagePath: '',
            sendMessageImg: '',
            showMessageCard: '',
            appParameter: ''
        };
    },
    components: {
        vanIcon,
        vanPopup,
        vanLoading
    },
    mixins: [button_1.button],
    props: {
        show: Boolean,
        title: String,
        cancelText: String,
        description: String,
        round: {
            type: Boolean,
            default: true
        },
        zIndex: {
            type: Number,
            default: 100
        },
        actions: {
            type: Array,
            default: () => []
        },
        overlay: {
            type: Boolean,
            default: true
        },
        closeOnClickOverlay: {
            type: Boolean,
            default: true
        },
        closeOnClickAction: {
            type: Boolean,
            default: true
        },
        safeAreaInsetBottom: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        onSelect: function (event) {
            var that = this;
            var index = event.currentTarget.dataset.index;
            var _a = this;
            var actions = _a.actions;
            var closeOnClickAction = _a.closeOnClickAction;
            var canIUseGetUserProfile = _a.canIUseGetUserProfile;
            var item = actions[index];

            if (item) {
                this.$emit('select', item);

                if (closeOnClickAction) {
                    this.onClose();
                }

                if (item.openType === 'getUserInfo' && canIUseGetUserProfile) {
                    uni.getUserProfile({
                        desc: item.getUserProfileDesc || '  ',
                        complete: function (userProfile) {
                            that.$emit('getuserinfo', userProfile);
                        }
                    });
                }
            }
        },

        onCancel: function () {
            this.$emit('cancel');
        },

        onClose: function () {
            this.$emit('close');
        },

        onClickOverlay: function () {
            this.$emit('click-overlay');
            this.onClose();
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
    }
};
</script>
<style>
@import './index.css';
</style>
