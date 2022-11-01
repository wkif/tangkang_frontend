// app.js
App({
  // 引入`towxml3.0`解析方法
  towxml: require('/towxml/index'),
  $api: require('./utils/api').API,
  $Text2Speech: require('./utils/util').Text2Speech,
  $formatTime: require('./utils/util').formatTime,
  $shallowEqual: require('./utils/util').shallowEqual,
  $delHtmlTag: require('./utils/util').delHtmlTag,
  $stopbgam: require('./utils/util').stopbgam,
  $isPhone: require('./utils/util').isPhone,
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
    this.globalData.navBarHeight = this.globalData.menuTopSpace * 2 + menuButtonInfo.height + systemInfo.statusBarHeight + 10;
    // 状态栏高
    let tabList = [
      {
        "name": "首页",
        "selectedIconPath": "/assets/icon/home-active.png",
        "iconPath": "/assets/icon/home.png",
        "pagePath": "/pages/home/index"
      },
      {
        "name": "记录",
        "selectedIconPath": "/assets/icon/add-active.png",
        "iconPath": "/assets/icon/add.png",
        "pagePath": "/pages/record/index"
      },
      {
        "name": "我的",
        "selectedIconPath": "/assets/icon/user-active.png",
        "iconPath": "/assets/icon/user.png",
        "pagePath": "/pages/user/index"
      }
    ]
    wx.setStorageSync('tabList', tabList)
    this.globalData.statusBarHeight = systemInfo.statusBarHeight;

    this.$api.getspeed({
      userId: wx.getStorageSync('userInfo').id
    }).then(res => {
      console.log('speedFlagres', res)
      this.globalData.speedFlag = res.data
    })

    this.getTabList()


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
    tabList: [],
    version:'0.7.1'
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
  getTabList() {
    this.$api.getTabList().then(res => {
      // console.log('restan!!!', res)
      if (res.status == 200) {
        if (!this.$shallowEqual(res.data, (wx.getStorageSync('tabList')))) {
          // this.globalData.tabList = res.data
          wx.setStorageSync('tabList', (res.data))
          console.log('更新')
        } else {
          console.log('不用更新')
        }

      }
      // console.log('this.globalData.tabList', this.globalData.tabList)
    })
  }
})
