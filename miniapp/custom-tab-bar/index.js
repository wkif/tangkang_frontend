// custom-tab-bar/index.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    active: 0,
    list: []
  },
  attached: function () {
    // if (!app.$shallowEqual(this.data.list, (wx.getStorageSync('tabList')))) {
    //     this.setData({
    //         list: (wx.getStorageSync('tabList'))
    //     })
    // }
    this.getTabList()
    // console.log('this.data.list', this.data.list)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      console.log('event', event)
      // event.detail 的值为当前选中项的索引
      
      let path = this.data.list[event.detail].pagePath
      wx.switchTab({
        url: path,
      })
      this.setData({
        active: event.detail
      });

    },
    getTabList() {
      app.$api.getTabList().then(res => {
        console.log('restan!!!', res)
        if (res.status == 200) {
          if (!app.$shallowEqual(res.data, this.data.list)) {
            wx.setStorageSync('tabList', (res.data))
            this.setData({
              list: res.data
            })
            console.log('更新')
          } else {
            console.log('不用更新')
          }
        }else{
          console.log('本地数据')
          this.setData({
            list: wx.getStorageSync('tabList')
          })
        }
        // console.log('this.globalData.tabList', this.globalData.tabList)
      })
    }



  }
})