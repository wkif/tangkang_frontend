// pages/shop/orderManage/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderList: [],
        tabList: [
            '待支付',
            '待发货',
            '待收货',
            '待评价',
            '已完成',
            '已取消'
        ],
        TabCur: 0,
        scrollLeft: 0,
        currentList: [],
        marginTopview: app.globalData.navBarHeight,
    },
    tabSelect(e) {
        this.setData({
            TabCur: e.currentTarget.dataset.id,
            scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
            currentList: this.data.orderList[e.currentTarget.dataset.id]
        })
    },
    onClickLeft() {
        wx.navigateBack({
            delta: 1
        })
    },
    async getMyOrderList() {
        let data = {
            userId: wx.getStorageSync('userInfo').id
        }
        let res = await app.$api.getMyOrderList(data)
        if (res.status == 200) {
            this.setData({
                orderList: res.data,
                currentList: res.data[0]
            })
        } else {
            wx.showToast({
                title: res.data,
                icon: 'none',
                duration: 2000
            })
        }
    },
    payOrder(e) {
        console.log('e', e.currentTarget.dataset.id)
        let data = {
            orderId: e.currentTarget.dataset.id,
            userId: wx.getStorageSync('userInfo').id
        }
        app.$api.payOrder(data).then(res => {
            if (res.status == 200) {
                wx.showToast({
                    title: res.data,
                    icon: 'none',
                    duration: 2000
                })
                this.getMyOrderList()

                // wx.requestPayment({
                //     timeStamp: res.data.timeStamp,
                //     nonceStr: res.data.nonceStr,
                //     package: res.data.package,
                //     signType: res.data.signType,
                //     paySign: res.data.paySign,
                //     success: function (res) {
                //         console.log('success', res)
                //     },
                //     fail: function (res) {
                //         console.log('fail', res)
                //     }
                // })
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
    confirmOrder(e) {
        // console.log('e', e.currentTarget.dataset.id)
        let data = {
            orderId: e.currentTarget.dataset.id,
            userId: wx.getStorageSync('userInfo').id
        }
        app.$api.confirmOrder(data).then(res => {
            if (res.status == 200) {
                wx.showToast({
                    title: res.data,
                    icon: 'none',
                    duration: 2000
                })
                this.getMyOrderList()
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
    cancelOrder(e) {

        let data = {
            orderId: e.currentTarget.dataset.id,
            userId: wx.getStorageSync('userInfo').id
        }
        // 询问
        wx.showModal({
            title: '提示',
            content: '确定取消订单吗？',
            success: res => {
                if (res.confirm) {
                    app.$api.cancelOrder(data).then(res => {
                        if (res.status == 200) {
                            wx.showToast({
                                title: res.data,
                                icon: 'none',
                                duration: 2000
                            })
                            this.getMyOrderList()
                        } else {
                            wx.showToast({
                                title: res.data,
                                icon: 'none',
                                duration: 2000
                            })
                        }
                    })
                }
            }
        })
    },
    express(e) {
        console.log('e', e.currentTarget.dataset.trade_no)
        wx.showToast({
            title: '复制成功',
        })
        wx.setClipboardData({
            data: e.currentTarget.dataset.trade_no,
            success: function (res) {
                wx.getClipboardData({
                    success: function (res) {
                        console.log(res.data) // data
                    }
                })
            }
        })
    },
    commit(e){
        let good_no = e.currentTarget.dataset.good_no
        let order_id = e.currentTarget.dataset.order_id
        console.log('good_no',good_no)
        wx.navigateTo({
          url:  "/pages/shop/orderManage/Comment/index?good_no="+good_no+"&order_id="+order_id,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getMyOrderList()
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
        this.getMyOrderList()
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

    onRefresh:function(){
        //导航条加载动画
        wx.showNavigationBarLoading()
        //loading 提示框
      //   wx.showLoading({
      //     title: '加载中...',
      //   })
        console.log("下拉刷新啦");
        this.getMyOrderList()
        this.setData({
            TabCur: 0,
        })
      },
    
      /**
       * 页面相关事件处理函数--监听用户下拉动作
       */
      onPullDownRefresh: function () {
        this.onRefresh();
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