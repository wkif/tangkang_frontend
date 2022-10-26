<template>
    <view>
        <van-nav-bar title="设置" left-text="返回" fixed left-arrow @click-left="onClickLeft" />
        <view class="app" :style="'margin-top:' + marginTopview + 'px;'">
            <van-cell-group inset>
                <van-cell title="语音播报" :value="speedFlag ? '开' : '关'" @click="changeSpeed" />
                <!-- <van-cell title="单元格" value="内容" label="描述信息" /> -->
            </van-cell-group>
            <van-dialog id="van-dialog" />
        </view>
    </view>
</template>

<script>
import vanCell from './@vant/weapp/cell/index';
import vanCellGroup from './@vant/weapp/cell-group/index';
import vanNotify from './@vant/weapp/notify/index';
// pages/user/setting/index.js
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';
const app = getApp(); // import Notify from '../../../miniprogram_npm/@vant/weapp/notify/notify';

export default {
    components: {
        vanCell,
        vanCellGroup,
        vanNotify
    },
    data() {
        return {
            speedFlag: false,
            marginTopview: app.globalData.navBarHeight
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            speedFlag: app.globalData.speedFlag
        });
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

        changeSpeed() {
            let that = this;
            app.globalData.$api
                .changespeed({
                    userId: uni.getStorageSync('userInfo').id
                })
                .then((res) => {
                    console.log(res);

                    if (res.status == 200) {
                        uni.showToast({
                            title: '设置成功',
                            icon: 'success',
                            duration: 2000
                        });
                        that.setData({
                            speedFlag: !that.speedFlag
                        });
                        app.globalData.speedFlag = !app.globalData.speedFlag;

                        if (app.globalData.speedFlag) {
                            app.globalData.$Text2Speech('语音提示已经开启');
                        }
                    }
                });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
