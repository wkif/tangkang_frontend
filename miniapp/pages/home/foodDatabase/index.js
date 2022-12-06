// pages/home/foodDatabase/index.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dataList: {},
    tabList: [],
    searchValue: "",
    active: 0,
    data: [],
    dataShow: [], //控制数据懒加载处理 长度和商品列表相同 为true数据显示 false不显示
    scrollTop: 0, //数据列表的scrollTop
    currentNo: 10,
    marginTopview: app.globalData.navBarHeight,
  },

  onClickLeft() {
    wx.switchTab({
      url: "/pages/home/index",
    });
  },
  async getData() {
    let data = {
      foodName: this.data.searchValue,
    };
    let res = await app.$api.getfoodDatabaseByname(data);
    if (res.status == 200) {
      this.setData({
        dataList: res.data.foodDatabase,
        tabList: res.data.tablist,
        data: res.data.foodDatabase[this.data.active].food,
        dataShow: res.data.foodDatabase[this.data.active].food.slice(0, 10),
      });
    } else {
      wx.showToast({
        title: res.msg,
        icon: "none",
      });
      this.setData({
        dataList: [],
        // tabList: [],
        data: [],
        dataShow: [],
      });
    }
  },
  onChange(event) {
    console.log("event", event);
    let index = event.detail.index;
    console.log("this.data.dataList[index]", this.data.dataList[index]);
    this.setData({
      active: index,
      data: this.data.dataList[index].food,
      dataShow: this.data.dataList[index].food.slice(0, 10),
    });
  },
  search(e) {
    console.log("e", e.detail);
    this.setData({
      searchValue: e.detail,
    });
    this.getData();
  },
  goTop() {
    //scroll-view的方法
    this.setData({
      scrollTop: 0
    })

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  bindscrolltolower: function () {
    var allList = this.data.data;
    var currentNo = this.data.currentNo;
    var initList = [];
    // 剩余条数
    var surplus = allList.length - currentNo;
    if (surplus >= 10) {
      for (var i = 0; i < currentNo + 10; i++) {
        initList.push(allList[i]);
      }
      this.setData({
        currentNo: currentNo + 10,
        dataShow: initList,
      });
    } else {
      for (var i = 0; i < currentNo + surplus; i++) {
        initList.push(allList[i]);
      }
      this.setData({
        currentNo: currentNo + surplus,
        dataShow: initList,
      });
    }
  },
  //   scroll(e) {
  //     console.log(e);
  //   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    this.getData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
