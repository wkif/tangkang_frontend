// pages/user/index.js
// const $api = require('../../utils/api').API;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    InviteFriendsNum: 13,
    loginFlag: false,
    iconBox: [
      // {
      //     icon: '../../assets/img/informationManage.svg',
      //     name: '信息管理',
      //     path: '/pages/user/informationManage/index'
      // },
      {
        icon: '../../assets/img/integral.svg',
        name: '积分',
        path: '/pages/user/integral/index'
      },
      {
        icon: '../../assets/img/orderManage.svg',
        name: '订单',
        path: '/pages/shop/orderManage/index'
      },
      {
        icon: '../../assets/img/Association.svg',
        name: '关联',
        path: '/pages/user/association/index'
      }
    ],
    cellList: [
      // {
      //   title: '信息管理',
      //   path: '/pages/user/informationManage/index',
      //   icon: 'edit',
      //   label: '管理您的个人信息'
      // },
      {
        title: '地址管理',
        path: '/pages/user/addressManage/index',
        icon: 'location-o',
        label: '管理您的收货地址'
      },
      {
        title: '设置',
        path: '/pages/user/setting/index',
        icon: 'setting-o',
        label: '个性化设置'
      },
      {
        title: '关于我们',
        path: '/pages/user/about/index',
        icon: 'info-o',
        label: '了解我们的项目'
      },
      {
        title: '用户协议',
        path: '/pages/user/userAgreement/index',
        icon: 'question-o',
        label: '请仔细阅读本《用户协议》'
      }
    ],
    inviteCode: 'DYX6866IA5A4MZID',
    marginTopview: app.globalData.navBarHeight
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad', options)
    this.setData({
      loginFlag: app.globalData.loginFlag,
      userInfo: wx.getStorageSync('userInfo'),
      inviteCode: options?.inviteCode
      // inviteCode:'DYX6866IA5A4MZID'
    })
    if (!this.data.loginFlag) {
      app.loginAutomatic().then(res => {
        console.log('res', res)
        this.setData({
          loginFlag: true,
          userInfo: wx.getStorageSync('userInfo')
        })
      }).catch(err => {
        console.log('err', err)
        this.setData({
          loginFlag: false
        })
      })
    }
  },
  doLogin() {

    let that = this
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
              app.$api.wxLogin({
                code: res.code,
                info: userInfo,
                inviteCode: that.data.inviteCode
              }).then(res => {
                // console.log('123131', res)
                if (res.status == 200) {
                  wx.setStorageSync('token', res.token)
                  wx.setStorageSync('userInfo', res.data)
                  this.setData({
                    loginFlag: true,
                    userInfo: res.data
                  })
                  app.globalData.loginFlag = true
                  app.globalData.speedFlag = res.data.speed
                  if (!res.data.mobile) {
                    wx.showToast({
                      title: '请完善信息',
                      icon: 'none',
                      duration: 2000
                    })
                    setTimeout(() => {
                      wx.navigateTo({
                        url: '/pages/user/informationManage/index',
                      })
                    }, 2000)
                  }
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

  loginOut() {
    wx.removeStorageSync('token')
    wx.removeStorageSync('userInfo')
    this.setData({
      loginFlag: false
    })
    app.globalData.loginFlag = false
  },
  gotoInfor(e) {
    console.log('e', e.currentTarget.dataset.path)
    if (!this.data.loginFlag) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000 //持续的时间
      })
      this.doLogin()
    } else {
      wx.navigateTo({
        url: e.currentTarget.dataset.path,
      })
    }

  },
  gotouserInfo() {
    wx.navigateTo({
      url: "/pages/user/association/userinfo/index?userid=" + wx.getStorageSync('userInfo').id,
    })
  },
  // gotointegral() {
  //     if (!this.data.loginFlag) {
  //         wx.showToast({
  //             title: '请先登录',
  //             icon: 'none',
  //             duration: 2000//持续的时间
  //         })
  //         this.doLogin()
  //     } else {
  //         wx.navigateTo({
  //             url: '/pages/user/integral/index',
  //         })
  //     }
  // },
  onShareAppMessage: function () {
    if (this.data.userInfo) {
      return {
        title: '糖康有道',
        imageUrl: 'https://s3.bmp.ovh/imgs/2022/10/27/a89b4a11fb710c4b.png',
        desc: '分享页面的内容',
        path: '/pages/user/index?inviteCode=' + this.data.userInfo.inviteCode // 路径，传递参数到指定页面。
      }
    } else {
      return {
        title: '糖康有道',
        imageUrl: 'https://s3.bmp.ovh/imgs/2022/10/27/a89b4a11fb710c4b.png',
        desc: '分享页面的内容',
        path: '/pages/user/index'
      }
    }



  },
  gotoCell(e) {
    let path = e.currentTarget.dataset.path
    if (path == '/pages/user/addressManage/index') {
      if (this.data.loginFlag) {
        wx.navigateTo({
          url: path,
        })
      } else {
        wx.showToast({
          title: '请先登录',
          icon: 'none',
          duration: 2000 //持续的时间
        })
        this.doLogin()
      }
    } else {
      wx.navigateTo({
        url: path,
      })
    }


    // wx.navigateTo({
    //     url: path,
    // })
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
    if (this.data.loginFlag &&!this.data.userInfo.mobile) {
      wx.showToast({
        title: '请完善信息',
        icon: 'none',
        duration: 1000
      })
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/user/informationManage/index',
        })
      }, 1000)
    }
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