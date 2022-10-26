<template>
    <view class="card">
        <view class="header">{{ header }}</view>
        <view class="content">{{ content }}</view>
    </view>
</template>

<script>
// components/kif-card/index.js
export default {
    data() {
        return {};
    },
    /**
     * 组件的属性列表
     */
    props: {
        header: {
            type: String,
            default: 'header'
        },
        content: {
            type: String,
            default: 'content'
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {}
};
</script>
<style>
@import './index.css';
</style>
