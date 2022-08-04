// pages/record/dailyRecord/add/index.js

const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {

        bloodSugarTime: '',
        selectTimeShow: false,
        timeColumns: [],
        minHour: 10,
        maxHour: 20,
        minDate: new Date(new Date() - 365 * 24 * 60 * 60 * 1000).getTime(),
        maxDate: new Date().getTime(),
        currentDate: new Date().getTime(),

        GLL: '',
        GLLShow: false,
        GLLColumns: [],

        ML: '',
        MLShow: false,
        MLColumns: [],

        DPA: '',
        DPAShow: false,
        DPAColumns: [],







    },
    onClickLeft() {
        wx.navigateBack({
            delta: 1
        })
    },

    selectTime() {
        this.setData({
            selectTimeShow: true
        })
    },
    selectGLL() {
        this.setData({
            GLLShow: true
        })
    },
    onTypeChange(event) {
        console.log('event', event)
        const { picker, value, index } = event.detail;
        console.log(`当前值：${value}, 当前索引：${index}`);
        if (!value) {
            this.setData({
                currentDate: event.detail,
            });

        } else {
            if (app.globalData.speedFlag) {
                app.$Text2Speech(value)
            }
        }
    },

    onConfirmTime(e) {

        this.setData({
            currentDate: e.detail,
            bloodSugarTime: app.$formatTime(e.detail),
            selectTimeShow: false
        })
        if (app.globalData.speedFlag) {
            app.$Text2Speech(app.$formatTime(e.detail))
        }
    },

    onCancelTime() {
        this.setData({
            selectTimeShow: false
        })
    },
    onConfirmGLL(e) {
        this.setData({
            GLL: e.detail.value,
            GLLShow: false
        })
    },
    onCancelGLL() {
        this.setData({
            GLLShow: false
        })
    },
    selectML() {
        this.setData({
            MLShow: true
        })
    },
    onConfirmML(e) {
        this.setData({
            ML: e.detail.value,
            MLShow: false
        })
    },
    onCancelML() {
        this.setData({
            MLShow: false
        })
    },
    selectDPA() {
        this.setData({
            DPAShow: true
        })
    },
    onConfirmDPA(e) {
        this.setData({
            DPA: e.detail.value,
            DPAShow: false
        })
    },
    onCancelDPA() {
        this.setData({
            DPAShow: false
        })
    },
    addRec() {
        let data = {
            periodicalTime: this.data.bloodSugarTime,
            glycosylatedHemoglobin: this.data.GLL,
            microalbuminuria: this.data.ML,
            dorsalisPedisArtery: this.data.DPA,
            userId: wx.getStorageSync('userInfo').id
        }
        app.$api.addPeriodicalLoggingData(data).then(res => {
            console.log('res', res)
            if (res.status == 200) {
                wx.showToast({
                    title: '添加成功',
                    icon: 'success',
                    duration: 2000
                })
                setTimeout(() => {
                    wx.navigateBack({
                        delta: 1
                    }), 2000
                })
            } else {
                wx.showToast({
                    title: res.data,
                    icon: 'none',
                    duration: 2000
                })
            }
        })
    },
    /**
 * 生命周期函数--监听页面加载
 */
    onLoad: function (options) {
        let GLLColumns = []
        for (let i = 0.03; i <= 0.07; i += 0.001) {
            GLLColumns.push(i.toFixed(3))
        }

        this.setData({
            GLLColumns: GLLColumns
        })

        let MLColumns = []
        for (let i = 20; i <= 200; i += 10) {
            MLColumns.push(i)
        }

        this.setData({
            MLColumns: MLColumns
        })

        let DPAColumns = [
            '触及', '未触及'
        ]


        this.setData({
            DPAColumns: DPAColumns
        })

        let timeColumns = []
        for (let i = 0; i < 24; i++) {
            timeColumns.push(i + ':00')
        }
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