<template>
    <view>
        <van-nav-bar title="订单管理" left-text="返回" fixed left-arrow @click-left="onClickLeft" />
        <view class="app">
            <view class="tabView">
                <scroll-view scroll-x class="bg-white nav">
                    <view class="flex text-center">
                        <view
                            :class="'cu-item flex-sub ' + (index == TabCur ? 'text-themeColor cur' : '')"
                            @tap="tabSelect"
                            :data-id="index"
                            v-for="(item, index) in tabList"
                            :key="index"
                        >
                            {{ item }}
                        </view>
                    </view>
                </scroll-view>
            </view>
            <view class="orderList">
                <view class="padding-xl radius shadow-warp bg-white margin-top" v-for="(item, index) in currentList" :key="index">
                    <view class="order" hover-class="none" :hover-stop-propagation="false">
                        <view class="title">
                            <view class="name">{{ item.good.name }}</view>
                            <view class="status">
                                <van-tag plain type="success">{{ item.order_status }}</van-tag>
                            </view>
                        </view>
                        <view class="goodInfo">
                            <view class="goodImg">
                                <image class="img" :src="item.good.image" mode="widthFix" />
                            </view>
                            <view class="goodIn">
                                <view class="detail">{{ item.good.detail }}</view>
                                <view class="num">x{{ item.total_count }}</view>
                                <view class="price">￥{{ item.total_price }}</view>
                            </view>
                        </view>
                        <van-divider />
                        <view class="orderInfo">
                            <view class="addressInfo">
                                <view class="name">{{ item.address.name }}</view>
                                <view class="phone">{{ item.address.phone }}</view>
                            </view>
                            <view class="address">{{ item.address.address }}</view>
                            <view class="orderNum">订单号：{{ item.order_id }}</view>
                            <view class="orderTime">下单时间：{{ item.update_datetime }}</view>
                            <view class="trade_no" v-if="TabCur >= 2">快递单号：{{ item.trade_no }}</view>
                        </view>
                        <view class="buttonView">
                            <view class="button" v-if="TabCur == 0" @tap="payOrder" :data-id="item.id">
                                <button class="cu-btn bg-themeColor">付款</button>
                            </view>
                            <view class="button" v-if="TabCur == 0" @tap="cancelOrder" :data-id="item.id">
                                <button class="cu-btn bg-red">取消订单</button>
                            </view>
                            <view class="button" v-if="TabCur == 2" @tap="confirmOrder" :data-id="item.id">
                                <button class="cu-btn bg-themeColor">确认收货</button>
                            </view>
                            <view class="button" v-if="TabCur >= 2 && TabCur != 5" @tap="express" :data-trade_no="item.trade_no">
                                <button class="cu-btn bg-grey">查看物流</button>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import vanTag from './@vant/weapp/tag/index';
import vanDivider from './@vant/weapp/divider/index';
// pages/shop/orderManage/index.js
const app = getApp();
export default {
    components: {
        vanTag,
        vanDivider
    },
    data() {
        return {
            orderList: [],
            tabList: ['待支付', '待发货', '待收货', '待评价', '已完成', '已取消'],
            TabCur: 0,
            scrollLeft: 0,
            currentList: []
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getMyOrderList();
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
        tabSelect(e) {
            this.setData({
                TabCur: e.currentTarget.dataset.id,
                scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
                currentList: this.orderList[e.currentTarget.dataset.id]
            });
        },

        onClickLeft() {
            uni.navigateBack({
                delta: 1
            });
        },

        async getMyOrderList() {
            let data = {
                userId: uni.getStorageSync('userInfo').id
            };
            let res = await app.globalData.$api.getMyOrderList(data);

            if (res.status == 200) {
                this.setData({
                    orderList: res.data,
                    currentList: res.data[0]
                });
            } else {
                uni.showToast({
                    title: res.data,
                    icon: 'none',
                    duration: 2000
                });
            }
        },

        payOrder(e) {
            console.log('e', e.currentTarget.dataset.id);
            let data = {
                orderId: e.currentTarget.dataset.id,
                userId: uni.getStorageSync('userInfo').id
            };
            app.globalData.$api.payOrder(data).then((res) => {
                if (res.status == 200) {
                    uni.showToast({
                        title: res.data,
                        icon: 'none',
                        duration: 2000
                    });
                    this.getMyOrderList(); // wx.requestPayment({
                    //     timeStamp: res.data.timeStamp,
                    //     nonceStr: res.data.nonceStr,
                    //     package: res.data.package,
                    //     signType: res.data.signType,
                    //     paySign: res.data.paySign,
                    //     success: function (res) {
                    //         console.log('success', res)
                    //     },
                    //     fail: function (res) {
                    //         console.log('fail', res)
                    //     }
                    // })
                } else {
                    uni.showToast({
                        title: res.data,
                        icon: 'none',
                        duration: 2000
                    });
                }
            });
        },

        confirmOrder(e) {
            // console.log('e', e.currentTarget.dataset.id)
            let data = {
                orderId: e.currentTarget.dataset.id,
                userId: uni.getStorageSync('userInfo').id
            };
            app.globalData.$api.confirmOrder(data).then((res) => {
                if (res.status == 200) {
                    uni.showToast({
                        title: res.data,
                        icon: 'none',
                        duration: 2000
                    });
                    this.getMyOrderList();
                } else {
                    uni.showToast({
                        title: res.data,
                        icon: 'none',
                        duration: 2000
                    });
                }
            });
        },

        cancelOrder(e) {
            let data = {
                orderId: e.currentTarget.dataset.id,
                userId: uni.getStorageSync('userInfo').id
            }; // 询问

            uni.showModal({
                title: '提示',
                content: '确定取消订单吗？',
                success: (res) => {
                    if (res.confirm) {
                        app.globalData.$api.cancelOrder(data).then((res) => {
                            if (res.status == 200) {
                                uni.showToast({
                                    title: res.data,
                                    icon: 'none',
                                    duration: 2000
                                });
                                this.getMyOrderList();
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
            });
        },

        express(e) {
            console.log('e', e.currentTarget.dataset.trade_no);
            uni.showToast({
                title: '复制成功'
            });
            uni.setClipboardData({
                data: e.currentTarget.dataset.trade_no,
                success: function (res) {
                    uni.getClipboardData({
                        success: function (res) {
                            console.log(res.data); // data
                        }
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
