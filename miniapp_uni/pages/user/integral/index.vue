<template>
    <view>
        <van-nav-bar title="积分" left-text="返回" fixed left-arrow @click-left="onClickLeft" />
        <view class="app" :style="'margin-top:' + marginTopview + 'px;'">
            <view class="inteCard">
                <view class="card-left radius shadow shadow-lg margin-top"></view>
                <view class="padding-xl card margin-top">
                    <image class="jfImg" mode="widthFix" :src="jfImg" />
                    <text class="tracking-in-expand integralNum">积分：{{ integralNum }}</text>
                </view>
                <view class="card-right radius shadow shadow-lg margin-top"></view>
            </view>
            <view class="historyList">
                <view class="history" v-for="(item, index) in historyList" :key="index">
                    <view class="history-left">
                        <van-tag class="history-type" color="#ffe1e1" text-color="#817ac8">
                            {{ item.integralType.type }}
                        </van-tag>
                        <view class="time">
                            <van-icon name="clock-o" />
                            <text class="history-time">{{ item.time }}</text>
                        </view>
                    </view>

                    <text class="history-integral">{{ item.integralType.integral }}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import vanEmpty from './@vant/weapp/empty/index';
import vanTag from './@vant/weapp/tag/index';
import vanIcon from './@vant/weapp/icon/index';
// pages/nodata/index.js
const app = getApp();
export default {
    components: {
        vanEmpty,
        vanTag,
        vanIcon
    },
    data() {
        return {
            historyList: [],
            jfImg: '/static/assets/img/jf.png',
            integralNum: 0,
            marginTopview: app.globalData.navBarHeight
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getHistory();
        this.getIntegral(); // let info = wx.getStorageSync('userInfo')
        // this.setData({
        //     integralNum: info.integral
        // })
    },
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

        async getHistory() {
            let data = {
                userId: uni.getStorageSync('userInfo').id
            };
            let res = await app.globalData.$api.getIntegralHistory(data);

            if (res.status == 200) {
                this.setData({
                    historyList: res.data
                });
            } else {
                uni.showToast({
                    title: res.data,
                    icon: 'none',
                    duration: 2000
                });
            }
        },

        async getIntegral() {
            let data = {
                userId: uni.getStorageSync('userInfo').id
            };
            let res = await app.globalData.$api.getUserIntegral(data);

            if (res.status == 200) {
                this.setData({
                    integralNum: res.data
                });
            } else {
                uni.showToast({
                    title: res.data,
                    icon: 'none',
                    duration: 2000
                });
            }
        }
    }
};
</script>
<style>
@import './index.css';
</style>
