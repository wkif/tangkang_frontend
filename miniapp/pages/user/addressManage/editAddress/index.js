// pages/user/addressManage/editAddress/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: 1,
        name: '',
        phone: '',
        baseAddress: ['广东省', '广州市', '海珠区'],
        address: '',
        isDefault: true,
        postalCode: '',
        editFlag: false,

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        let addI = JSON.parse(options?.add)
        if (addI) {
            this.setData({
                id: addI.id,
                name: addI.name,
                phone: addI.phone,
                baseAddress: addI.baseAddress.split(','),
                address: addI.address,
                postalCode: addI.postalCode,
                isDefault: addI.isDefault,
                editFlag: true
            })
        }
        else {
            this.setData({
                id: 1,
                name: '',
                phone: '',
                baseAddress: ['', '', ''],
                postalCode: '',
                isDefault: false
            })
        }
    },
    onClickLeft() {
        wx.navigateBack({
            delta: 1
        })
    },
    onChange({ detail }) {
        // 需要手动对 checked 状态进行更新
        this.setData({ isDefault: detail });
    },
    RegionChange: function (e) {
        if (app.globalData.speedFlag) {
            app.$Text2Speech(e.detail.value.join(''))
        }
        this.setData({
            baseAddress: e.detail.value
        })
    },
    onClick() {
        let data = {
            userId: wx.getStorageSync('userInfo').id,
            name: this.data.name,
            phone: this.data.phone,
            baseAddress: this.data.baseAddress.join(','),
            address: this.data.address,
            postalCode: this.data.postalCode,
            isDefault: this.data.isDefault,
        }
        app.$api.addAddressByUserid(data).then(res => {
            if (res.status === 200) {
                wx.navigateBack({
                    delta: 1
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
    submitEdit() {
        let data = {
            userId: wx.getStorageSync('userInfo').id,
            addressId: this.data.id,
            name: this.data.name,
            phone: this.data.phone,
            baseAddress: this.data.baseAddress.join(','),
            address: this.data.address,
            postalCode: this.data.postalCode,
            isDefault: this.data.isDefault,
        }
        app.$api.editAddress(data).then(res => {
            if (res.status === 200) {
                wx.showToast({
                    title: res.data,
                    icon: 'success',
                    duration: 2000
                })
                wx.navigateBack({
                    delta: 1
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