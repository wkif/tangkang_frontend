// pages/home/newsDetail/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        newsId: '',
        article: '',
        newsData: '',
        commitList: [],
        scrollTop: 0,
        offsetTop: 0,
        toViewid: '',
        userInfo: wx.getStorageSync('userInfo'),
        inputValue: '',
        marginTopview: app.globalData.navBarHeight
    },
    onClickLeft() {
        wx.navigateBack({
            delta: 1
        })
    },
    goTop() {
        //scroll-view的方法
        this.setData({
            scrollTop: 0
        })

    },
    input(e) {
        this.setData({
            inputValue: e.detail.value
        })
    },
    getNewsComment() {
        let data = {
            userId: this.data.userInfo.id,
            newsId: this.data.newsData.id
        }
        app.$api.getNewsComment(data).then(res => {
            if (res.status == 200) {
                this.setData({
                    commitList: res.data
                })
            } else {
                wx.showToast({
                    title: res.data,
                    icon: 'none',
                    duration: 2000
                })
            }
        })
    },
    goCommit() {
        this.setData({
            toViewid: 'commitView'
        })
    },
    async submit() {
        let data = {
            userId: this.data.userInfo.id,
            newsId: this.data.newsData.id,
            content: this.data.inputValue
        }
        console.log('data',data)
        let res = await app.$api.addCommit(data)
        if (res.status == 200) {
            this.setData({
                inputValue: ''
            })
            // wx.showToast({
            //     title: res.data,
            //     icon: 'success',
            //     duration: 2000
            // })
            this.getNewsComment()
        } else {
            wx.showToast({
                title: res.data,
                icon: 'none',
                duration: 2000
            })
        }
    },
    delete(e) {
        let data = {
            userId: this.data.userInfo.id,
            newsId: this.data.newsData.id,
            commitId: e.currentTarget.dataset.id
        }
        app.$api.deleteCommit(data).then(res => {
            if (res.status == 200) {
                wx.showToast({
                    title: res.data,
                    icon: 'success',
                    duration: 2000
                })
                this.getNewsComment()
            } else {
                wx.showToast({
                    title: res.data,
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
        // this.setData({
        //     newsId: options.id
        // })
        // this.getNewsDetail()

        (async () => {
            //markdown数据源
            // 加载
            wx.showLoading({
                title: '加载中',
            })

            let data = {
                userId: wx.getStorageSync('userInfo').id,
                newsId: options.id
            }
            let res = await app.$api.getNewsDetail(data)
            console.log('res', res)
            this.setData({
                newsData: res.data.news,
                // commitList: res.data.commitList
            })
            let result = app.towxml(res.data.news.content, 'markdown', {
                base: 'www.xxx.com',
                theme: 'light',
                events: {
                    tap: (e) => {
                        console.log('h4', e);
                    }
                }
            });
            // 更新解析数据
            this.setData({
                article: result
            });
            this.getNewsComment()
            // 关闭加载
            wx.hideLoading();
        })()
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