<template>
    <view>
        <van-nav-bar title="关于" left-text="返回" fixed left-arrow @click-left="onClickLeft" />
        <view class="app">
            <view class="margin-xl bg-white padding-xl radius shadow-lg">
                <view class="text-center margin-bottom text-lg text-grey">关于糖康有道</view>
                <view class="text-center margin-bottom text-lg text-grey">v 0.0.1</view>
                <view class="text-content">
                    <view>Hi！~欢迎使用糖康有道！</view>
                    <view class="margin-top-sm">
                        微信小程序包括科学饮食模块、合理运动模块、血糖监测模块、糖尿病知识模块提供行为健康指导。商城版块为糖尿病患者提供糖尿病医疗用品
                        (血糖仪、试纸、胰岛素笔、胰岛素笔针头、消毒棉片) 、健康食品、运动器材。
                    </view>
                    <view class="margin-top-sm">
                        通过积分奖励，提高用户使用热情。通过参与各模块，实现对糖尿病患者饮食、运动的规划及血糖监测，养成良好血糖管理习惯。并具有糖尿病并发症筛检项目，及时发现糖尿病并发症。
                    </view>
                    <view class="margin-top-sm">更多功能敬请期待！</view>
                    <view class="margin-top-sm text-blue" @tap="gotoVersionLog">查看更新日志</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/user/about/index.js
export default {
    data() {
        return {};
    }
    /**
     * 生命周期函数--监听页面加载
     */,
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
        },

        gotoVersionLog() {
            uni.navigateTo({
                url: '/pages/user/about/versionLog/index'
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
