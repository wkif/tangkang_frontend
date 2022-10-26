<template>
    <view>
        <van-nav-bar title="糖康有道" />
        <view class="app">
            <!-- <view class="saerchView">
        <van-search value="{{ searchValue }}" placeholder="请输入搜索关键词" use-action-slot bind:change="onChange" bind:search="onSearch">
            <view slot="action" bind:tap="onClick">搜索</view>
        </van-search>
    </view> -->
            <van-notice-bar scrollable mode="closeable" speed="100" v-if="topnotice.length" :text="topnotice.title" />
            <view class="swiperView">
                <swiper
                    class="card-swiper round-dot"
                    :indicator-dots="true"
                    :circular="true"
                    :autoplay="true"
                    interval="5000"
                    duration="500"
                    @change="cardSwiper"
                    indicator-color="#8799a3"
                    indicator-active-color="#0081ff"
                >
                    <swiper-item :class="cardCur == index ? 'cur' : ''" v-for="(item, index) in swiperList" :key="index">
                        <view class="swiper-item" @tap="gotoNewsDetail" :data-id="item.id">
                            <image :src="item.url" mode="aspectFill"></image>
                        </view>
                    </swiper-item>
                </swiper>
            </view>
            <!-- <view class="box">
        <ec-canvas id="mychart-dom-bar" canvas-id="mychart-bar" ec="{{ ec }}"></ec-canvas>
    </view> -->
            <view class="currentDataView radius shadow shadow-lg bg-white margin-top">
                <van-row>
                    <van-col span="4">
                        <view class="dateView">
                            <view class="date-text day">{{ date.day }}</view>
                            <view class="date-text month">{{ date.month }}</view>
                        </view>
                    </van-col>
                    <van-col span="10" offset="4">
                        <van-tag class="lastTag" type="warning">最近血糖值数据：</van-tag>
                        <view class="last" @tap="gotoRe" v-if="lastBloodSugarData">
                            <view class="data">
                                <!-- 血糖值： -->
                                <text class="last-text bloodSugarLevel text-red" v-if="lastBloodSugarData.bloodSugarLevel > 6 || lastBloodSugarData.bloodSugarLevel < 3.9">
                                    {{ lastBloodSugarData.bloodSugarLevel }}
                                </text>
                                <text class="last-text bloodSugarLevel" v-else>
                                    {{ lastBloodSugarData.bloodSugarLevel }}
                                </text>
                                <text class="unit">mmol/L</text>
                            </view>
                            <view class="tagView">
                                <view class="cu-tag line-cyan">{{ lastBloodSugarData.bloodSugarType }}</view>
                                <view class="cu-tag line-blue">{{ lastBloodSugarData.bloodSugarTime }}</view>
                            </view>
                        </view>
                        <view class="noData" @tap="gotoRe" v-else>
                            <view class="noData-text">暂无今日数据，快来记录吧</view>
                        </view>
                    </van-col>
                </van-row>
            </view>
            <view :class="'cu-list grid col-3 ' + (gridBorder ? '' : 'no-border')">
                <view class="cu-item" v-if="index < 6" @tap="gotoCuItem" :data-path="item.path" v-for="(item, index) in iconList" :key="index">
                    <view :class="'cuIcon-' + item.icon + ' text-' + item.color"></view>

                    <text>{{ item.name }}</text>
                </view>
            </view>
            <view class="newsList">
                <view class="cu-card article" v-for="(item, index) in newsList" :key="index">
                    <view class="cu-item shadow" @tap="gotoNewsDetail" :data-id="item.id">
                        <view class="title">
                            <view class="text-cut">{{ item.title }}</view>
                        </view>
                        <view class="content">
                            <image :src="item.cover" mode="aspectFill"></image>
                            <view class="desc">
                                <view class="text-content">{{ item.content }}</view>
                                <view>
                                    <view class="cu-tag bg-red light sm round">{{ item.tag }}</view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import ecCanvas from '../../ec-canvas/ec-canvas';
import vanSearch from './@vant/weapp/search/index';
import vanNoticeBar from './@vant/weapp/notice-bar/index';
import vanRow from './@vant/weapp/row/index';
import vanCol from './@vant/weapp/col/index';
import vanTag from './@vant/weapp/tag/index';
// pages/home/index.js
const app = getApp();
export default {
    components: {
        ecCanvas,
        vanSearch,
        vanNoticeBar,
        vanRow,
        vanCol,
        vanTag
    },
    data() {
        return {
            cardCur: 0,
            swiperList: [],
            searchValue: '',

            topnotice: {
                title: ''
            },

            date: {
                month: '',
                day: ''
            },

            lastBloodSugarData: {
                bloodSugarLevel: 0,
                bloodSugarType: '',
                bloodSugarTime: ''
            },

            iconList: [
                {
                    icon: 'cardboardfill',
                    color: 'red',
                    name: '积分',
                    path: '/pages/user/integral/index'
                },
                {
                    icon: 'recordfill',
                    color: 'orange',
                    name: '饮食记录',
                    path: '/pages/home/dietRecords/index'
                },
                {
                    icon: 'upstagefill',
                    color: 'cyan',
                    name: '健康打卡',
                    path: '/pages/nodata/index'
                },
                {
                    icon: 'picfill',
                    color: 'yellow',
                    name: '食物数据库',
                    path: '/pages/home/foodDatabase/index'
                },
                {
                    icon: 'noticefill',
                    color: 'olive',
                    name: '制定目标',
                    path: '/pages/home/setGoals/index'
                },
                {
                    icon: 'upstagefill',
                    color: 'cyan',
                    name: '关联家人',
                    path: '/pages/nodata/index'
                }
            ],

            newsList: [],
            gridBorder: false
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log('app.globalData.loginFlag)', app.globalData.loginFlag);
        this.getDate();

        if (app.globalData.loginFlag) {
            this.getTopnotice();
            this.getLastBloodSugarData();
        } else {
            app.globalData.loginAutomatic().then((res) => {
                this.getTopnotice();
                this.getLastBloodSugarData();
            });
        }

        this.getTopNews();
        this.getNewsList();
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        if (app.globalData.loginFlag) {
            this.getTopnotice();
            this.getLastBloodSugarData();
        }
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
        onChange(e) {
            this.setData({
                searchValue: e.detail
            });
        },

        onSearch() {
            console.log('搜索' + this.searchValue);
        },

        onClick() {
            console.log('搜索' + this.searchValue);
        },

        getTopnotice() {
            app.globalData.$api.getTopNotice().then((res) => {
                console.log('res', res);

                if (res.status == 200) {
                    this.setData({
                        topnotice: res.data
                    });
                }
            });
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
            });
        },

        getLastBloodSugarData() {
            let data = {
                userId: uni.getStorageSync('userInfo').id
            };
            app.globalData.$api.getLastBloodSugarDataByUserId(data).then((res) => {
                console.log('res', res); //今天年月日

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
                        });
                    }
                }
            });
        },

        gotoRe() {
            uni.navigateTo({
                url: '/pages/record/dailyRecord/index'
            });
        },

        gotoCuItem(e) {
            // console.log('e',e.currentTarget.dataset.path)
            if (app.globalData.loginFlag) {
                uni.navigateTo({
                    url: e.currentTarget.dataset.path
                });
            } else {
                uni.showToast({
                    title: '请先登录',
                    icon: 'none',
                    duration: 2000
                });
            }
        },

        getTopNews() {
            app.globalData.$api.getTopNews().then((res) => {
                console.log('getTopNewsres', res);

                if (res.status == 200) {
                    this.setData({
                        swiperList: res.data
                    });
                }
            });
        },

        getNewsList() {
            app.globalData.$api.getNewsList().then((res) => {
                console.log('res', res);

                if (res.status == 200) {
                    this.setData({
                        newsList: res.data
                    });
                }
            });
        },

        gotoNewsDetail(e) {
            if (app.globalData.loginFlag) {
                uni.navigateTo({
                    url: '/pages/home/newsDetail/index?id=' + e.currentTarget.dataset.id
                });
            } else {
                uni.showToast({
                    title: '请先登录',
                    icon: 'none',
                    duration: 2000
                });
            }
        },

        cardSwiper() {
            console.log('占位：函数 cardSwiper 未声明');
        }
    }
};
</script>
<style>
@import './index.css';
</style>
