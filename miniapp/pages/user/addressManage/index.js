// pages/user/addressManage/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        addressList: [

        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    onClickLeft() {
        wx.navigateBack({
            delta: 1
        })
    },
    editAddress(e) {
        console.log(e)
        let addId = e.currentTarget.dataset.addressid
        let add = ''
        for (let i = 0; i < this.data.addressList.length; i++) {
            if (this.data.addressList[i].id == addId) {
                add = this.data.addressList[i]
            }
        }
        wx.navigateTo({
            url: `/pages/user/addressManage/editAddress/index?add=${JSON.stringify(add)}`
        })
    },
    handleDel(e) {
        let addId = e.currentTarget.dataset.addressid
        let that = this
        wx.showModal({
            title: '提示',
            content: '确定要删除该地址吗？',
            success(res) {
                if (res.confirm) {
                    let data = {
                        userId: wx.getStorageSync('userInfo').id,
                        addressId: addId
                    }
                    app.$api.deleteAddressByUserid(data).then(res => {
                        if (res.status === 200) {
                            that.getAdd()
                        } else {
                            wx.showToast({
                                title: res.data,
                                icon: 'none',
                                duration: 2000
                            })
                        }
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    getAdd() {
        let data = {
            userId: wx.getStorageSync('userInfo').id
        }
        app.$api.getAddressByUsrid(data).then(res => {
            console.log(res)
            if (res.status == 400) {
                wx.showToast({
                    title: res.data,
                    icon: 'none'
                })
            } else {
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].isDefault == 1) {
                        [res.data[0], res.data[i]] = [res.data[i], res.data[0]]
                    }
                }
                this.setData({
                    addressList: res.data
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
        this.getAdd()
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