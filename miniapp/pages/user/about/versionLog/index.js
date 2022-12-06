// pages/user/about/versionLog/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logList: [
      {
        version: '0.7.5',
        time: '2022-12-7 3:53',
        content: [
          "修复饮食记录选择弹窗高度",
          "修复食品数据库加载失败",
          "修复食品数据库图片上传"
        ]
      },
      {
        version: '0.7.4',
        time: '2022-12-4 22:33',
        content: [
          "商城首页优化",
          "商城评论"
        ]
      },
      {
        version: '0.7.3',
        time: '2022-12-3 17:33',
        content: [
          "性别选择用男女",
          "适老化优化",
          "登录后信息填写模块不必须",
          "足背静脉搏动"
        ]
      },
      {
        version: '0.7.2',
        time: '2022-11-3 13:33',
        content: [
          "修复tab",
          "优化信息编辑引导"
        ]
      },
      {
        version: '0.7.1',
        time: '2022-11-1 15:33',
        content: [
          "优化部分功能"
        ]
      },
      {
        version: '0.7.0',
        time: '2022-10-31 22:33',
        content: [
          "新增资讯视频",
          "新增动效处理",
          "修复已知Bug"
        ]
      },
      {
        version: '0.6.0',
        time: '2022-10-30 18:33',
        content: [
          "新增敏感词过滤",
          "修复已知Bug"
        ]
      },
      {
        version: '0.5.0',
        time: '2022-10-29 17:33',
        content: [
          '新增语音提示场景 ',
          ' 优化资讯模块评论',
          '修复制定目标模块bug '
        ]
      }, {
        version: '0.4.0',
        time: '2022-10-29 17:33',
        content: [
          '新增用户关联； ',
          ' 新增资讯点赞；',
          '新增资讯语音播放； ',
          '新增制定目标模块；',
          ' 新增公告'
        ]
      },
      {
        version: '0.3.1',
        time: '2022-09-14 21:33',
        content: [
          '修复：修复已知Bug',
        ]
      },
      {
        version: '0.3.0',
        time: '2022-08-14 21:33',
        content: [
          '新增功能：资讯功能',
        ]
      },
      {
        version: '0.2.0',
        time: '2022-08-07 20:33',
        content: [
          '新增功能：商店基础功能',
        ]
      },
      {
        version: '0.1.0',
        time: '2022-07-31 15:33',
        content: [
          '新增功能：增加用户登录退出；用户信息更改；用户个性化系统设置；用户地址管理；在线客服；',
          "新增功能：用户血糖值日记录管理；用户血糖可视化分析；用户不定期记录管理；食品数据库；",
          '新增功能：积分商城基础版；饮食记录',
        ]
      }
    ]
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
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