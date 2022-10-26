<template>
    <view>
        <van-nav-bar title="日志" left-text="返回" fixed left-arrow @click-left="onClickLeft" />
        <view class="app">
            <view class="cu-timeline">
                <view class="cu-item text-green" v-for="(item, index) in logList" :key="index">
                    <view class="bg-gradual-green content shadow">
                        <view class="cu-capsule radius">
                            <view class="cu-tag bg-white text-green">v{{ item.version }}</view>
                            <view class="cu-tag line-white">{{ item.time }}</view>
                        </view>
                        <view class="margin-top-sm text-content" v-for="(con, index1) in item.content" :key="index1">
                            <view>{{ index + 1 }}.{{ con }}</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// pages/user/about/versionLog/index.js
export default {
    data() {
        return {
            logList: [
                {
                    version: '0.0.1',
                    time: '2022-07-31 15:33',
                    content: [
                        '新增功能：增加用户登录退出；用户信息更改；用户个性化系统设置；用户地址管理；在线客服；',
                        '新增功能：用户血糖值日记录管理；用户血糖可视化分析；用户不定期记录管理；食品数据库；',
                        '新增功能：积分商城基础版；饮食记录'
                    ]
                },
                {
                    version: '0.0.2',
                    time: '2022-08-07 20:33',
                    content: ['新增功能：商店基础功能']
                },
                {
                    version: '0.0.3',
                    time: '2022-08-14 21:33',
                    content: ['新增功能：资讯功能']
                }
            ],

            con: ''
        };
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
        }
    }
};
</script>
<style>
@import './index.css';
</style>
