// pages/user/userinfo/index.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        marginTopview: app.globalData.navBarHeight,
        userid: '',
        starCount: 0,
        forksCount: 0,
        visitTotal: 0,
        healthData: {},
        activeName: '1',
        bloodSugarTypeList: [
            '空腹血糖',
            '早餐后2小时血糖',
            '午餐前血糖',
            '午餐后2小时血糖',
            '晚餐前血糖',
            '晚餐后2小时血糖',
            '睡前血糖',
            '任意时间血糖',
            '夜间2时血糖',
            '其他'
        ]
    },
    onClickLeft() {
        wx.navigateBack({
            delta: 1
        })
    },
    onChange(event) {
        this.setData({
            activeName: event.detail,
        });
    },
    init() {
        let that = this;
        wx.showLoading({
            title: '数据加载中',
            mask: true,
        })
        // let i = 0;
        // numDH();
        // function numDH() {
        //     if (i < 20) {
        //         setTimeout(function () {
        //             that.setData({
        //                 starCount: i,
        //                 forksCount: i,
        //                 visitTotal: i
        //             })
        //             i++
        //             numDH();
        //         }, 20)
        //     } else {
        //         that.setData({
        //             starCount: that.coutNum(3000),
        //             forksCount: that.coutNum(484),
        //             visitTotal: that.coutNum(24000)
        //         })
        //     }
        // }
        this.getHealthHistory()
        wx.hideLoading()
    },
    async getHealthHistory() {
        let data = {
            userId:this.data.userid,
        }
        let res = await app.$api.getHealthHistory(data)
        console.log('res', res)
        this.setData({
            healthData: res.data
        })
    },
    // coutNum(e) {
    //     if (e > 1000 && e < 10000) {
    //         e = (e / 1000).toFixed(1) + 'k'
    //     }
    //     if (e > 10000) {
    //         e = (e / 10000).toFixed(1) + 'W'
    //     }
    //     return e
    // },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log('options', options)
        if (options?.userid) {
            this.setData({
                userid: options.userid
            })
        }
        this.init()
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