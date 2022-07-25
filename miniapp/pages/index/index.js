const $api = require('../../utils/api').API;

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  doLogin() {
    console.log('kk')

    wx.getUserProfile({
      desc: '编辑会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      complete: (res) => {
        if (res.errMsg == "getUserProfile:ok") {
          console.log('成功了')
          //存储用户昵称和头像
          wx.setStorageSync('userInfo', {
            name: res.userInfo.nickName,
            img: res.userInfo.avatarUrl,
          });
          let userInfo = res.userInfo
          wx.login({
            success: res => {
              console.log(res)
              $api.wxLogin({
                code: res.code,
                info: userInfo
              }).then(res => {
                console.log('123131', res)
                if (res.status == 200) {
                  wx.setStorageSync('token', res.token)
                  wx.setStorageSync('userInfo', res.data)
                  // wx.navigateTo({
                  //   url: '/pages/index/index',
                  // })
                } else {
                  wx.showToast({
                    title: res.msg,
                    icon: 'none',
                    duration: 2000
                  })
                }
              })
            }
          })


        } else {
          console.log('234243', res)
        }

      }
    })



  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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