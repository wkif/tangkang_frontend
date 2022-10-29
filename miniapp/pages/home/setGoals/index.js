// pages/home/setGoals/index.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        bloodSugar_targetValue_list: [],
        bloodSugar_targetValue_list_Index: 0,
        SportTargetValue: {
            heat: '',
            updateDate: ''
        },
        FoodTargetValue: {
            heat: '',
            updateDate: ''
        },
        isEdit: false,
        show: false,
        showFlag: '',
        valueColumns: [
            // {
            //   values:[1,2,3,4]
            // },
            // {
            //   values:[1,2,3,4]
            // }
        ],
        heatValueColumn: [],
        marginTopview: app.globalData.navBarHeight

    },
    onChange(event) {
        const { picker, value, index } = event.detail;
        console.log({ picker, value, index })
        if (value[0] >= value[1]) {
            wx.showToast({
                title: "数据有误",
                icon: 'none',
                duration: 2000
            })
            return
        }
        if (app.globalData.speedFlag) {
            app.$Text2Speech(value[0] + "至" + value[1])
        }
        let x = this.data.bloodSugar_targetValue_list
        x.targetValue[this.data.bloodSugar_targetValue_list_Index].value = value
        this.setData({
            bloodSugar_targetValue_list: x,
            isEdit: true
        })
    },
    onChange1(e) {
        const { picker, value, index } = e.detail;
        if (app.globalData.speedFlag) {
            app.$Text2Speech(value)
        }
        this.setData({
            'SportTargetValue.heat': value,
            isEdit: true
        })
    },
    onChange2(e) {
        const { picker, value, index } = e.detail;
        if (app.globalData.speedFlag) {
            app.$Text2Speech(value)
        }
        this.setData({
            'FoodTargetValue.heat': value,
            isEdit: true
        })
    },
    onClickLeft() {
        // wx.navigateBack({
        //     delta: 1
        // })
        wx.switchTab({
            url: '/pages/home/index',
        })
    },
    showPopup() {
        this.setData({ show: true });
    },

    onClose() {
        this.setData({ show: false });
    },
    async getBloodGlucoseTargetValue() {
        let data = {
            userId: wx.getStorageSync('userInfo').id,
        }
        let res = await app.$api.getBloodGlucoseTargetValue(data)
        console.log('getBloodGlucoseTargetValueres', res)
        if (res.status !== 200) {
            wx.showToast({
                title: res.data,
                icon: 'none',
                duration: 2000
            })
        } else {
            this.setData({
                bloodSugar_targetValue_list: res.data
            })
        }
    },
    async getSportTargetValue() {
        let data = {
            userId: wx.getStorageSync('userInfo').id,
        }
        let res = await app.$api.getSportTargetValue(data)
        console.log('res', res)
        if (res.status !== 200) {
            wx.showToast({
                title: res.data,
                icon: 'none',
                duration: 2000
            })
        } else {
            this.setData({
                SportTargetValue: res.data
            })
        }
    },
    async getFoodTargetValue() {
        let data = {
            userId: wx.getStorageSync('userInfo').id,
        }
        let res = await app.$api.getFoodTargetValue(data)
        console.log('res', res)
        if (res.status !== 200) {
            wx.showToast({
                title: res.data,
                icon: 'none',
                duration: 2000
            })
        } else {
            this.setData({
                FoodTargetValue: res.data
            })
        }
    },
    bloodSugarEdit(e) {
        console.log('e', e)
        this.setData({
            showFlag: 0,
            bloodSugar_targetValue_list_Index: e.target.dataset.index,
            show: true
        })
    },
    SportTargetValueEdit() {
        this.setData({
            showFlag: 1,
            show: true
        })
    },
    FoodTargetValueEdit() {
        this.setData({
            showFlag: 2,
            show: true
        })
    },
    noBomBox(Event) {
        document.activeElement.blur();
    },
    submit() {
        let data_suger = {
            userId: wx.getStorageSync('userInfo').id,
            bloodSugar0_targetValue: '',
            bloodSugar1_targetValue: '',
            bloodSugar2_targetValue: '',
            bloodSugar3_targetValue: '',
            bloodSugar4_targetValue: '',
            bloodSugar5_targetValue: '',
            bloodSugar6_targetValue: '',
            bloodSugar7_targetValue: '',
            bloodSugar8_targetValue: '',
            bloodSugar9_targetValue: ''
        }
        this.data.bloodSugar_targetValue_list.targetValue.forEach((item, index) => {
            data_suger['bloodSugar' + index + '_targetValue'] = item.value
        })
        let promise_1 = app.$api.addBloodGlucoseTargetValue(data_suger)
        let SportTarget = {
            userId: wx.getStorageSync('userInfo').id,
            heat: this.data.SportTargetValue.heat
        }
        let promise_2 = app.$api.addSportTargetValue(SportTarget)
        let FoodTarget = {
            userId: wx.getStorageSync('userInfo').id,
            heat: this.data.FoodTargetValue.heat
        }
        let promise_3 = app.$api.addFoodTargetValue(FoodTarget)
        let that = this
        Promise.all([promise_1, promise_2, promise_3]).then(function (values) {
            const flag = values.some(item => item.status !== 200)
            if (flag) {
                wx.showToast({
                    title: '请重试',
                    icon: 'error',
                    duration: 2000
                })
            } else {
                wx.showToast({
                    title: '成功',
                    icon: 'success',
                    duration: 2000
                })
                if (app.globalData.speedFlag) {
                    app.$Text2Speech("成功")
                }
                setInterval(() => { that.onClickLeft() }, 2000)

            }
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let values = []
        for (let i = 2.0; i <= 10.0; i += 0.1) {
            values.push(i.toFixed(1))
        }
        let valueColumns = [
            {
                values: values
            },
            {
                values: values
            }
        ]
        let heatValueColumn = []
        for (let i = 1700; i <= 3000; i += 100) {
            heatValueColumn.push(i.toFixed(1))
        }
        this.setData({
            valueColumns: valueColumns,
            heatValueColumn: heatValueColumn
        })
        this.getBloodGlucoseTargetValue()
        this.getSportTargetValue()
        this.getFoodTargetValue()

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