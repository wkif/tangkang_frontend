// pages/user/about/versionLog/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        logList: [
            {
                version: '.0.01',
                time: '2022-07-31 15:33',
                content: [
                    '新增功能：增加用户登录退出；用户信息更改；用户个性化系统设置；用户地址管理；在线客服；',
                    "新增功能：用户血糖值日记录管理；用户血糖可视化分析；用户不定期记录管理；食品数据库；",
                    '新增功能：积分商城基础版；饮食记录',
                ]
            }
        ]
    },
    onClickLeft() {
        wx.navigateBack({
            delta: 1
        })
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