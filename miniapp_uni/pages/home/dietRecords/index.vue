<template>
    <view>
        <van-nav-bar title="饮食记录" left-text="返回" fixed left-arrow @click-left="onClickLeft" />
        <view class="app" :style="'margin-top:' + marginTopview + 'px;'">
            <view class="Data" v-if="Data.length">
                <view class="dateSelect">
                    <van-dropdown-menu active-color="#1989fa">
                        <van-dropdown-item :value="tabIndex" :options="dateList" @change="tabSelect($event, { id: tabIndex })" :data-id="tabIndex" />
                        <!-- <van-dropdown-item value="{{ value2 }}" options="{{ option2 }}" /> -->
                    </van-dropdown-menu>
                </view>
                <view class="cardView">
                    <view class="deleteView" @tap="deleteFun">
                        <text class="cuIcon-delete lg text-red"></text>
                    </view>
                    <view class="padding-xl radius shadow shadow-lg bg-white margin-top">
                        <van-icon name="flower-o" />
                        <text>卡路里：{{ d.foodCalory }}千卡\n</text>
                        <van-icon name="flower-o" />
                        <text>蛋白质：{{ d.foodProtein }} \n</text>
                        <van-icon name="flower-o" />
                        <text>脂肪：{{ d.foodFat }} \n</text>
                        <van-icon name="flower-o" />
                        <text>热量：{{ d.heat }}\n</text>
                        <van-icon name="flower-o" />
                        <text>碳水化合物：{{ d.foodCarbohydrate }}\n</text>
                        <van-icon name="flower-o" />
                        <text>维生素A：{{ d.foodVitaminA }}\n</text>
                        <van-icon name="flower-o" />
                        <text>维生素C：{{ d.foodVitaminC }}\n</text>
                        <van-icon name="flower-o" />
                        <text>维生素E：{{ d.foodVitaminE }}\n</text>
                        <van-icon name="flower-o" />
                        <text>维生素D：{{ d.foodVitaminD }}\n</text>
                        <van-divider contentPosition="left">明细</van-divider>
                        <view class="foodList">
                            <van-collapse :value="activeNames" @change="onChange">
                                <van-collapse-item :name="item.id" v-for="(item, index) in d.food" :key="index">
                                    <view slot="title">
                                        {{ item.food.foodName }}
                                        <van-tag plain type="primary">{{ item.food.foodType }}</van-tag>
                                        <van-tag plain type="success">X {{ item.number }}</van-tag>
                                    </view>

                                    <van-icon name="flower-o" />

                                    <text>卡路里：{{ item.food.foodCalory }}千卡\n</text>

                                    <van-icon name="flower-o" />

                                    <text>蛋白质：{{ item.food.foodProtein }} \n</text>

                                    <van-icon name="flower-o" />

                                    <text>脂肪：{{ item.food.foodFat }} \n</text>

                                    <van-icon name="flower-o" />

                                    <text>热量：{{ item.food.heat }}\n</text>

                                    <van-icon name="flower-o" />

                                    <text>碳水化合物：{{ item.food.foodCarbohydrate }}\n</text>

                                    <van-icon name="flower-o" />

                                    <text>维生素A：{{ item.food.foodVitaminA }}\n</text>

                                    <van-icon name="flower-o" />

                                    <text>维生素C：{{ item.food.foodVitaminC }}\n</text>

                                    <van-icon name="flower-o" />

                                    <text>维生素E：{{ item.food.foodVitaminE }}\n</text>

                                    <van-icon name="flower-o" />

                                    <text>维生素D：{{ item.food.foodVitaminD }}\n</text>
                                </van-collapse-item>
                            </van-collapse>
                        </view>
                        <view class="timeBox">
                            <van-icon name="clock-o" />
                            {{ d.time }}
                        </view>
                    </view>
                </view>
            </view>
            <van-empty image="error" v-else description="描述文字" />
            <view class="addButtonView">
                <button class="cu-btn block line-greeen lg" @tap="addButton">
                    <text class="cuIcon-edit"></text>
                    <text>记录刚刚吃的！</text>
                </button>
            </view>
        </view>
    </view>
</template>

<script>
import vanDropdownMenu from './@vant/weapp/dropdown-menu/index';
import vanDropdownItem from './@vant/weapp/dropdown-item/index';
import vanIcon from './@vant/weapp/icon/index';
import vanCollapse from './@vant/weapp/collapse/index';
import vanCollapseItem from './@vant/weapp/collapse-item/index';
import vanTag from './@vant/weapp/tag/index';
import vanDivider from './@vant/weapp/divider/index';
import vanEmpty from './@vant/weapp/empty/index';
// pages/home/dietRecords/index.js
var app = getApp();
export default {
    components: {
        vanDropdownMenu,
        vanDropdownItem,
        vanIcon,
        vanCollapse,
        vanCollapseItem,
        vanTag,
        vanDivider,
        vanEmpty
    },
    data() {
        return {
            Data: [],
            dateList: [],
            tabIndex: 0,
            d: {
                foodCalory: '',
                foodProtein: '',
                foodFat: '',
                heat: '',
                foodCarbohydrate: '',
                foodVitaminA: '',
                foodVitaminC: '',
                foodVitaminE: '',
                foodVitaminD: '',
                food: []
            },
            activeNames: ['1'],
            marginTopview: app.globalData.navBarHeight
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getDietRecords();
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getDietRecords();
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
        onChange(event) {
            this.setData({
                activeNames: event.detail
            });
        },

        onClickLeft() {
            uni.navigateBack({
                delta: 1
            });
        },

        addButton() {
            uni.navigateTo({
                url: '/pages/home/dietRecords/add/index'
            });
        },

        tabSelect(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            console.log(e);
            this.setData({
                tabIndex: e.detail,
                d: this.Data.filter((item) => item.id == e.detail)[0]
            });
        },

        async getDietRecords() {
            let data = {
                userId: uni.getStorageSync('userInfo').id
            };
            let res = await app.globalData.$api.getDietRecordsByUserId(data);

            if (res.status == 200) {
                let data = res.data;
                let dateList = [];
                data.forEach((item) => {
                    dateList.push({
                        text: item.time,
                        value: item.id
                    });
                });
                this.setData({
                    Data: data,
                    dateList: dateList,
                    d: data[0],
                    tabIndex: data[0].id
                });
            } else {
                uni.showToast({
                    title: res.data,
                    icon: 'none'
                });
                this.setData({
                    Data: [],
                    dateList: [],
                    d: {},
                    tabIndex: ''
                });
            }
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
                            dietId: that.d.id
                        };
                        app.globalData.$api.deleteDietRecords(data).then((res) => {
                            console.log(res);

                            if (res.status == 200) {
                                uni.showToast({
                                    title: '删除成功',
                                    icon: 'success',
                                    duration: 2000
                                });
                                that.getDietRecords();
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
