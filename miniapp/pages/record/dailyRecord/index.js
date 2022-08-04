// pages/record/dailyRecord/index.js
const app = getApp()
import * as echarts from '../../../ec-canvas/echarts';
var SalesChart = null;

Page({

    /**
     * 页面的初始数据
     */
    data: {

        dateType: 0,
        title: [
            '最近一周记录',
            '最近一月记录',
        ],
        checked: false,
        ec: {
            lazyLoad: true,
        },
        xAxisData: [],
        series: {},
        TabCur: 0,

        dateList: [],
        cardData: [],
        Date: '',
        Data: {},

        tabIndex: 0,

        scrollLeft: 0
    },
    onChange() {
        this.data.dateType == 0 ? this.setData({
            dateType: 1,
            checked: true
        }) : this.setData({
            dateType: 0,
            checked: false
        })
        this.getbloodData()
    },
    onClickLeft() {
        wx.navigateBack({
            delta: 1
        })
    },
    async getbloodData() {
        let data = {
            dateType: this.data.dateType,
            userId: wx.getStorageSync('userInfo').id
        }
        let that = this

        let res = await app.$api.getBloodSugarDataByUserId(data)
        console.log('res', res)
        let chartsData = res.data.chartsData
        // this.setData({
        //     cardData: res.data.cardData
        // })
        let xAxisData = chartsData.xAxisData
        // let legendData = res.data.legendData
        let series = []
        chartsData.series.forEach((item, index) => {
            series.push({
                name: item.name,
                type: 'line',
                smooth: true,//平滑曲线
                data: item.data,
                markLine: {
                    // symbol: "none",   //是否显示首尾箭头
                    data: [
                        //第一条线
                        {
                            yAxis: 3.9,
                            name: "最低值",
                            lineStyle: {
                                type: "solid",
                                color: "#FA6400",
                                width: 2,
                            },
                            label: {
                                //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
                                position: "start",
                                fontSize: 14,
                                formatter: "最低值",
                            },
                        },
                        //第二条线
                        {
                            yAxis: 6.1,   //映射y轴大小
                            name: "最高值",
                            lineStyle: {
                                type: "solid",  //虚实
                                color: "#FA6400",  //颜色
                                width: 2,   //基线粗细
                            },
                            label: {
                                //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
                                position: "end",
                                fontSize: 14,  //文字大小
                                formatter: "最高值", // 基线名称
                            },
                        },

                    ],
                },
            })
        })
        this.setData({
            xAxisData: xAxisData,
            series: series,
            cardData: res.data.cardData
        })
        await that.init_echarts();
        await this.initCardData()
        // await that.initChartOption(xAxisData, series)

    },
    //初始化图表
    init_echarts: function () {
        this.echartsComponnet.init((canvas, width, height) => {
            // 初始化图表
            const Chart = echarts.init(canvas, null, {
                width: width,
                height: height,
            });
            Chart.setOption(this.getOption());
            // 注意这里一定要返回 chart 实例，否则会影响事件处理等
            return Chart;
        });
    },

    // 获取数据
    getOption: function () {
        var that = this;

        var option = {
            tooltip: {
                trigger: 'axis'
            },

            legend: {},
            xAxis: {
                type: 'category',
                disableGrid: true,
                boundaryGap: false,
                data: that.data.xAxisData
            },
            yAxis: {
                type: 'value',
                min: function (value) {//取最小值向下取整为最小刻度
                    return Math.floor(value.min)
                },
                max: function (value) {//取最大值向上取整为最大刻度
                    return Math.ceil(value.max)
                },

                scale: true, //自适应
                minInterval: 0.1, //分割刻度
                splitLine: {
                    show: true
                },

            },
            series: that.data.series
        };
        return option;
    },
    tabSelect(e) {
        this.setData({
            TabCur: e.currentTarget.dataset.id,
            scrollLeft: (e.currentTarget.dataset.id - 1) * 60
        })
        if (e.currentTarget.dataset.id == 0) {

            this.echartsComponnet = this.selectComponent('#mychart');
            this.init_echarts();
            // this.getbloodData();
        }

    },

    datetabSelect(e) {
        console.log(e.detail)
        this.setData({
            tabIndex: e.detail,
            Data: this.data.cardData[e.detail]
        })
    },
    initCardData() {
        console.log('this.data.cardData', this.data.cardData)
        let cardData = this.data.cardData
        let dateList = []
        for (let i = 0; i < cardData.length; i++) {
            let date = cardData[i].bloodSugarTime
            switch (cardData[i].bloodSugarType) {
                case 0:
                    cardData[i].bloodSugarType = '空腹血糖'

                    break;
                case 1:
                    cardData[i].bloodSugarType = '早餐后2小时血糖'
                    break;
                case 2:
                    cardData[i].bloodSugarType = '午餐前血糖'
                    break;
                case 3:
                    cardData[i].bloodSugarType = '午餐后2小时血糖'
                    break;
                case 4:
                    cardData[i].bloodSugarType = '晚餐前血糖'
                    break;
                case 5:
                    cardData[i].bloodSugarType = '晚餐后2小时血糖'
                    break;
                case 6:
                    cardData[i].bloodSugarType = '睡前血糖'
                    break;
                case 7:
                    cardData[i].bloodSugarType = '任意时间血糖'
                    break;
                case 8:
                    cardData[i].bloodSugarType = '夜间2时血糖'
                    break;
                default:
                    cardData[i].bloodSugarType = '其他'

            }
            dateList.push({
                text: date,
                value: i
            })
        }
        this.setData({
            dateList: dateList,
            Data: this.data.cardData[0],
        })

    },
    delete() {
        let that = this
        // 询问
        wx.showModal({
            title: '提示',
            content: '确定要删除吗？',
            success: res => {
                if (res.confirm) {
                    console.log('用户点击确定')
                    let data = {
                        userId: wx.getStorageSync('userInfo').id,
                        bloodSugarId: that.data.Data.id
                    }
                    app.$api.deleteBloodSugarData(data).then(res => {
                        console.log(res)
                        if (res.status == 200) {
                            wx.showToast({
                                title: '删除成功',
                                icon: 'success',
                                duration: 2000
                            })
                            this.getbloodData();
                        }
                    })
                    // that.deleteBloodSugarData()
                } else {
                    console.log('取消')
                }

            },

        }
        )
    },
    addRec() {
        wx.navigateTo({
            url: '/pages/record/dailyRecord/add/index',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // this.getbloodData()
        this.echartsComponnet = this.selectComponent('#mychart');
        this.init_echarts();
        this.getbloodData();
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
        this.echartsComponnet = this.selectComponent('#mychart');
        this.init_echarts();
        this.getbloodData();
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