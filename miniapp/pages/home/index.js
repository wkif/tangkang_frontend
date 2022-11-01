// pages/home/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cardCur: 0,
        swiperList: [],
        searchValue: '',
        topnotice: {},

        date: {
            month: '',
            day: '',
        },
        lastBloodSugarData: '',
        iconList: [{
            icon: 'https://kifimg.oss-cn-beijing.aliyuncs.com/project/202209102314081.svg',
            color: 'red',
            name: '积分',
            path: '/pages/user/integral/index'
        }, {
            icon: 'https://kifimg.oss-cn-beijing.aliyuncs.com/project/202209102316888.svg',
            color: 'orange',
            name: '饮食记录',
            path: '/pages/home/dietRecords/index'
        }, {
            icon: 'https://kifimg.oss-cn-beijing.aliyuncs.com/project/202209102316024.svg',
            color: 'cyan',
            name: '运动打卡',
            path: '/pages/home/sport/index'
        }, {
            icon: 'https://kifimg.oss-cn-beijing.aliyuncs.com/project/202209102317637.svg',
            color: 'yellow',
            name: '食物数据库',
            path: '/pages/home/foodDatabase/index'
        }, {
            icon: 'https://kifimg.oss-cn-beijing.aliyuncs.com/project/202209102318049.svg',
            color: 'olive',
            name: '制定目标',
            path: '/pages/home/setGoals/index'
        }, {
            icon: 'https://kifimg.oss-cn-beijing.aliyuncs.com/project/202209102318327.svg',
            color: 'cyan',
            name: '关联家人',
            path: '/pages/nodata/index'
        }],
        newsList: [],
        searchHotValList: [

        ],
        searchHotValIndex: 0,
        searchHotVal: '',
        searchResList: [
            {
                id: 1,
                title: 'kif'
            },
            {
                id: 2,
                title: 'kif'
            }
            , {
                id: 3,
                title: 'kif'
            }
        ],
        show: false,

    },
    randomNum() {
        const num = Math.floor(Math.random() * (this.data.searchHotValList.length - 0 + 1)) + 0
        return num
    },
    changesearchHoeValIndex() {
        setInterval(() => {
            this.setData({
                searchHotVal: this.data.searchHotValList[this.randomNum()]
            })
        }, 3000)
    },
    onChange(e) {
        this.setData({
            searchValue: e.detail,
        });
    },
    onSearch() {
        console.log('搜索' + this.data.searchValue);
        let data = {}
        if (!this.data.searchValue) {
            data.newsname = this.data.searchHotVal.name
        } else {
            data.newsname = this.data.searchValue
        }
        this.searchNews(data)
    },
    // onClick() {
    //     console.log('搜索' + this.data.searchValue);
    //     let data = {}
    //     if (!this.data.searchValue) {
    //         data.newsname = this.data.searchHotVal.name
    //     } else {
    //         data.newsname = this.data.searchValue
    //     }
    //     this.searchNews(data)
    // },
    searchNews(data) {
        app.$api.searchNews(data).then(res => {
            console.log('searchNews', res)
            if (res.status == 200) {
                this.setData({
                    show: true,
                    searchResList: res.data,
                });
            } else {
                wx.showToast({
                    title: res.data,
                    icon: 'none',

                })
            }
        })
    },
    onClickHide() {
        this.setData({ show: false });
    },
    getHotSearch() {
        app.$api.getHotSearch().then(res => {
            console.log('getHotSearch', res)
            if (res.status == 200) {
                this.setData({
                    searchHotValList: res.data,
                });
            }
        })
    },
    getTopnotice() {
        app.$api.getTopNotice().then(res => {
            console.log('res', res)
            if (res.status == 200) {
                this.setData({
                    topnotice: res.data
                })
            }
        }

        )

    },
    gotoannouncement(e) {
        wx.navigateTo({
            url: '/pages/home/announcement/index?announcementid=' + e.currentTarget.dataset.announcementid,

        })
    },
    getDate() {
        let date = new Date();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        this.setData({
            date: {
                month: month,
                day: day
            }
        })
    },
    getLastBloodSugarData() {
        let data = {
            userId: wx.getStorageSync('userInfo').id,
        }
        app.$api.getLastBloodSugarDataByUserId(data).then(res => {
            console.log('res', res)
            //今天年月日
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            if (res.status == 200) {
                let aYear = res.data.bloodSugarTime.split(' ')[0].split('-')[0];
                let aMonth = res.data.bloodSugarTime.split(' ')[0].split('-')[1];
                let aDay = res.data.bloodSugarTime.split(' ')[0].split('-')[2];
                if (aYear == year && aMonth == month && aDay == day) {
                    switch (res.data.bloodSugarType) {
                        case 0:
                            res.data.bloodSugarType = '空腹血糖';
                            break;
                        case 1:
                            res.data.bloodSugarType = '早餐后2小时血糖';
                            break;
                        case 2:
                            res.data.bloodSugarType = '午餐前血糖';
                            break;
                        case 3:
                            res.data.bloodSugarType = '午餐后2小时血糖';
                            break;
                        case 4:
                            res.data.bloodSugarType = '晚餐前血糖';
                            break;
                        case 5:
                            res.data.bloodSugarType = '晚餐后2小时血糖';
                            break;
                        case 6:
                            res.data.bloodSugarType = '睡前血糖';
                            break;
                        case 7:
                            res.data.bloodSugarType = '随机血糖';
                            break;
                        case 8:
                            res.data.bloodSugarType = '夜间2时血糖';
                            break;
                        default:
                            res.data.bloodSugarType = '其他';
                    }

                    this.setData({
                        lastBloodSugarData: res.data
                    })
                }
            }
        }

        )

    },
    gotoRe() {
        wx.navigateTo({
            url: '/pages/record/dailyRecord/index',
        })
    },
    gotoCuItem(e) {
        // console.log('e',e.currentTarget.dataset.path)
        if (app.globalData.loginFlag) {
            wx.navigateTo({
                url: e.currentTarget.dataset.path,
            })
        } else {
            wx.showToast({
                title: '请先登录',
                icon: 'none',
                duration: 2000
            })
        }
    },
    getTopNews() {
        app.$api.getTopNews().then(res => {
            console.log('getTopNewsres', res)
            if (res.status == 200) {
                this.setData({
                    swiperList: res.data
                })
            }
        }
        )
    },
    getNewsList() {
        app.$api.getNewsList().then(res => {
            console.log('res', res)

            if (res.status == 200) {
                // let data = res.data.map(item => {
                //     console.log('item',item)
                //     item.content= item.content.replace(/<[^>]+>/g, "")
                // })
                this.setData({
                    newsList: res.data
                })
            }
        }
        )
    },
    gotoNewsDetail(e) {
        if (app.globalData.loginFlag) {
            wx.navigateTo({
                url: '/pages/home/newsDetail/index?id=' + e.currentTarget.dataset.id,
            })
        }
        else {
            wx.showToast({
                title: '请先登录',
                icon: 'none',
                duration: 2000
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        console.log('app.globalData.loginFlag)', app.globalData.loginFlag)
        this.getDate()
        if (app.globalData.loginFlag) {
            this.getTopnotice()
            this.getLastBloodSugarData()
        } else {
            app.loginAutomatic().then(res => {
                this.getTopnotice()
                this.getLastBloodSugarData()
            })
        }
        this.getTopNews()
        this.getNewsList()
        this.getHotSearch()
    },



    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        if (app.globalData.loginFlag) {
            this.getTopnotice()
            this.getLastBloodSugarData()
        }
        this.changesearchHoeValIndex()
    },
    onRefresh:function(){
      //导航条加载动画
      wx.showNavigationBarLoading()
      //loading 提示框
      wx.showLoading({
        title: 'Loading...',
      })
      console.log("下拉刷新啦");
      this.getTopNews()
      this.getNewsList()
      this.getHotSearch()
      setTimeout(function () {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        //停止下拉刷新
        wx.stopPullDownRefresh();
      }, 2000)
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