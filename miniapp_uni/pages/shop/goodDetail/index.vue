<template>
    <view>
        <van-nav-bar title="商品详情" left-text="返回" fixed left-arrow @click-left="onClickLeft" />
        <view class="app">
            <view class="main">
                <view class="topImg">
                    <image :src="goodDetail.image" mode="widthFix" />
                </view>
                <view class="goodDetail radius shadow shadow-lg bg-white">
                    <view class="price">￥{{ goodDetail.price }}</view>
                    <view class="info">
                        <view class="name">{{ goodDetail.name }}</view>
                        <view class="caption">{{ goodDetail.caption }}</view>
                        <view class="desc">{{ goodDetail.detail }}</view>
                        <view class="brand">
                            <van-tag color="#ffe1e1" text-color="#ad0000">{{ goodDetail.brand }}</van-tag>
                        </view>
                    </view>
                </view>
                <view class="imgList">
                    <image :src="item" mode="widthFix" v-for="(item, index) in swiperList" :key="index"></image>
                </view>
                <view class="commitList">
                    <view class="cu-list menu-avatar comment solids-top">
                        <view class="cu-item" v-for="(item, index) in goodDetail.comments" :key="index">
                            <view class="cu-avatar round" :style="'background-image:url(' + item.user.avatar + ');'"></view>

                            <view class="content">
                                <view class="text-grey">{{ item.user.username }}</view>
                                <view class="text-gray text-content text-df">
                                    <text>{{ item.content }}</text>
                                </view>
                                <view class="margin-top-sm flex justify-between">
                                    <view>
                                        <van-rate readonly :value="item.score" />
                                    </view>
                                    <view class="text-gray text-df">{{ item.add_time }}</view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="bottomView">
                <view class="cu-bar bg-white tabbar border shop">
                    <button class="action" open-type="contact">
                        <view class="cuIcon-service text-green">
                            <view class="cu-tag badge"></view>
                        </view>
                        客服
                    </button>
                    <view class="action" @tap="gotoOrderManage">
                        <view class="cuIcon-cart">
                            <!-- <view class="cu-tag badge">99</view> -->
                        </view>
                        订单
                    </view>
                    <view class="btn-group">
                        <!-- <button class="cu-btn bg-orange round shadow-blur">加入购物车</button> -->
                        <button class="cu-btn bg-themeColor round shadow-blur" @tap="addOrder" :data-goodid="goodDetail.id">立即订购</button>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import vanTag from './@vant/weapp/tag/index';
import vanRate from './@vant/weapp/rate/index';
// pages/shop/goodDetail/index.js
const app = getApp();
export default {
    components: {
        vanTag,
        vanRate
    },
    data() {
        return {
            goodId: '',
            goodDetail: {
                image: '',
                price: '',
                name: '',
                caption: '',
                detail: '',
                brand: '',
                comments: [],
                id: ''
            },
            swiperList: []
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            goodId: options.goodId
        });
        this.getGoodDetail();
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

        async getGoodDetail() {
            let data = {
                goodsId: Number(this.goodId),
                userId: uni.getStorageSync('userInfo').id
            };
            let res = await app.globalData.$api.getGoodDetail(data);

            if (res.status == 200) {
                this.setData({
                    goodDetail: res.data,
                    swiperList: res.data.imgList.split(',')
                });
            } else {
                uni.showToast({
                    title: res.data,
                    icon: 'none',
                    duration: 2000
                });
            } // console.log('this.data.goodDetail.imgList', this.data.goodDetail.imgList)
            // this.setData({
            //     swiperList: this.data.goodDetail.imgList.split(",")
            // })
        },

        gotoOrderManage() {
            uni.navigateTo({
                url: '/pages/shop/orderManage/index'
            });
        },

        addOrder(e) {
            console.log('e', e.currentTarget.dataset.goodid);
            uni.navigateTo({
                url: `/pages/shop/addOrder/index?goodId=${e.currentTarget.dataset.goodid}`
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
