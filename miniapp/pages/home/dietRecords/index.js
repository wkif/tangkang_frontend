// pages/home/dietRecords/index.js
var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        Data: [],
        dateList: [],
        tabIndex: 0,
        d: {},
        activeNames: ['1'],
    },
    onChange(event) {
        this.setData({
            activeNames: event.detail,
        });
    },
    onClickLeft() {
        wx.navigateBack({
            delta: 1
        })
    },
    addButton() {
        wx.navigateTo({
            url: '/pages/home/dietRecords/add/index',
        });
    },
    tabSelect(e) {
        console.log(e)
        this.setData({
            tabIndex: e.detail,
            d: this.data.Data.filter(item => item.id == e.detail)[0]
        })
    },
    async getDietRecords() {
        let data = {
            userId: wx.getStorageSync('userInfo').id
        }
        let res = await app.$api.getDietRecordsByUserId(data)
        if (res.status == 200) {
            let data = res.data
            let dateList = []
            data.forEach(item => {
                dateList.push({
                    text: item.time,
                    value: item.id
                })
            })

            this.setData({
                Data: data,
                dateList: dateList,
                d: data[0],
                tabIndex: data[0].id
            })
        } else {
            wx.showToast({
                title: res.data,
                icon: 'none'
            })
            this.setData({
                Data: [],
                dateList: [],
                d: {},
                tabIndex: ''
            })
        }

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
                        dietId: that.data.d.id
                    }
                    app.$api.deleteDietRecords(data).then(res => {
                        console.log(res)
                        if (res.status == 200) {
                            wx.showToast({
                                title: '删除成功',
                                icon: 'success',
                                duration: 2000
                            })
                            that.getDietRecords()
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
        this.getDietRecords()
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
        this.getDietRecords()
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