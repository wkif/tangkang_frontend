<template>
    <view>
        <van-nav-bar title="订单" left-text="返回" fixed left-arrow @click-left="onClickLeft" />
        <view class="app">
            <view class="main">
                <view class="padding-xl radius shadow bg-white">
                    <van-cell-group inset>
                        <van-cell :value="address.address + ' \n 邮编：' + address.postalCode" :label="'电话：' + address.phone + ' '" is-link>
                            <view slot="title">
                                <view class="van-cell-text">{{ address.name }}</view>
                            </view>
                        </van-cell>
                    </van-cell-group>
                </view>
                <view class="padding-xl radius shadow bg-white">
                    <van-card :num="total_count" :tag="goodDetail.brand" :price="goodDetail.price" :desc="goodDetail.details" :title="goodDetail.name" :thumb="goodDetail.image">
                        <view slot="footer">
                            <van-button size="mini" @tap.native="reduce">-</van-button>
                            <van-button size="mini" @tap.native="add">+</van-button>
                        </view>
                    </van-card>
                </view>
            </view>
            <view class="bottomView">
                <van-submit-bar :price="total_price" button-text="提交订单" @submit="onSubmit" />
            </view>
        </view>
    </view>
</template>

<script>
import vanSubmitBar from './@vant/weapp/submit-bar/index';
import vanCard from './@vant/weapp/card/index';
import vanCell from './@vant/weapp/cell/index';
import vanCellGroup from './@vant/weapp/cell-group/index';
import vanTag from './@vant/weapp/tag/index';
// pages/shop/addOrder/index.js
const app = getApp();

const { regFenToYuan } = require('../../../utils/util');

export default {
    components: {
        vanSubmitBar,
        vanCard,
        vanCell,
        vanCellGroup,
        vanTag
    },
    data() {
        return {
            goodid: '',
            total_price: 1200,
            total_count: 1,
            goodDetail: {
                brand: '',
                price: '',
                details: '',
                name: '',
                image: ''
            },
            addressList: [],
            address: {
                address: '',
                postalCode: '',
                phone: '',
                name: ''
            }
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log('options', options);
        this.setData({
            goodid: options.goodId
        });
        this.getGoodDetail();
        this.getAddressList();
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

        reduce() {
            if (this.total_count > 1) {
                this.setData({
                    total_count: this.total_count - 1,
                    total_price: this.goodDetail.price * (this.total_count - 1) * 100
                });
            }
        },

        add() {
            if (this.total_count < this.goodDetail.stock) {
                this.setData({
                    total_count: this.total_count + 1,
                    total_price: this.goodDetail.price * (this.total_count + 1) * 100
                });
            } else {
                uni.showToast({
                    title: '库存不足',
                    icon: 'none'
                });
            }
        },

        async getGoodDetail() {
            let data = {
                goodsId: Number(this.goodid),
                userId: uni.getStorageSync('userInfo').id
            };
            let res = await app.globalData.$api.getGoodDetail(data);

            if (res.status == 200) {
                this.setData({
                    goodDetail: res.data,
                    total_price: res.data.price * 100
                });
            } else {
                uni.showToast({
                    title: res.data,
                    icon: 'none',
                    duration: 2000
                });
            }
        },

        async getAddressList() {
            let data = {
                userId: uni.getStorageSync('userInfo').id
            };
            let res = await app.globalData.$api.getAddressByUsrid(data);

            if (res.status == 200) {
                this.setData({
                    addressList: res.data
                });
                res.data.forEach((element) => {
                    if (element.isDefault == 1) {
                        this.setData({
                            address: element
                        });
                    }
                });
            } else {
                uni.showToast({
                    title: res.data,
                    icon: 'none',
                    duration: 2000
                });
            }
        },

        onSubmit() {
            if (this.address == '') {
                uni.showToast({
                    title: '请选择地址',
                    icon: 'none',
                    duration: 2000
                });
                return;
            } // if(this.data.total_price!==this.data.total_count)

            let data = {
                userId: uni.getStorageSync('userInfo').id,
                goodId: Number(this.goodid),
                total_count: this.total_count,
                addressId: this.address.id,
                total_price: regFenToYuan(this.total_price)
            };
            app.globalData.$api.addOrder(data).then((res) => {
                if (res.status == 200) {
                    uni.showToast({
                        title: '添加成功',
                        icon: 'success',
                        duration: 2000
                    });
                    setTimeout(() => {
                        uni.navigateTo({
                            url: '/pages/shop/orderManage/index'
                        });
                    }, 2000);
                } else {
                    uni.showToast({
                        title: res.data,
                        icon: 'none',
                        duration: 2000
                    });
                }
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
