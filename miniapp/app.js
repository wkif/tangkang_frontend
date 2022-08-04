// app.js

App({
  // 引入`towxml3.0`解析方法
  towxml: require('/towxml/index'),
  $api: require('./utils/api').API,
  $Text2Speech: require('./utils/util').Text2Speech,
  $formatTime: require('./utils/util').formatTime,
  onLaunch: function (options) {
    // 获取系统信息
    const systemInfo = wx.getSystemInfoSync();
    // 胶囊按钮位置信息
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    // 胶囊到状态栏的间距
    this.globalData.menuTopSpace = menuButtonInfo.top - systemInfo.statusBarHeight;
    // 胶囊到右边的间距
    this.globalData.menuRightSpace = systemInfo.screenWidth - menuButtonInfo.right;
    // 胶囊高
    this.globalData.menuHeight = menuButtonInfo.height;
    // 导航栏高度 = 状态栏到胶囊的间距（胶囊上边界坐标 - 状态栏高度） * 2 + 胶囊高度 + 状态栏高度
    this.globalData.navBarHeight = this.globalData.menuTopSpace * 2 + menuButtonInfo.height + systemInfo.statusBarHeight;
    // 状态栏高
    this.globalData.statusBarHeight = systemInfo.statusBarHeight;
    if (this.globalData.speedFlag) {
      this.$api.getspeed({
        userId: wx.getStorageSync('userInfo').id
      }).then(res => {
        console.log('speedFlagres', res)
        this.globalData.speedFlag = res.data
      })
    }


  },
  globalData: {
    appName: '糖康有道',
    navBarHeight: 0,
    menuTopSpace: 0,
    menuTopSpace: 0,
    menuHeight: 0,
    statusBarHeight: 0,
    userInfo: null,
    loginFlag: false,
    speedFlag: false,
  },
  //设置tabbar的选中 添加一个全局方法
  setTabBarIndex(index) {
    if (typeof this.$mp.page.getTabBar === 'function' &&
      this.$mp.page.getTabBar()) {
      this.$mp.page.getTabBar().setData({
        selected: index
      })
    }
  },
  loginAutomatic() {
    return new Promise((resolve, reject) => {
      let token = wx.getStorageSync('token')
      let userinfo = wx.getStorageSync('userInfo')
      let that = this
      if (token && userinfo) {
        console.log('自动登录')
        that.$api.verifyToken({
          token: token
        }).then(res => {
          console.log('res1', res)
          if (res?.code == 401) {
            // 弹窗
            wx.showModal({
              title: '提示',
              content: '登录已过期，请重新登录',

            })
            wx.removeStorageSync('token')
            wx.removeStorageSync('userInfo')
            that.globalData.loginFlag = false
            reject()
          }
          else if (res) {
            that.globalData.loginFlag = true
            resolve()
          }
          else {
            wx.removeStorageSync('token')
            wx.removeStorageSync('userInfo')
            that.globalData.loginFlag = false
            reject()
          }
        })
      } else {
        that.globalData.loginFlag = false
        reject()
      }



    }
    )

  },



})
