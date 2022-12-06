// pages/shop/orderManage/Comment/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    marginTopview: app.globalData.navBarHeight,
    orderId: '',
    good_no: '',
    order:{},
    content:'',
    score:''
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('options', options)
    this.setData({
      good_no: options.good_no,
      orderId: options.order_id,
    })
    this.getData()
  },
 async getData(){
    let res  = await app.$api.getOrderById({
      userId: wx.getStorageSync('userInfo').id,
      orderId:this.data.orderId
    }) 
    this.setData({
      order:res.data
    })
  },
  inputContent(e){
    this.setData({
      content:e.detail
    })
  },
  inputScore(e){
    this.setData({
      score:e.detail
    })
  },
  async submit(){
    let data={
      userId: wx.getStorageSync('userInfo').id,
      skuId: Number(this.data.good_no),
      orderId:this.data.orderId,
      content: this.data.content,
      score: this.data.score
    }
    let res = await app.$api.addCommitById(data)
    console.log('res',res)
    if(res.status == 200){
      wx.showToast({
        title: '成功',
        duration: 2000,
        icon: 'success',
      })
      setTimeout(()=>{
        wx.navigateBack({
          delta: 1,
        })
      },2000)
    }else{
      wx.showToast({
        title: res.data,
        duration: 2000,
        icon: 'error',
      })
    }
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