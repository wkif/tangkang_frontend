<template>
    <view class="app" :style="'margin-top:' + marginTopview + 'px;'">
        <view class="topImg">
            <!-- <image src="https://img.yzcdn.cn/vant/custom-empty-image.png" mode="widthFix" /> -->
            <swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000" duration="500">
                <swiper-item @tap="gotoGoodDetail" :data-id="item.id" v-for="(item, index) in topList" :key="index">
                    <image :src="item.image" mode="aspectFill"></image>
                </swiper-item>
            </swiper>
        </view>
        <view class="searchView">
            <van-search :value="value" placeholder="请输入搜索关键词" />
        </view>
        <view class="VerticalBox" v-if="list.length">
            <scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="VerticalNavTop" style="height: calc(100vh - 375rpx)">
                <view :class="'cu-item ' + (index == TabCur ? 'text-themeColor cur' : '')" @tap="tabSelect" :data-id="index" v-for="(item, index) in list" :key="index">
                    {{ item.name }}
                </view>
            </scroll-view>
            <scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height: calc(100vh - 375rpx)" :scroll-into-view="'main-' + MainCur" @scroll="VerticalMain">
                <view class="padding-top padding-lr" :id="'main-' + index" v-for="(item, index) in list" :key="index">
                    <view class="cu-bar solid-bottom bg-white">
                        <view class="action">
                            <text class="cuIcon-title text-themeColor"></text>
                            {{ item.name }}
                        </view>
                    </view>

                    <view class="goodsList">
                        <van-card
                            :tag="good.brand"
                            :price="good.price"
                            :desc="good.detail"
                            :title="good.name"
                            :thumb="good.image"
                            @tap.native="gotoGoodDetail($event, { id: good.id })"
                            :data-id="good.id"
                            v-for="(good, index1) in item.goods"
                            :key="index1"
                        >
                            <!-- <view slot="footer">
                            <van-button size="mini">按钮</van-button>
                            <van-button size="mini">按钮</van-button>
                        </view> -->
                        </van-card>
                    </view>
                </view>
            </scroll-view>
        </view>
        <van-empty v-else class="custom-image" image="https://img.yzcdn.cn/vant/custom-empty-image.png" description="暂无数据"></van-empty>
        />
    </view>
</template>

<script>
import vanSearch from './@vant/weapp/search/index';
import vanCard from './@vant/weapp/card/index';
// pages/shop/index.js
const app = getApp();
export default {
    components: {
        vanSearch,
        vanCard
    },
    data() {
        return {
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
            listCur: '',
            marginTopview: '',
            value: '',

            good: {
                brand: '',
                price: '',
                detail: '',
                name: '',
                image: '',
                id: ''
            }
        };
    },
    onLoad() {
        uni.showLoading({
            title: '加载中...',
            mask: true
        });
        this.getGoodsData();
        this.getTopGoods(); // let list = [{}];
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
        uni.hideLoading();
    },
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
        async getGoodsData() {
            let res = await app.globalData.$api.getShopList();
            console.log('res', res);

            if (res.status == 200) {
                let list = res.data;
                this.setData({
                    list: list,
                    listCur: list[0]
                });
            }
        },

        async getTopGoods() {
            let res = await app.globalData.$api.getTopGoods();
            console.log('res', res);

            if (res.status == 200) {
                let list = res.data;
                this.setData({
                    topList: list
                });
            }
        },

        onClickLeft() {
            uni.navigateBack({
                delta: 1
            });
        },

        gotoGoodDetail(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            console.log('e', e);
            uni.navigateTo({
                url: `/pages/shop/goodDetail/index?goodId=${e.currentTarget.dataset.id}`
            });
        },

        tabSelect(e) {
            this.setData({
                TabCur: e.currentTarget.dataset.id,
                MainCur: e.currentTarget.dataset.id,
                VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
            });
        },

        VerticalMain(e) {
            let that = this;
            let list = this.list;
            let tabHeight = 0;

            if (this.load) {
                for (let i = 0; i < list.length; i++) {
                    let view = uni.createSelectorQuery().select('#main-' + list[i].id);
                    view.fields(
                        {
                            size: true
                        },
                        (data) => {
                            list[i].top = tabHeight;
                            tabHeight = tabHeight + data.height;
                            list[i].bottom = tabHeight;
                        }
                    ).exec();
                }

                that.setData({
                    load: false,
                    list: list
                });
            }

            let scrollTop = e.detail.scrollTop + 20;

            for (let i = 0; i < list.length; i++) {
                if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
                    that.setData({
                        VerticalNavTop: (list[i].id - 1) * 50,
                        TabCur: list[i].id
                    });
                    return false;
                }
            }
        }
    }
};
</script>
<style>
@import './index.css';
</style>
