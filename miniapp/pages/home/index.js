// pages/home/index.js
const app = getApp()



Page({

    /**
     * 页面的初始数据
     */
    data: {
        cardCur: 0,
        swiperList: [{
            id: 0,
            type: 'image',
            url: 'https://kifimg.oss-cn-beijing.aliyuncs.com/project/202205302251490.png'
        }, {
            id: 1,
            type: 'image',
            url: 'https://kifimg.oss-cn-beijing.aliyuncs.com/project/202204241829561.jpg',
        }, {
            id: 2,
            type: 'video',
            url: 'https://kifimg.oss-cn-beijing.aliyuncs.com/project/202207241821890.mp4'
        }, {
            id: 3,
            type: 'image',
            url: 'https://kifimg.oss-cn-beijing.aliyuncs.com/project/202204241829907.jpg'
        }, {
            id: 4,
            type: 'image',
            url: 'https://kifimg.oss-cn-beijing.aliyuncs.com/project/202204192117290.jpg'
        }],
        searchValue: '',
        topnotice: {},

        date: {
            month: '',
            day: '',
        },
        lastBloodSugarData: '',
        iconList: [{
            icon: 'cardboardfill',
            color: 'red',
            name: '积分',
            path: '/pages/user/integral/index'
        }, {
            icon: 'recordfill',
            color: 'orange',
            name: '饮食记录',
            path: '/pages/home/dietRecords/index'
        }, {
            icon: 'upstagefill',
            color: 'cyan',
            name: '健康打卡',
            path: '/pages/nodata/index'
        }, {
            icon: 'picfill',
            color: 'yellow',
            name: '食物数据库',
            path: '/pages/home/foodDatabase/index'
        }, {
            icon: 'noticefill',
            color: 'olive',
            name: '制定目标',
            path: '/pages/home/setGoals/index'
        }, {
            icon: 'upstagefill',
            color: 'cyan',
            name: '关联家人',
            path: '/pages/nodata/index'
        }],

    },
    onChange(e) {
        this.setData({
            searchValue: e.detail,
        });
    },
    onSearch() {
        console.log('搜索' + this.data.searchValue);
    },
    onClick() {
        console.log('搜索' + this.data.searchValue);
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
        if (app.globalData.loginFlag) {
            this.getTopnotice()
            this.getLastBloodSugarData()
        }
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