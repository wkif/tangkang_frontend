// pages/home/foodDatabase/index.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        dataList: {},
        tabList: [],
        searchValue: '',
        active: 0,
        data: [],
        marginTopview: app.globalData.navBarHeight
    },
    onClickLeft() {
        wx.navigateBack({
            delta: 1
        })
    },
    async getData() {
        let data = {
            foodName: this.data.searchValue
        }
        let res = await app.$api.getfoodDatabaseByname(data)
        if (res.status == 200) {
            this.setData({
                dataList: res.data.foodDatabase,
                tabList: res.data.tablist,
                data: res.data.foodDatabase[this.data.active].food
            })

        } else {
            wx.showToast({
                title: res.msg,
                icon: 'none'
            })
            this.setData({
                dataList: [],
                // tabList: [],
                data: []
            })

        }
    },
    onChange(event) {
        console.log('event', event)
        let index = event.detail.index
        console.log('this.data.dataList[index]', this.data.dataList[index])
        this.setData({
            active: index,
            data: this.data.dataList[index].food
        })
    },
    search(e) {
        console.log('e', e.detail)
        this.setData({
            searchValue: e.detail
        })
        this.getData()
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getData()
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