// pages/home/announcement/index.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        Data: {},
        marginTopview: app.globalData.navBarHeight,
        sportsList: [],
        backimgList: [
            "https://kifimg.oss-cn-beijing.aliyuncs.com/project/202209121054152.png",
            "https://kifimg.oss-cn-beijing.aliyuncs.com/project/202209121105780.png",
            "https://kifimg.oss-cn-beijing.aliyuncs.com/project/202209121107824.png"
        ]
    },
    onClickLeft() {
        wx.navigateBack({
            delta: 1
        })
    },
    async getSportsRecordsByid() {
        let data = {
            userId: wx.getStorageSync('userInfo').id
        }
        let res = await app.$api.getSportsRecordsByid(data)
        console.log('res', res)
        if (res.status == 200) {
            let a = res.data[0]
            for (let i = 0; i < 10; i++) {
                res.data.push(a)
            }
            this.setData({
                sportsList: res.data
            })
        } else {
            wx.showToast({
                title: res.data,
                duration: 2000,

            })
        }
    },

    addSportsRecords() {
        wx.navigateTo({
            url: '/pages/home/sport/addSportsRecords/index',

        })
    },
    dailySportList() {
        wx.navigateTo({
            url: '/pages/home/sport/dailySportList/index',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getSportsRecordsByid()
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