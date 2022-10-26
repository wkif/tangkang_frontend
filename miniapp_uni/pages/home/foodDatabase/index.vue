<template>
    <view>
        <van-nav-bar title="食品营养价值表" left-text="返回" fixed left-arrow @click-left="onClickLeft" />
        <view class="app" :style="'margin-top:' + marginTopview + 'px;'">
            <van-search :value="searchValue" @search="search" input-align="center" placeholder="请输入搜索关键词" />
            <view class="tabView">
                <van-tabs :active="active" @change="onChange">
                    <van-tab :title="item" v-for="(item, index) in tabList" :key="index">
                        <view class="foodView">
                            <view class="foodList" v-if="data.length">
                                <view class="foodItem" @click="onClick" v-for="(item, index1) in data" :key="index1">
                                    <van-transition name="slide-down">
                                        <view class="foodCard padding-xl radius shadow-warp bg-white margin-top">
                                            <view class="foodImg">
                                                <image :src="item.img" mode="widthFix" />
                                                <text>{{ item.foodName }}</text>
                                                <van-tag type="primary">{{ item.foodType }}</van-tag>
                                                <van-tag type="success">{{ item.unit }}</van-tag>
                                            </view>
                                            <view class="foodDesc">
                                                <van-row gutter="20">
                                                    <van-col span="12">
                                                        <view>卡路里： {{ item.foodCalory }}</view>
                                                        <view>蛋白质： {{ item.foodProtein }}</view>
                                                        <view>脂肪： {{ item.foodFat }}</view>
                                                        <view>
                                                            热量： {{ item.heat }}
                                                            <!-- <text>{{item.heat}} </text> -->
                                                        </view>
                                                        <view>碳水： {{ item.foodCarbohydrate }}</view>
                                                    </van-col>
                                                    <van-col span="12">
                                                        <view>维生素C：{{ item.foodVitaminC }}</view>
                                                        <view>维生素E：{{ item.foodVitaminE }}</view>
                                                        <view>维生素D：{{ item.foodVitaminD }}</view>
                                                        <view>维生素A：{{ item.foodVitaminA }}</view>
                                                    </van-col>
                                                </van-row>
                                            </view>
                                        </view>
                                    </van-transition>
                                </view>
                            </view>
                            <van-empty v-else image="search" description="暂无数据" />
                        </view>
                    </van-tab>
                </van-tabs>
            </view>
        </view>
    </view>
</template>

<script>
import vanSearch from './@vant/weapp/search/index';
import vanTab from './@vant/weapp/tab/index';
import vanTabs from './@vant/weapp/tabs/index';
import vanCard from './@vant/weapp/card/index';
import vanTag from './@vant/weapp/tag/index';
import vanRow from './@vant/weapp/row/index';
import vanCol from './@vant/weapp/col/index';
import vanEmpty from './@vant/weapp/empty/index';
import vanTransition from './@vant/weapp/transition/index';
// pages/home/foodDatabase/index.js
const app = getApp();
export default {
    components: {
        vanSearch,
        vanTab,
        vanTabs,
        vanCard,
        vanTag,
        vanRow,
        vanCol,
        vanEmpty,
        vanTransition
    },
    data() {
        return {
            dataList: {},
            tabList: [],
            searchValue: '',
            active: 0,
            data: [],
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

        async getData() {
            let data = {
                foodName: this.searchValue
            };
            let res = await app.globalData.$api.getfoodDatabaseByname(data);

            if (res.status == 200) {
                this.setData({
                    dataList: res.data.foodDatabase,
                    tabList: res.data.tablist,
                    data: res.data.foodDatabase[this.active].food
                });
            } else {
                uni.showToast({
                    title: res.msg,
                    icon: 'none'
                });
                this.setData({
                    dataList: [],
                    // tabList: [],
                    data: []
                });
            }
        },

        onChange(event) {
            console.log('event', event);
            let index = event.detail.index;
            console.log('this.data.dataList[index]', this.dataList[index]);
            this.setData({
                active: index,
                data: this.dataList[index].food
            });
        },

        search(e) {
            console.log('e', e.detail);
            this.setData({
                searchValue: e.detail
            });
            this.getData();
        },

        onClick() {
            console.log('占位：函数 onClick 未声明');
        }
    }
};
</script>
<style>
@import './index.css';
</style>
