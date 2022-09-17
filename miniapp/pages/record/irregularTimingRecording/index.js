
// pages/record/irregularTimingRecording/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dateList: [],
        tabIndex: 0,
        dataList: [],
        Data: {},
        marginTopview: app.globalData.navBarHeight
    },
    onClickLeft() {
        wx.navigateBack({
            delta: 1
        })
    },
    addRec() {
        wx.navigateTo({
            url: '/pages/record/irregularTimingRecording/add/index',
        })
    },
    tabSelect(e) {
        console.log(e.detail)
        this.setData({
            tabIndex: e.detail,
            Data: this.data.dataList[e.detail]
        })
    },
    getData() {
        let data = {
            userId: wx.getStorageSync('userInfo').id,
        }
        app.$api.getperiodicalLoggingData(data).then(res => {
            console.log(res)
            if (res.status == 200) {
                this.setData({
                    dataList: res.data
                })
                let dateList = []
                for (let i = 0; i < res.data.length; i++) {
                    let date = res.data[i].periodicalTime
                    dateList.push({
                        text: date.substring(0, 10),
                        value: i
                    })
                }
                this.setData({
                    dateList: dateList,
                    Data: this.data.dataList[0]
                })
            }
        })
    },
    delete() {
        let that = this
        // 询问
        wx.showModal({
            title: '提示',
            content: '确定要删除吗？',
            success: res => {
                if (res.confirm) {
                    let data = {
                        userId: wx.getStorageSync('userInfo').id,
                        periodicalLoggingId: that.data.Data.id
                    }
                    app.$api.deletePeriodicalLoggingData(data).then(res => {
                        console.log(res)
                        if (res.status == 200) {
                            wx.showToast({
                                title: '删除成功',
                                icon: 'success',
                                duration: 2000
                            })
                            that.getData()
                        }
                    })
                } else {
                    console.log('取消')
                }

            },

        }
        )
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