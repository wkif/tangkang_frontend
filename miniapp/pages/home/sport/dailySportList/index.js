const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        marginTopview: app.globalData.navBarHeight,
        dailySportList: []
    },
    onClickLeft() {
        wx.navigateBack({
            delta: 1
        })
    },
    dailySportList() {
        app.$api.dailySportList().then(res => {
            console.log(res)
            if (res.status == 200) {
                this.setData({
                    dailySportList: res.data
                })
            } else {
                wx.showToast({
                    title: res.data,
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.dailySportList()
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