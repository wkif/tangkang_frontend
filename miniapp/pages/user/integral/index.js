// pages/nodata/index.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        historyList: [],
        jfImg: '../../../assets/img/jf.svg',
        integralNum: 0,
        marginTopview: app.globalData.navBarHeight
    },
    onClickLeft() {
        wx.navigateBack({
            delta: 1
        })
    },
    async getHistory() {
        let data = {
            userId: wx.getStorageSync('userInfo').id,
        }
        let res = await app.$api.getIntegralHistory(data)
        if (res.status == 200) {
            this.setData({
                historyList: res.data
            })
        } else {
            wx.showToast({
                title: res.data,
                icon: 'none',
                duration: 2000
            })
        }


    },
    async getIntegral() {
        let data = {
            userId: wx.getStorageSync('userInfo').id,
        }
        let res = await app.$api.getUserIntegral(data)
        if (res.status == 200) {
            this.setData({
                integralNum: res.data
            })
            if (app.globalData.speedFlag) {
                app.$Text2Speech("当前积分为"+res.data)
              }
            
        } else {
            wx.showToast({
                title: res.data,
                icon: 'none',
                duration: 2000
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getHistory()
        this.getIntegral()
    },
    onRefresh:function(){
      //导航条加载动画
      wx.showNavigationBarLoading()
      //loading 提示框
      wx.showLoading({
        title: 'Loading...',
      })
      console.log("下拉刷新啦");
      this.getHistory()
      this.getIntegral()
      setTimeout(function () {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        //停止下拉刷新
        wx.stopPullDownRefresh();
      }, 2000)
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