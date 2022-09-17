// pages/record/index.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiperList: [{
            id: 0,
            type: 'image',
            // url: 'https://kifimg.oss-cn-beijing.aliyuncs.com/project/202207242302946.png',
            url:'https://kifimg.oss-cn-beijing.aliyuncs.com/project/202209111324811.png',
            path: '/pages/record/dailyRecord/index',
            name: '血糖值日记录',
            desc: '记录每天的血糖值',
        }, {
            id: 1,
            type: 'image',
            url: 'https://kifimg.oss-cn-beijing.aliyuncs.com/project/202209111325936.png',
            path: '/pages/record/irregularTimingRecording/index',
            name: '不定期记录',
            desc: '记录糖化血红蛋白等数据'
        }],
    },
    navto(e) {
        let path = e.currentTarget.dataset.path
        if (app.globalData.loginFlag) {
            wx.navigateTo({
                url: path,
            })
        }
        else {
            wx.showToast({
                title: '请先登录',
                icon: 'none'
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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