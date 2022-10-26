<template>
    <view>
        <van-nav-bar title="404" left-text="返回" fixed left-arrow @click-left="onClickLeft" />
        <view class="app">
            <van-empty image="network" description="暂无内容" />
        </view>
    </view>
</template>

<script>
import vanEmpty from './@vant/weapp/empty/index';
// pages/nodata/index.js
export default {
    components: {
        vanEmpty
    },
    data() {
        return {};
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    methods: {
        onClickLeft() {
            uni.navigateBack({
                delta: 1
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
