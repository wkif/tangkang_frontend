<template>
    <view>
        <van-nav-bar title="不定期记录" left-text="返回" fixed left-arrow @click-left="onClickLeft" />
        <view class="app" :style="'margin-top:' + marginTopview + 'px;'">
            <view class="dateSelect">
                <!-- <scroll-view scroll-x class="bg-white nav" scroll-with-animation scroll-left="{{scrollLeft}}">
            <view class="cu-item {{index==TabCur?'text-green cur':''}}" wx:for="{{dateList}}" wx:key bindtap="tabSelect" data-id="{{item.id}}">
                {{item.date}}
            </view>
        </scroll-view> -->
                <van-dropdown-menu active-color="#1989fa">
                    <van-dropdown-item :value="tabIndex" :options="dateList" @change="tabSelect($event, { id: tabIndex })" :data-id="tabIndex" />
                    <!-- <van-dropdown-item value="{{ value2 }}" options="{{ option2 }}" /> -->
                </van-dropdown-menu>
            </view>
            <view class="card padding-xl radius shadow shadow-lg bg-white margin-top">
                <view class="dataBox">
                    <text class="cuIcon-like lg text-gray"></text>
                    <text>糖化血红蛋白：</text>
                    <text>{{ Data.glycosylatedHemoglobin }}\n\n\n</text>
                    <text class="cuIcon-titles lg text-gray"></text>
                    <text>微量白蛋白：</text>
                    <text>{{ Data.microalbuminuria }}\n\n\n</text>
                    <text class="cuIcon-footprint lg text-gray"></text>
                    <text>足跟静脉搏动：</text>
                    <text>{{ Data.dorsalisPedisArtery }}\n\n\n</text>
                </view>
                <view class="deleteView" @tap="deleteFun">
                    <text class="cuIcon-delete lg text-red"></text>
                </view>
                <view class="timeBox">
                    <text class="cuIcon-time lg text-gray"></text>
                    <view class="cu-tag line-green">{{ Data.periodicalTime }}</view>
                    <!-- <text>{{Data.periodicalTime}}\n\n\n</text> -->
                </view>
            </view>
            <view class="buttonView">
                <button class="cu-btn bg-themeColor shadow-blur round lg" @tap="addRec">新增记录</button>
            </view>
        </view>
    </view>
</template>

<script>
import vanDropdownMenu from './@vant/weapp/dropdown-menu/index';
import vanDropdownItem from './@vant/weapp/dropdown-item/index';
// pages/record/irregularTimingRecording/index.js
const app = getApp();
export default {
    components: {
        vanDropdownMenu,
        vanDropdownItem
    },
    data() {
        return {
            dateList: [],
            tabIndex: 0,
            dataList: [],
            Data: {
                glycosylatedHemoglobin: '',
                microalbuminuria: '',
                dorsalisPedisArtery: '',
                periodicalTime: ''
            },
            marginTopview: app.globalData.navBarHeight
        };
    },
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
    methods: {
        onClickLeft() {
            uni.navigateBack({
                delta: 1
            });
        },

        addRec() {
            uni.navigateTo({
                url: '/pages/record/irregularTimingRecording/add/index'
            });
        },

        tabSelect(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            console.log(e.detail);
            this.setData({
                tabIndex: e.detail,
                Data: this.dataList[e.detail]
            });
        },

        getData() {
            let data = {
                userId: uni.getStorageSync('userInfo').id
            };
            app.globalData.$api.getperiodicalLoggingData(data).then((res) => {
                console.log(res);

                if (res.status == 200) {
                    this.setData({
                        dataList: res.data
                    });
                    let dateList = [];

                    for (let i = 0; i < res.data.length; i++) {
                        let date = res.data[i].periodicalTime;
                        dateList.push({
                            text: date.substring(0, 10),
                            value: i
                        });
                    }

                    this.setData({
                        dateList: dateList,
                        Data: this.dataList[0]
                    });
                }
            });
        },

        deleteFun() {
            let that = this; // 询问

            uni.showModal({
                title: '提示',
                content: '确定要删除吗？',
                success: (res) => {
                    if (res.confirm) {
                        let data = {
                            userId: uni.getStorageSync('userInfo').id,
                            periodicalLoggingId: that.Data.id
                        };
                        app.globalData.$api.deletePeriodicalLoggingData(data).then((res) => {
                            console.log(res);

                            if (res.status == 200) {
                                uni.showToast({
                                    title: '删除成功',
                                    icon: 'success',
                                    duration: 2000
                                });
                                that.getData();
                            }
                        });
                    } else {
                        console.log('取消');
                    }
                }
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
