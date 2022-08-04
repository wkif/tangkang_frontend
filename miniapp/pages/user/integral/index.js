// pages/nodata/index.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        historyList: [],
        jfImg: '../../../assets/img/jf.png',
        integralNum: 0
    },
    onClickLeft() {
        wx.navigateBack({
            delta: 1
        })
    },
    async getHistory() {
        let data = {
            userId: wx.getStorageSync('userInfo').id,
        }
        let res = await app.$api.getIntegralHistory(data)
        if (res.status == 200) {
            this.setData({
                historyList: res.data
            })
        } else {
            wx.showToast({
                title: res.data,
                icon: 'none',
                duration: 2000
            })
        }


    },
    async getIntegral() {
        let data = {
            userId: wx.getStorageSync('userInfo').id,
        }
        let res = await app.$api.getUserIntegral(data)
        if (res.status == 200) {
            this.setData({
                integralNum: res.data
            })
        } else {
            wx.showToast({
                title: res.data,
                icon: 'none',
                duration: 2000
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getHistory()
        this.getIntegral()
        // let info = wx.getStorageSync('userInfo')
        // this.setData({
        //     integralNum: info.integral
        // })
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