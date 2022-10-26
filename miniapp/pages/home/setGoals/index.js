// pages/home/setGoals/index.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        bloodSugar_targetValue_list: [],
        bloodSugar_targetValue_list_Index: 0,
        SportTargetValue: '',
        FoodTargetValue: '',
        isEdit: false,
        show: false,
        showFlag: ''

    },
    onClickLeft() {
        wx.navigateBack({
            delta: 1
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
    noBomBox(Event) {
		document.activeElement.blur();
	},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
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