// pages/shop/addOrder/index.js
const app = getApp();
const { regFenToYuan } = require('../../../utils/util');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodid: '',
        total_price: 1200,
        total_count: 1,
        goodDetail: {},
        addressList: [],
        address: ''
    },
    onClickLeft() {
        wx.navigateBack({
            delta: 1
        })
    },
    reduce() {
        if (this.data.total_count > 1) {
            this.setData({
                total_count: this.data.total_count - 1,
                total_price: this.data.goodDetail.price * (this.data.total_count - 1) * 100
            })
        }
    },
    add() {
        if (this.data.total_count < this.data.goodDetail.stock) {
            this.setData({
                total_count: this.data.total_count + 1,
                total_price: this.data.goodDetail.price * (this.data.total_count + 1) * 100
            })
        } else {
            wx.showToast({
                title: '库存不足',
                icon: 'none'
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log('options', options)
        this.setData({
            goodid: options.goodId
        })
        this.getGoodDetail()
        this.getAddressList()
    },
    async getGoodDetail() {
        let data = {
            goodsId: Number(this.data.goodid),
            userId: wx.getStorageSync('userInfo').id
        }
        let res = await app.$api.getGoodDetail(data)
        if (res.status == 200) {
            this.setData({
                goodDetail: res.data,
                total_price: res.data.price * 100,
            })
        } else {
            wx.showToast({
                title: res.data,
                icon: 'none',
                duration: 2000
            })
        }

    },
    async getAddressList() {
        let data = {
            userId: wx.getStorageSync('userInfo').id
        }
        let res = await app.$api.getAddressByUsrid(data)
        if (res.status == 200) {
            this.setData({
                addressList: res.data
            })
            res.data.forEach(element => {
                if (element.isDefault == 1) {
                    this.setData({
                        address: element
                    })
                }
            });
        } else {
            wx.showToast({
                title: res.data,
                icon: 'none',
                duration: 2000
            })
        }
    },
    onSubmit() {
        if (this.data.address == '') {
            wx.showToast({
                title: '请选择地址',
                icon: 'none',
                duration: 2000
            })
            return
        }
        // if(this.data.total_price!==this.data.total_count)
        let data = {
            userId: wx.getStorageSync('userInfo').id,
            goodId: Number(this.data.goodid),
            total_count: this.data.total_count,
            addressId: this.data.address.id,
            total_price: regFenToYuan(this.data.total_price)
        }
        app.$api.addOrder(data).then(res => {
            if (res.status == 200) {
                wx.showToast({
                    title: '添加成功',
                    icon: 'success',
                    duration: 2000
                })
                setTimeout(() => {
                    wx.navigateTo({
                        url: '/pages/shop/orderManage/index'
                    })
                }, 2000)
            } else {
                wx.showToast({
                    title: res.data,
                    icon: 'none',
                    duration: 2000
                })
            }
        }
        )



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