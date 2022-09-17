// pages/shop/goodDetail/index.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodId: '',
        goodDetail: {},
        swiperList: [],
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
        this.setData({
            goodId: options.goodId
        })
        this.getGoodDetail()

    },
    async getGoodDetail() {
        let data = {
            goodsId: Number(this.data.goodId),
            userId: wx.getStorageSync('userInfo').id
        }
        let res = await app.$api.getGoodDetail(data)
        if (res.status == 200) {
            this.setData({
                goodDetail: res.data,
                swiperList: res.data.imgList.split(',')
            })
        } else {
            wx.showToast({
                title: res.data,
                icon: 'none',
                duration: 2000
            })
        }
        // console.log('this.data.goodDetail.imgList', this.data.goodDetail.imgList)
        // this.setData({
        //     swiperList: this.data.goodDetail.imgList.split(",")
        // })
    },
    gotoOrderManage() {
        wx.navigateTo({
            url: '/pages/shop/orderManage/index'
        })
    },
    addOrder(e) {
        console.log('e', e.currentTarget.dataset.goodid)
        wx.navigateTo({
            url: `/pages/shop/addOrder/index?goodId=${e.currentTarget.dataset.goodid}`
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