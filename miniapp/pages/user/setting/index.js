// pages/user/setting/index.js
import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';
const app = getApp()
// import Notify from '../../../miniprogram_npm/@vant/weapp/notify/notify';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        speedFlag: false,
        marginTopview: app.globalData.navBarHeight
    },
    onClickLeft() {
        wx.navigateBack({
            delta: 1
        })
    },
    changeSpeed() {
        let that = this
        app.$api.changespeed({
            userId: wx.getStorageSync('userInfo').id,
        }).then(res => {
            console.log(res)
            if (res.status == 200) {
                wx.showToast({
                    title: '设置成功',
                    icon: 'success',
                    duration: 2000
                })
                that.setData({
                    speedFlag: !that.data.speedFlag
                })
                app.globalData.speedFlag = !app.globalData.speedFlag
                if (app.globalData.speedFlag) {
                    app.$Text2Speech('语音提示已经开启')
                }
            }
        })

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            speedFlag: app.globalData.speedFlag
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})