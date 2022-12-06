// pages/shop/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgSrc: 'https://kifimg.oss-cn-beijing.aliyuncs.com/project/202205302251490.png',
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        Custom: app.globalData.Custom,
        TabCur: 0,
        MainCur: 0,
        VerticalNavTop: 0,
        list: [],
        load: true,
        topList: [],
    },
    async getGoodsData() {
        let res = await app.$api.getShopList()
        console.log('res', res)
        if (res.status == 200) {
            let list = res.data
            this.setData({
                list: list,
                listCur: list[0]
            })
        }
    },
    async getTopGoods() {
        let res = await app.$api.getTopGoods()
        console.log('res', res)
        if (res.status == 200) {
            let list = res.data
            this.setData({
                topList: list,

            })
        }
    },
    onClickLeft() {
        wx.navigateBack({
            delta: 1
        })
    },
    gotoGoodDetail(e) {
        console.log('e',e)
        wx.navigateTo({
            url: `/pages/shop/goodDetail/index?goodId=${e.currentTarget.dataset.id}`
        })
    },
    onLoad() {
        wx.showLoading({
            title: '加载中...',
            mask: true
        });
        this.getGoodsData()
        this.getTopGoods()
        // let list = [{}];
        // for (let i = 0; i < 26; i++) {
        //     list[i] = {};
        //     list[i].name = String.fromCharCode(65 + i);
        //     list[i].id = i;
        // }
        // this.setData({
        //     list: list,
        //     listCur: list[0]
        // })
    },
    onReady() {
        wx.hideLoading()
    },
    tabSelect(e) {
        this.setData({
            TabCur: e.currentTarget.dataset.id,
            MainCur: e.currentTarget.dataset.id,
            VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
        })
    },
    VerticalMain(e) {
        let that = this;
        let list = this.data.list;
        let tabHeight = 0;
        if (this.data.load) {
            for (let i = 0; i < list.length; i++) {
                let view = wx.createSelectorQuery().select("#main-" + list[i].id);
                view.fields({
                    size: true
                }, data => {
                    list[i].top = tabHeight;
                    tabHeight = tabHeight + data.height;
                    list[i].bottom = tabHeight;
                }).exec();
            }
            that.setData({
                load: false,
                list: list
            })
        }
        let scrollTop = e.detail.scrollTop + 20;
        for (let i = 0; i < list.length; i++) {
            if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
                that.setData({
                    VerticalNavTop: (list[i].id - 1) * 50,
                    TabCur: list[i].id
                })
                return false
            }
        }
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
    onRefresh:function(){
        //导航条加载动画
        wx.showNavigationBarLoading()
        //loading 提示框
      //   wx.showLoading({
      //     title: '加载中...',
      //   })
        console.log("下拉刷新啦");
        this.getGoodsData()
        this.getTopGoods()
      },
    
      /**
       * 页面相关事件处理函数--监听用户下拉动作
       */
      onPullDownRefresh: function () {
        this.onRefresh();
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