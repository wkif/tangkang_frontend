<template>
    <view>
        <button
            :id="id"
            :data-detail="dataset"
            :class="
                'custom-class ' +
                utils.bem('button', [type, size, { block, round, plain, square, loading, disabled, hairline, unclickable: disabled || loading }]) +
                ' ' +
                (hairline ? 'van-hairline--surround' : '')
            "
            hover-class="van-button--active hover-class"
            :lang="lang"
            :form-type="formType"
            :style="computed.rootStyle({ plain, color, customStyle })"
            :open-type="disabled || loading || (canIUseGetUserProfile && openType === 'getUserInfo') ? '' : openType"
            :business-id="businessId"
            :session-from="sessionFrom"
            :send-message-title="sendMessageTitle"
            :send-message-path="sendMessagePath"
            :send-message-img="sendMessageImg"
            :show-message-card="showMessageCard"
            :app-parameter="appParameter"
            :aria-label="ariaLabel"
            @tap="parseEventDynamicCode($event, disabled || loading ? '' : 'onClick')"
            @getuserinfo="onGetUserInfo"
            @contact="onContact"
            @getphonenumber="onGetPhoneNumber"
            @error="onError"
            @launchapp="onLaunchApp"
            @opensetting="onOpenSetting"
        >
            <block v-if="loading">
                <van-loading custom-class="loading-class" :size="loadingSize" :type="loadingType" :color="computed.loadingColor({ type, color, plain })" />
                <view v-if="loadingText" class="van-button__loading-text">
                    {{ loadingText }}
                </view>
            </block>
            <block v-else>
                <van-icon v-if="icon" size="1.2em" :name="icon" :class-prefix="classPrefix" class="van-button__icon" custom-style="line-height: inherit;" />
                <view class="van-button__text">
                    <slot />
                </view>
            </block>
        </button>
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script module="computed" lang="wxs" src="./index.wxs"></script>
<script>
'use strict';
import vanIcon from '../icon/index';
import vanLoading from '../loading/index';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

var button_1 = require('../mixins/button');

var version_1 = require('../common/version');

var mixins = [button_1.button];

if ((0, version_1.canIUseFormFieldButton)()) {
    mixins.push('wx://form-field-button');
}

export default {
    components: {
        vanIcon,
        vanLoading
    },
    data() {
        return {
            baseStyle: '',
            id: '',
            lang: '',
            canIUseGetUserProfile: '',
            openType: '',
            businessId: '',
            sessionFrom: '',
            sendMessageTitle: '',
            sendMessagePath: '',
            sendMessageImg: '',
            showMessageCard: '',
            appParameter: '',
            ariaLabel: ''
        };
    },
    mixins: mixins,
    classes: ['hover-class', 'loading-class'],
    props: {
        formType: String,
        icon: String,
        classPrefix: {
            type: String,
            default: 'van-icon'
        },
        plain: Boolean,
        block: Boolean,
        round: Boolean,
        square: Boolean,
        loading: Boolean,
        hairline: Boolean,
        disabled: Boolean,
        loadingText: String,
        customStyle: String,
        loadingType: {
            type: String,
            default: 'circular'
        },
        type: {
            type: String,
            default: 'default'
        },
        dataset: null,
        size: {
            type: String,
            default: 'normal'
        },
        loadingSize: {
            type: String,
            default: '20px'
        },
        color: String
    },
    methods: {
        onClick: function (event) {
            var that = this;
            this.$emit('click', event);
            var _a = this;
            var canIUseGetUserProfile = _a.canIUseGetUserProfile;
            var openType = _a.openType;
            var getUserProfileDesc = _a.getUserProfileDesc;
            var lang = _a.lang;
            if (openType === 'getUserInfo' && canIUseGetUserProfile) {
                uni.getUserProfile({
                    desc: getUserProfileDesc || '  ',
                    lang: lang || 'en',
                    complete: function (userProfile) {
                        that.$emit('getuserinfo', userProfile);
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
    }
};
</script>
<style>
@import './index.css';
</style>
