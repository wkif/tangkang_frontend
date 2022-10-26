<template>
    <view class="app">
        <swiper
            class="card-swiper square-dot recordSwiper"
            :indicator-dots="true"
            :circular="true"
            interval="5000"
            duration="500"
            @change="cardSwiper"
            indicator-color="#8799a3"
            indicator-active-color="#0081ff"
        >
            <swiper-item :class="cardCur == index ? 'cur' : ''" v-for="(item, index) in swiperList" :key="index">
                <view class="swiper-item" @tap="navto" :data-path="item.path">
                    <image :src="item.url" mode="aspectFill"></image>
                    <view class="title">{{ item.name }}</view>
                    <text class="desc">{{ item.desc }}</text>
                </view>
            </swiper-item>
        </swiper>
    </view>
</template>

<script>
// pages/record/index.js
const app = getApp();
export default {
    data() {
        return {
            swiperList: [
                {
                    id: 0,
                    type: 'image',
                    url: 'https://kifimg.oss-cn-beijing.aliyuncs.com/project/202207242302946.png',
                    path: '/pages/record/dailyRecord/index',
                    name: '血糖值日记录',
                    desc: '记录每天的血糖值'
                },
                {
                    id: 1,
                    type: 'image',
                    url: 'https://kifimg.oss-cn-beijing.aliyuncs.com/project/202207242303075.png',
                    path: '/pages/record/irregularTimingRecording/index',
                    name: '不定期记录',
                    desc: '记录糖化血红蛋白等数据'
                }
            ],

            cardCur: ''
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
        navto(e) {
            let path = e.currentTarget.dataset.path;

            if (app.globalData.loginFlag) {
                uni.navigateTo({
                    url: path
                });
            } else {
                uni.showToast({
                    title: '请先登录',
                    icon: 'none'
                });
            }
        },

        cardSwiper() {
            console.log('占位：函数 cardSwiper 未声明');
        }
    }
};
</script>
<style>
@import './index.css';
</style>
