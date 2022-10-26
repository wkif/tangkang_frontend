'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.basic = void 0;
exports.basic = {
    methods: {
        $emit: function (name, detail, options) {
            this.$emit(
                name,
                {
                    detail: detail
                },
                options
            );
        },
        set: function (data) {
            this.setData(data);
            return new Promise(function (resolve) {
                return uni.nextTick(resolve);
            });
        }
    }
};
