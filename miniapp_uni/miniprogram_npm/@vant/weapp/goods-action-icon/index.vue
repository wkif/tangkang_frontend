<template>
    <view>
        <van-button
            square
            :id="id"
            size="large"
            :lang="lang"
            :loading="loading"
            :disabled="disabled"
            :open-type="openType"
            :business-id="businessId"
            custom-class="van-goods-action-icon"
            :session-from="sessionFrom"
            :app-parameter="appParameter"
            :send-message-img="sendMessageImg"
            :send-message-path="sendMessagePath"
            :show-message-card="showMessageCard"
            :send-message-title="sendMessageTitle"
            @click="onClick($event, { tagId: id })"
            @error="onError($event, { tagId: id })"
            @contact="onContact($event, { tagId: id })"
            @opensetting="onOpenSetting($event, { tagId: id })"
            @getuserinfo="onGetUserInfo($event, { tagId: id })"
            @getphonenumber="onGetPhoneNumber($event, { tagId: id })"
            @launchapp="onLaunchApp($event, { tagId: id })"
        >
            <van-icon v-if="icon" :name="icon" :dot="dot" :info="info" :class-prefix="classPrefix" class="van-goods-action-icon__icon" custom-class="icon-class" />
            <slot v-else name="icon" />
            <text class="text-class">{{ text }}</text>
        </van-button>
    </view>
</template>

<script>
'use strict';
import vanIcon from '../icon/index';
import vanButton from '../button/index';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var component_1 = require('../common/component');

var button_1 = require('../mixins/button');

var link_1 = require('../mixins/link');

export default {
    data() {
        return {
            id: '',
            lang: '',
            openType: '',
            businessId: '',
            sessionFrom: '',
            appParameter: '',
            sendMessageImg: '',
            sendMessagePath: '',
            showMessageCard: '',
            sendMessageTitle: ''
        };
    },
    components: {
        vanIcon,
        vanButton
    },
    classes: ['icon-class', 'text-class'],
    mixins: [link_1.link, button_1.button],
    props: {
        text: String,
        dot: Boolean,
        info: String,
        icon: String,
        classPrefix: {
            type: String,
            default: 'van-icon'
        },
        disabled: Boolean,
        loading: Boolean
    },
    methods: {
        onClick: function (event, _dataset) {
            /* ---??????dataset begin--- */
            this.datasetHandle(event, _dataset);
            /* ---??????dataset end--- */
            this.$emit('click', event.detail);
            this.jumpLink();
        },

        onError(e, _dataset) {
            /* ---??????dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---??????dataset end--- */
            console.log('??????????????? onError ?????????');
        },

        onContact(e, _dataset) {
            /* ---??????dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---??????dataset end--- */
            console.log('??????????????? onContact ?????????');
        },

        onOpenSetting(e, _dataset) {
            /* ---??????dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---??????dataset end--- */
            console.log('??????????????? onOpenSetting ?????????');
        },

        onGetUserInfo(e, _dataset) {
            /* ---??????dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---??????dataset end--- */
            console.log('??????????????? onGetUserInfo ?????????');
        },

        onGetPhoneNumber(e, _dataset) {
            /* ---??????dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---??????dataset end--- */
            console.log('??????????????? onGetPhoneNumber ?????????');
        },

        onLaunchApp(e, _dataset) {
            /* ---??????dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---??????dataset end--- */
            console.log('??????????????? onLaunchApp ?????????');
        }
    }
};
</script>
<style>
@import './index.css';
</style>
