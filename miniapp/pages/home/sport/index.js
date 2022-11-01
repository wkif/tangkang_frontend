// pages/home/announcement/index.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        Data: {},
        marginTopview: app.globalData.navBarHeight,
        sportsList: [],
        backimgList: [
            "https://kifimg.oss-cn-beijing.aliyuncs.com/project/202209121054152.png",
            "https://kifimg.oss-cn-beijing.aliyuncs.com/project/202209121105780.png",
            "https://kifimg.oss-cn-beijing.aliyuncs.com/project/202209121107824.png"
        ]
    },
    onClickLeft() {
      wx.switchTab({
        url: '/pages/home/index',
      })
    },
    async getSportsRecordsByid() {
        let data = {
            userId: wx.getStorageSync('userInfo').id
        }
        let res = await app.$api.getSportsRecordsByid(data)
        console.log('res', res)
        if (res.status == 200) {
            // let a = res.data[0]
            // for (let i = 0; i < 10; i++) {
            //     res.data.push(a)
            // }
            this.setData({
                sportsList: res.data
            })
        } else {
            wx.showToast({
                title: res.data,
                duration: 2000,

            })
        }
    },

    addSportsRecords() {
        wx.navigateTo({
            url: '/pages/home/sport/addSportsRecords/index',

        })
    },
    dailySportList() {
        wx.navigateTo({
            url: '/pages/home/sport/dailySportList/index',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getSportsRecordsByid()
    },
    onRefresh:function(){
      //导航条加载动画
      wx.showNavigationBarLoading()
      //loading 提示框
      wx.showLoading({
        title: 'Loading...',
      })
      console.log("下拉刷新啦");
      this.getSportsRecordsByid()
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