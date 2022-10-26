<template>
    <view>
        <van-nav-bar title="日记录" left-text="返回" fixed left-arrow @click-left="onClickLeft" />
        <view class="app" :style="'margin-top:' + marginTopview + 'px;'">
            <!-- <view class=" padding-xl radius shadow bg-white box">
        <ec-canvas id="mychart" canvas-id="mychart-bar" ec="{{ ec }}"></ec-canvas>
        <view class="title">
            <text class="text-gray">{{title[dateType]}}</text>
            <van-switch checked="{{ checked }}" bind:change="onChange" size="24px" />
        </view>
    </view>
    <view class="cardBox">
        <view class="dateSelect">
            <van-dropdown-menu active-color="#1989fa">
                <van-dropdown-item value="{{ tabIndex }}" options="{{ dateList }}" bind:change="tabSelect" data-id="{{tabIndex}}" />
            </van-dropdown-menu>
        </view>
        <view class="card padding-xl radius shadow shadow-lg bg-white margin-top">
            <view class="dataBox">k</view>
            <view class="deleteView" bindtap="delete">
                <text class="cuIcon-delete lg text-red"></text>
            </view>
            <view class="timeBox">
                <text class="cuIcon-time lg text-gray"></text>
                <view class="cu-tag line-green">{{Date}}</view>
                
            </view>
        </view>
    </view> -->
            <scroll-view scroll-x class="bg-themeColor nav text-center">
                <view :class="'cu-item ' + (0 == TabCur ? 'text-white cur' : '')" @tap="tabSelect" data-id="0">
                    <text class="cuIcon-camerafill"></text>
                    统计图
                </view>
                <view :class="'cu-item ' + (1 == TabCur ? 'text-white cur' : '')" @tap="tabSelect" data-id="1">
                    <text class="cuIcon-upstagefill"></text>
                    详情
                </view>
            </scroll-view>
            <view class="mainView">
                <view class="chartView" v-if="TabCur == 0">
                    <view class="padding-xl radius shadow bg-white box">
                        <ec-canvas id="mychart" canvas-id="mychart-bar" :ec="ec"></ec-canvas>
                        <view class="title">
                            <text class="text-gray">{{ title[dateType] }}</text>
                            <van-switch :checked="checked" @change="onChange" size="24px" />
                        </view>
                    </view>
                </view>
                <view class="cardView" v-else>
                    <view class="cardBox">
                        <view class="dateSelect">
                            <van-dropdown-menu active-color="#aed6db">
                                <van-dropdown-item :value="tabIndex" :options="dateList" @change="datetabSelect($event, { id: tabIndex })" :data-id="tabIndex" />
                            </van-dropdown-menu>
                        </view>
                        <view class="card padding-xl radius shadow shadow-lg bg-white margin-top">
                            <view class="dataBox">
                                <text class="cuIcon-like lg text-gray"></text>
                                <text>血糖值：</text>
                                <text>{{ Data.bloodSugarLevel }}\n\n\n</text>
                                <text class="cuIcon-titles lg text-gray"></text>
                                <text>记录类型：</text>
                                <text>{{ Data.bloodSugarType }}\n\n\n</text>
                            </view>
                            <view class="deleteView" @tap="deleteFun">
                                <text class="cuIcon-delete lg text-red"></text>
                            </view>
                            <view class="timeBox">
                                <text class="cuIcon-time lg text-gray"></text>
                                <view class="cu-tag line-green">{{ Data.bloodSugarTime }}</view>
                            </view>
                            <view class="qualifiedImg">
                                <image v-if="Data.status == 1" src="/static/assets/img/qualified.png" />
                                <image v-else src="/static/assets/img/unqualified.png" />
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="buttonView">
                <button class="cu-btn bg-themeColor shadow-blur round lg" @tap="addRec">新增记录</button>
            </view>
        </view>
    </view>
</template>

<script>
import ecCanvas from '../../../ec-canvas/ec-canvas';
import vanSwitch from './@vant/weapp/switch/index';
import vanDropdownMenu from './@vant/weapp/dropdown-menu/index';
import vanDropdownItem from './@vant/weapp/dropdown-item/index';
// pages/record/dailyRecord/index.js
const app = getApp();
import * as echarts from '../../../ec-canvas/echarts';
var SalesChart = null;
export default {
    components: {
        ecCanvas,
        vanSwitch,
        vanDropdownMenu,
        vanDropdownItem
    },
    data() {
        return {
            dateType: 0,
            title: ['最近一周记录', '最近一月记录'],
            checked: false,
            ec: {
                lazyLoad: true
            },
            xAxisData: [],
            series: {},
            TabCur: 0,
            dateList: [],
            cardData: [],
            Date: '',
            Data: {
                bloodSugarLevel: '',
                bloodSugarType: '',
                bloodSugarTime: '',
                status: 0
            },
            tabIndex: 0,
            scrollLeft: 0,
            marginTopview: app.globalData.navBarHeight
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // this.getbloodData()
        this.echartsComponnet = this.$mp.page.selectComponent('#mychart').$vm;
        this.init_echarts();
        this.getbloodData();
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.echartsComponnet = this.$mp.page.selectComponent('#mychart').$vm;
        this.init_echarts();
        this.getbloodData();
    },
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
    methods: {
        onChange() {
            if (this.dateType == 0) {
                this.setData({
                    dateType: 1,
                    checked: true
                });
            } else {
                this.setData({
                    dateType: 0,
                    checked: false
                });
            }

            this.getbloodData();
        },

        onClickLeft() {
            uni.navigateBack({
                delta: 1
            });
        },

        async getbloodData() {
            let data = {
                dateType: this.dateType,
                userId: uni.getStorageSync('userInfo').id
            };
            let that = this;
            let res = await app.globalData.$api.getBloodSugarDataByUserId(data);
            console.log('res', res);
            let chartsData = res.data.chartsData; // this.setData({
            //     cardData: res.data.cardData
            // })

            let xAxisData = chartsData.xAxisData; // let legendData = res.data.legendData

            let series = [];
            chartsData.series.forEach((item, index) => {
                series.push({
                    name: item.name,
                    type: 'line',
                    smooth: true,
                    //平滑曲线
                    data: item.data,
                    markLine: {
                        // symbol: "none",   //是否显示首尾箭头
                        data: [
                            //第一条线
                            {
                                yAxis: 3.9,
                                name: '最低值',
                                lineStyle: {
                                    type: 'solid',
                                    color: '#FA6400',
                                    width: 2
                                },
                                label: {
                                    //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
                                    position: 'start',
                                    fontSize: 14,
                                    formatter: '最低值'
                                }
                            }, //第二条线
                            {
                                yAxis: 6.1,
                                //映射y轴大小
                                name: '最高值',
                                lineStyle: {
                                    type: 'solid',
                                    //虚实
                                    color: '#FA6400',
                                    //颜色
                                    width: 2 //基线粗细
                                },
                                label: {
                                    //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
                                    position: 'end',
                                    fontSize: 14,
                                    //文字大小
                                    formatter: '最高值' // 基线名称
                                }
                            }
                        ]
                    }
                });
            });
            this.setData({
                xAxisData: xAxisData,
                series: series,
                cardData: res.data.cardData
            });
            await that.init_echarts();
            await this.initCardData(); // await that.initChartOption(xAxisData, series)
        },

        //初始化图表
        init_echarts: function () {
            this.echartsComponnet.init((canvas, width, height) => {
                // 初始化图表
                const Chart = echarts.init(canvas, null, {
                    width: width,
                    height: height
                });
                Chart.setOption(this.getOption()); // 注意这里一定要返回 chart 实例，否则会影响事件处理等

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
                    data: that.xAxisData
                },
                yAxis: {
                    type: 'value',
                    min: function (value) {
                        //取最小值向下取整为最小刻度
                        return Math.floor(value.min);
                    },
                    max: function (value) {
                        //取最大值向上取整为最大刻度
                        return Math.ceil(value.max);
                    },
                    scale: true,
                    //自适应
                    minInterval: 0.1,
                    //分割刻度
                    splitLine: {
                        show: true
                    }
                },
                series: that.series
            };
            return option;
        },

        tabSelect(e) {
            this.setData({
                TabCur: e.currentTarget.dataset.id,
                scrollLeft: (e.currentTarget.dataset.id - 1) * 60
            });

            if (e.currentTarget.dataset.id == 0) {
                this.echartsComponnet = this.$mp.page.selectComponent('#mychart').$vm;
                this.init_echarts(); // this.getbloodData();
            }
        },

        datetabSelect(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            console.log(e.detail);
            this.setData({
                tabIndex: e.detail,
                Data: this.cardData[e.detail]
            });
        },

        initCardData() {
            console.log('this.data.cardData', this.cardData);
            let cardData = this.cardData;
            let dateList = [];

            for (let i = 0; i < cardData.length; i++) {
                let date = cardData[i].bloodSugarTime;

                switch (cardData[i].bloodSugarType) {
                    case 0:
                        cardData[i].bloodSugarType = '空腹血糖';
                        break;

                    case 1:
                        cardData[i].bloodSugarType = '早餐后2小时血糖';
                        break;

                    case 2:
                        cardData[i].bloodSugarType = '午餐前血糖';
                        break;

                    case 3:
                        cardData[i].bloodSugarType = '午餐后2小时血糖';
                        break;

                    case 4:
                        cardData[i].bloodSugarType = '晚餐前血糖';
                        break;

                    case 5:
                        cardData[i].bloodSugarType = '晚餐后2小时血糖';
                        break;

                    case 6:
                        cardData[i].bloodSugarType = '睡前血糖';
                        break;

                    case 7:
                        cardData[i].bloodSugarType = '任意时间血糖';
                        break;

                    case 8:
                        cardData[i].bloodSugarType = '夜间2时血糖';
                        break;

                    default:
                        cardData[i].bloodSugarType = '其他';
                }

                dateList.push({
                    text: date,
                    value: i
                });
            }

            this.setData({
                dateList: dateList,
                Data: this.cardData[0]
            });
        },

        deleteFun() {
            let that = this; // 询问

            uni.showModal({
                title: '提示',
                content: '确定要删除吗？',
                success: (res) => {
                    if (res.confirm) {
                        console.log('用户点击确定');
                        let data = {
                            userId: uni.getStorageSync('userInfo').id,
                            bloodSugarId: that.Data.id
                        };
                        app.globalData.$api.deleteBloodSugarData(data).then((res) => {
                            console.log(res);

                            if (res.status == 200) {
                                uni.showToast({
                                    title: '删除成功',
                                    icon: 'success',
                                    duration: 2000
                                });
                                this.getbloodData();
                            }
                        }); // that.deleteBloodSugarData()
                    } else {
                        console.log('取消');
                    }
                }
            });
        },

        addRec() {
            uni.navigateTo({
                url: '/pages/record/dailyRecord/add/index'
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
