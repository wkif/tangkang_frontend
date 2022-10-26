'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.button = void 0;

var version_1 = require('../common/version');

exports.button = {
    data() {
        return {
            canIUseGetUserProfile: (0, version_1.canIUseGetUserProfile)()
        };
    },
    externalClasses: ['hover-class'],
    props: {
        id: String,
        lang: String,
        businessId: Number,
        sessionFrom: String,
        sendMessageTitle: String,
        sendMessagePath: String,
        sendMessageImg: String,
        showMessageCard: Boolean,
        appParameter: String,
        ariaLabel: String,
        openType: String,
        getUserProfileDesc: String
    },
    methods: {
        onGetUserInfo: function (event) {
            this.$emit('getuserinfo', {
                detail: event.detail
            });
        },
        onContact: function (event) {
            this.$emit('contact', {
                detail: event.detail
            });
        },
        onGetPhoneNumber: function (event) {
            this.$emit('getphonenumber', {
                detail: event.detail
            });
        },
        onError: function (event) {
            this.$emit('error', {
                detail: event.detail
            });
        },
        onLaunchApp: function (event) {
            this.$emit('launchapp', {
                detail: event.detail
            });
        },
        onOpenSetting: function (event) {
            this.$emit('opensetting', {
                detail: event.detail
            });
        }
    }
};
