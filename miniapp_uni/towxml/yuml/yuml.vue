<template>
    <view class="h2w__yumlBox">
        <view :style="'width:' + size.w + 'em;'" class="h2w__yumlView">
            <image :class="attr.class" :src="attr.src" :style="'width:' + size.w + 'em; height:' + size.h + 'em;'" :lazy-load="true" mode="aspectFill" @load="load"></image>
        </view>
    </view>
</template>

<script>
const config = require('../config');

export default {
    data() {
        return {
            attr: {
                src: '',
                class: ''
            },
            size: {
                w: 0,
                h: 0
            }
        };
    },
    options: {
        styleIsolation: 'shared'
    },
    props: {
        data: {
            type: Object,
            default: () => ({})
        }
    },
    beforeMount: function () {
        const that = this;
        let dataAttr = this.data.attrs; // 设置公式图片

        that.setData({
            attr: {
                src: `${config.yuml.api}=${dataAttr.value}&theme=${global._theme}`,
                class: `${dataAttr.class}`
            }
        });
    },
    methods: {
        load: function (e) {
            const that = this; // 公式图片加载完成则根据其图片大小、类型计算其显示的合适大小

            let scale = 20;
            let w = e.detail.width / scale;
            let h = e.detail.height / scale;
            that.setData({
                size: {
                    w: w,
                    h: h
                }
            });
        }
    }
};
</script>
<style>
@import './yuml.css';
</style>
