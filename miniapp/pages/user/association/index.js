// pages/user/association/index.js
var app = getApp();
import Dialog from '@vant/weapp/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    marginTopview: app.globalData.navBarHeight,
    Data: {},
    userId: '',
    activeName: '1',
    searchValue: '',
    error: false,
    searchData: {},
    show: false,
    toggleDelay: false,
    flowerUrl: 'https://kifimg.oss-cn-beijing.aliyuncs.com/project/202211010005675.gif'
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
      Data: res.data,
    })

  },
  async Audit(e) {
    let data = {
      userId: wx.getStorageSync('userInfo').id,
      AssociationId: e.currentTarget.dataset.id
    }
    let res = await app.$api.Audit(data)
    if (res.status == 200) {
      wx.showToast({
        title: res.data,
        icon: 'success',
        duration: 2000
      })
      let data = this.data.Data
      data[e.currentTarget.dataset.index].imgactive = true
      data[e.currentTarget.dataset.index].is_active = true
      this.setData({
        Data: data
      })
      setTimeout(() => {
        this.getMyAssociation()
      }, 2000)
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
  onChange(e) {
    if (e.detail.length == 11) {
      if (app.$isPhone(e.detail)) {
        this.setData({
          error: false,
          searchValue: e.detail
        })
      } else {
        this.setData({
          error: true
        })
      }
    } else {
      this.setData({
        error: false,
        searchValue: e.detail
      })
    }

  },
  async onClick() {
    let data = {
      userId: wx.getStorageSync('userInfo').id,
      mobile: this.data.searchValue
    }
    let res = await app.$api.searchUserForAssociation(data)
    if (res.status == 200) {
      this.setData({
        searchData: res.data,
        show: true
      })

    } else {
      wx.showToast({
        title: res.data,
        icon: 'none',
        duration: 2000
      })
    }
  },
  async createAssociation() {
    let data = {
      userAId: wx.getStorageSync('userInfo').id,
      userBId: this.data.searchData.id
    }
    let res = await app.$api.createAssociation(data)
    // console.log('res', res)
    wx.showToast({
      title: res.data,
      icon: 'none',
      duration: 2000
    })
    this.getMyAssociation()

  },
   cancelAssociation(e) {
    let that = this
    Dialog.confirm({
        title: '取消',
        message: '确认？',
      }).then( async () =>  {
        let data = {
          userId: wx.getStorageSync('userInfo').id,
          AssociationId: e.currentTarget.dataset.id
        }
        let res = await app.$api.cancelAssociation(data)
        wx.showToast({
          title: res.data,
          icon: 'none',
          duration: 2000
        })
        that.getMyAssociation()


      })
      .catch(() => {
        // on cancel
      });


  },

  onClose() {
    this.setData({
      show: false
    });
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