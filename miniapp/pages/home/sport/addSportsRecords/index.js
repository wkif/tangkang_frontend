// pages/home/sport/addSportsRecords/index.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        marginTopview: app.globalData.navBarHeight,
        sportsType: [],
        formdata: {
            sportstypeid: 1,
            userId: wx.getStorageSync('userInfo').id,
            startTime: '',
            endTime: '',
        },
        type: '',
        columns: [],
        show: false,
        flag: 0,
        // minHour: 10,
        // maxHour: 20,
        minDate: new Date(new Date(new Date().toLocaleDateString()).getTime()).valueOf() - 43200000,
        maxDate: new Date().getTime(),
        // maxDate: new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1 - 1).valueOf(),
        currentDate: new Date().getTime(),

    },
    cancelTime() {
        this.setData({
            show: false
        })
    },
    enterTime(event) {
        if (event.currentTarget.dataset.flag == 1) {
            this.setData({
                show: false,
                ['formdata.startTime']: this.changeTime(event.detail)
            });
        } else {
            this.setData({
                show: false,
                ['formdata.endTime']: this.changeTime(event.detail)
            });
        }
    },
    seceletTime() {
        this.setData({
            show: true
        })
    },
    // 毫秒转换成 日期时间 格式“yyyy-MM-dd HH:MM:SS”
    changeTime(time) {
        if (time) {
            var oDate = new Date(time * 1),
                oYear = oDate.getFullYear(),
                oMonth = oDate.getMonth() + 1,
                oDay = oDate.getDate(),
                oHour = oDate.getHours(),
                oMin = oDate.getMinutes(),
                oSen = oDate.getSeconds(),
                oTime =
                    oYear +
                    "-" +
                    this.getBz(oMonth) +
                    "-" +
                    this.getBz(oDay) +
                    " " +
                    this.getBz(oHour) +
                    ":" +
                    this.getBz(oMin) +
                    ":" +
                    this.getBz(oSen); //拼接时间
            return oTime;
        } else {
            return "";
        }
    },
    //补0
    getBz(num) {
        if (parseInt(num) < 10) {
            num = "0" + num;
        }
        return num;
    },
    onChange(event) {
        const { picker, value, index } = event.detail;
        console.log('index', value, index)
        if (app.globalData.speedFlag) {
            app.$Text2Speech(this.data.sportsType[index].name)
        }
        this.setData({
            ['formdata.sportstypeid']: index + 1
        })
    },
    showPopup(e) {
        // console.log('e', e.target.dataset.flag)
        this.setData({
            show: true,
            flag: e.target.dataset.flag
        });
    },
    onClose() {
        this.setData({ show: false });
    },
    async getsportsType() {
        let res = await app.$api.getsportsType()
        console.log('res', res)
        if (res.status == 200) {
            if (!res.data.length) {
                wx.showToast({
                    title: '无类型请联系客服',
                    duration: 2000,
                    icon: 'error',

                })
            }
            let d = res.data.map(item => {
                return item.name
            })
            this.setData({
                sportsType: res.data,
                columns: d
            })
        }
    },
    async addSportsRecords() {
        if (!this.data.formdata.startTime) {
            wx.showToast({
                title: '选择开始时间',
                duration: 2000,
                icon: 'error',
            })
            if (app.globalData.speedFlag) {
                app.$Text2Speech('选择开始时间')
            }
            return
        }
        if (!this.data.formdata.endTime) {
            wx.showToast({
                title: '选择结束时间',
                duration: 2000,
                icon: 'error',

            })
            if (app.globalData.speedFlag) {
                app.$Text2Speech('选择结束时间')
            }
            return
        }
        console.log('new Date(this.data.formdata.startTime).getTime()', new Date(this.data.formdata.startTime).getTime())
        console.log('new Date(this.data.formdata.endTime).getTime()', new Date(this.data.formdata.endTime).getTime())
        if (new Date(this.data.formdata.endTime).getTime() < new Date(this.data.formdata.startTime).getTime()) {
            wx.showToast({
                title: '时间错误',
                duration: 2000,
                icon: 'error',

            })
            if (app.globalData.speedFlag) {
                app.$Text2Speech('时间错误')
            }
            return
        }
        let res = await app.$api.addSportsRecords(this.data.formdata)
        console.log('res', res)
        if (res.status == 200) {
            wx.showToast({
                title: '记录成功',
                duration: 2000,
                icon: 'success',

            })
            if (app.globalData.speedFlag) {
                app.$Text2Speech('记录成功')
            }
            this.onClickLeft()
        }
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
        this.getsportsType()
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