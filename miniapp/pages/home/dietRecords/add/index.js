// pages/home/dietRecords/add/index.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    timevalue: '',
    // food: [
    //   {
    //     "food": {
    //       "id": 1,
    //       "heat": 123,
    //       "foodFat": 123,
    //       "foodName": "test1",
    //       "foodType": "蔬菜",
    //       "foodCalory": 123,
    //       "foodProtein": 123,
    //       "foodVitaminA": 123,
    //       "foodVitaminC": 123,
    //       "foodVitaminD": 123,
    //       "foodVitaminE": 123,
    //       "foodCarbohydrate": 123,
    //       "img": "https://img.yzcdn.cn/vant/cat.jpeg",
    //       "unit": "kg"
    //     },
    //     "number": 12
    //   },
    //   {
    //     "food": {
    //       "id": 3,
    //       "heat": 1,
    //       "foodFat": 1,
    //       "foodName": "dami",
    //       "foodType": "蔬菜",
    //       "foodCalory": 1,
    //       "foodProtein": 1,
    //       "foodVitaminA": 1,
    //       "foodVitaminC": 1,
    //       "foodVitaminD": 1,
    //       "foodVitaminE": 1,
    //       "foodCarbohydrate": 1,
    //       "img": "https://img.yzcdn.cn/vant/cat.jpeg",
    //       "unit": "kg"
    //     },
    //     "number": 13
    //   }
    // ],
    food: [],
    foodCalory: 0,
    foodProtein: 0,
    foodFat: 0,
    foodCarbohydrate: 0,
    foodVitaminA: 0,
    foodVitaminC: 0,
    foodVitaminE: 0,
    foodVitaminD: 0,
    heat: 0,

    foodList: [],


    // date
    timeShow: false,
    timeColumns: [],
    minHour: 10,
    maxHour: 20,
    minDate: new Date(new Date() - 365 * 24 * 60 * 60 * 1000).getTime(),
    maxDate: new Date().getTime(),
    currentDate: new Date().getTime(),

    // foodList
    show: true,
    result: [],
    marginTopview: app.globalData.navBarHeight
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onConfirmTime(e) {

    this.setData({
      currentDate: e.detail,
      timevalue: app.$formatTime(e.detail),
      timeShow: false
    })
    if (app.globalData.speedFlag) {
      app.$Text2Speech(app.$formatTime(e.detail))
    }
  },

  showTimePopup() {
    this.setData({ timeShow: true });
  },

  onCancelTime() {
    this.setData({
      selectTimeShow: false
    })
  },
  async getFoodList() {
    let res = await app.$api.getfoodDatabase()
    if (res.status == 200) {
      this.setData({
        foodList: res.data
      })
    }
  },
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
  onChange(event) {
    console.log('event', event.detail)
    this.setData({
      result: event.detail,
    });
    let food = this.data.food
    this.data.result.forEach(index => {
      console.log('index', index)
      // if (app.globalData.speedFlag) {
      //   app.$Text2Speech(this.data.foodList[index].foodName)
      // }
      let obj = {
        "food": this.data.foodList[index],
        "number": 1
      }
      console.log('obj', obj)
      // if (!food.includes(obj)) {
      //   food.push(obj)
      // }
      let flag = food.some(item => {
        if (item.food.id == obj.food.id) {
          return true
        }
      })
      if (!flag) {
        food.push(obj)
      }
    })
    this.setData({
      food: food
    })
    
    this.calculate()
  },
  add(e) {
    console.log('e', e.currentTarget.dataset.index)
    let food = this.data.food
    food[e.currentTarget.dataset.index].number++
    this.setData({
      food: food
    })
    this.calculate()
  },
  sub(e) {
    let food = this.data.food
    if (food[e.currentTarget.dataset.index].number > 1) {
      food[e.currentTarget.dataset.index].number--
    }
    this.setData({
      food: food
    })
    this.calculate()
  },
  handleDel(e) {
    console.log('e', e.currentTarget.dataset.index)
    let food = this.data.food
    // 询问

    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: res => {
        if (res.confirm) {
          food.splice(e.currentTarget.dataset.index, 1)
          this.setData({
            food: food
          })
          this.calculate()
        }
        if (res.cancel) {
        }
      }
    })



  },
  submit() {
    if (this.data.food.length == 0) {
      wx.showToast({
        title: '请选择食物',
        icon: 'none'
      })
      return
    }
    if (this.data.timevalue == '') {
      wx.showToast({

        title: '请选择时间',
        icon: 'none'
      })
      return
    }
    let data = {
      userId: wx.getStorageSync('userInfo').id,
      time: this.data.timevalue,
      food: this.data.food,
      foodCalory: this.data.foodCalory,
      foodProtein: this.data.foodProtein,
      foodFat: this.data.foodFat,
      foodCarbohydrate: this.data.foodCarbohydrate,
      foodVitaminA: this.data.foodVitaminA,
      foodVitaminC: this.data.foodVitaminC,
      foodVitaminE: this.data.foodVitaminE,
      foodVitaminD: this.data.foodVitaminD,
      heat: this.data.heat

    }
    app.$api.addDietRecords(data).then(res => {
      if (res.status == 200) {
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 2000
        })
        wx.navigateBack({
          delta: 1
        })
      } else {
        wx.showToast({
          title: '添加失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFoodList()
  },
  calculate() {
    let foods = this.data.food
    let calory = 0
    let protein = 0
    let fat = 0
    let carbohydrate = 0
    let vitaminA = 0
    let vitaminC = 0
    let vitaminE = 0
    let vitaminD = 0
    let heat = 0
    foods.forEach(item => {
      calory += item.food.foodCalory * item.number
      protein += item.food.foodProtein * item.number
      fat += item.food.foodFat * item.number
      carbohydrate += item.food.foodCarbohydrate * item.number
      vitaminA += item.food.foodVitaminA * item.number
      vitaminC += item.food.foodVitaminC * item.number
      vitaminE += item.food.foodVitaminE * item.number
      vitaminD += item.food.foodVitaminD * item.number
      heat += item.food.heat * item.number
    })
    this.setData({
      foodCalory: calory,
      foodProtein: protein,
      foodFat: fat,
      foodCarbohydrate: carbohydrate,
      foodVitaminA: vitaminA,
      foodVitaminC: vitaminC,
      foodVitaminE: vitaminE,
      foodVitaminD: vitaminD,
      heat: heat
    })


    // for (let i=0;i<foods.length;i++) {
    //   this.data.foodCalory += foods[i].food.foodCalory * foods[i].number
    //   this.data.foodProtein += foods[i].food.foodProtein * foods[i].number
    //   this.data.foodFat += foods[i].food.foodFat * foods[i].number
    //   this.data.foodCarbohydrate += foods[i].food.foodCarbohydrate * foods[i].number
    //   this.data.foodVitaminA += foods[i].food.foodVitaminA * foods[i].number
    //   this.data.foodVitaminC += foods[i].food.foodVitaminC * foods[i].number
    //   this.data.foodVitaminE += foods[i].food.foodVitaminE * foods[i].number
    //   this.data.foodVitaminD += foods[i].food.foodVitaminD * foods[i].number
    // }
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