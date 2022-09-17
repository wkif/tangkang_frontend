// pages/record/dailyRecord/add/index.js

const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bloodSugarType: '',
        bloodSugarTypeValue: '',
        selectTypeShow: false,
        typeColumns: ['空腹血糖', '早餐后2小时血糖', '午餐前血糖', '午餐后2小时血糖', '晚餐前血糖', '晚餐后2小时血糖', '睡前血糖', '任意时间血糖', '夜间2时血糖', '其他'],
        selectValueShow: false,
        bloodSugarValue: '',
        valueColumns: [],
        bloodSugarTime: '',
        selectTimeShow: false,
        timeColumns: [],
        minHour: 10,
        maxHour: 20,
        minDate: new Date(new Date() - 365 * 24 * 60 * 60 * 1000).getTime(),
        maxDate: new Date().getTime(),
        currentDate: new Date().getTime(),
        marginTopview: app.globalData.navBarHeight



    },
    onClickLeft() {
        wx.navigateBack({
            delta: 1
        })
    },
    selectType() {
        this.setData({
            selectTypeShow: true
        })

    },
    selectValue() {
        this.setData({
            selectValueShow: true
        })
    },
    selectTime() {
        this.setData({
            selectTimeShow: true
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
    onConfirmType(e) {
        console.log(e)
        this.setData({
            bloodSugarType: e.detail.index,
            bloodSugarTypeValue: e.detail.value,
            selectTypeShow: false
        })
    },
    onCancelType() {
        this.setData({
            selectTypeShow: false
        })
    },
    onConfirmValue(e) {
        console.log(e)
        this.setData({
            bloodSugarValue: e.detail.value,
            selectValueShow: false
        })
    },
    onCancelValue() {
        this.setData({
            selectValueShow: false
        })
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
    onInput(event) {
        console.log('event', event)
        this.setData({
            currentDate: event.detail,
        });
    },
    onCancelTime() {
        this.setData({
            selectTimeShow: false
        })
    },
    addRec() {
        let data = {
            bloodSugarLevel: this.data.bloodSugarValue,
            bloodSugarType: this.data.bloodSugarType,
            bloodSugarTime: this.data.bloodSugarTime,
            userId: wx.getStorageSync('userInfo').id
        }
        app.$api.addBloodSugarData(data).then(res => {
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
        let valueColumns = []
        for (let i = 2.0; i <= 10.0; i += 0.1) {
            valueColumns.push(i.toFixed(1))
        }

        this.setData({
            valueColumns: valueColumns
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