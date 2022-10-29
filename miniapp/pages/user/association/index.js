// pages/user/association/index.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    marginTopview: app.globalData.navBarHeight,
    healthData: {},
    userId: '',
    activeName: '1',
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onChange(event) {
    this.setData({
      activeName: event.detail,
    });
  },
  async getMyAssociation() {
    let data = {
      userId: wx.getStorageSync('userInfo').id,
    }
    let res = await app.$api.getMyAssociation(data)
    console.log('res', res)
    this.setData({
      healthData: res.data
    })
  },
  async Audit(e) {
    console.log('e', e)
    let data = {
      userId: wx.getStorageSync('userInfo').id,
      AssociationId: e.currentTarget.dataset.id
    }
    let res = await app.$api.Audit(data)
    console.log('res', res)
    if (res.status == 200) {
      wx.showToast({
        title: res.data,
        icon: 'success',
        duration: 2000
      })
      this.getMyAssociation()
    } else {
      wx.showToast({
        title: res.data,
        icon: 'error',
        duration: 2000
      })
    }
  },
  gotouserinfo(e) {
    console.log('e', e.currentTarget.dataset.userid)
    wx.navigateTo({
      url: '/pages/user/association/userinfo/index?userid=' + e.currentTarget.dataset.userid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      userId: options.userId ? options.userId : wx.getStorageSync('userInfo').id
    })
    this.getMyAssociation()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})