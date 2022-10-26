<template>
    <view>
        <image :class="attrs.class" :lazy-load="true" :src="attrs.src" :style="'width:' + size.w + 'em; height:' + size.h + 'em;'" @load="load"></image>
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
            },

            attrs: {
                class: '',
                src: ''
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
            attrs: {
                src: `${config.latex.api}=${dataAttr.value}&theme=${global._theme}`,
                class: `${dataAttr.class} ${dataAttr.class}--${dataAttr.type}`
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
@import './latex.css';
</style>
