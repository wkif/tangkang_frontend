'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.link = void 0;
exports.link = {
    props: {
        url: String,
        linkType: {
            type: String,
            value: 'navigateTo'
        }
    },
    methods: {
        jumpLink: function (urlKey) {
            if (urlKey === void 0) {
                urlKey = 'url';
            }

            var url = this[urlKey];

            if (url) {
                if (this.linkType === 'navigateTo' && getCurrentPages().length > 9) {
                    uni.redirectTo({
                        url: url
                    });
                } else {
                    uni[this.linkType]({
                        url: url
                    });
                }
            }
        }
    }
};
