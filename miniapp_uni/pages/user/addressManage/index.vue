<template>
    <view>
        <van-nav-bar title="地址管理" left-text="返回" fixed left-arrow @click-left="onClickLeft" />
        <view class="app" :style="'margin-top:' + marginTopview + 'px;'">
            <view class="data" v-if="addressList">
                <van-cell-group inset v-for="(item, index) in addressList" :key="index">
                    <van-cell
                        v-if="item.isDefault"
                        :value="item.address + ' \n 邮编：' + item.postalCode"
                        :label="'电话：' + item.phone + ' '"
                        @tap.native="editAddress($event, { addressId: item.id })"
                        :data-addressId="item.id"
                        @longpress.native="handleDel($event, { addressId: item.id })"
                        is-link
                    >
                        <view slot="title">
                            <view class="van-cell-text">{{ item.name }}</view>
                            <van-tag type="success">默认</van-tag>
                        </view>
                    </van-cell>

                    <van-cell
                        v-else
                        :title="item.name"
                        :value="item.address + ' 邮编：' + item.postalCode"
                        :label="'电话：' + item.phone"
                        @tap.native="editAddress($event, { addressId: item.id })"
                        :data-addressId="item.id"
                        @longpress.native="handleDel($event, { addressId: item.id })"
                        is-link
                    />
                </van-cell-group>
            </view>
            <van-empty v-else description="描述文字" />
            <button class="cu-btn block line-cyan lg" @tap="editAddress">
                <text class="cuIcon-upload"></text>
                新增
            </button>
        </view>
    </view>
</template>

<script>
import vanCell from './@vant/weapp/cell/index';
import vanCellGroup from './@vant/weapp/cell-group/index';
import vanTag from './@vant/weapp/tag/index';
// pages/user/addressManage/index.js
const app = getApp();
export default {
    components: {
        vanCell,
        vanCellGroup,
        vanTag
    },
    data() {
        return {
            addressList: [],
            marginTopview: app.globalData.navBarHeight
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getAdd();
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
        onClickLeft() {
            uni.navigateBack({
                delta: 1
            });
        },

        editAddress(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            console.log(e);
            let addId = e.currentTarget.dataset.addressid;
            let add = '';

            for (let i = 0; i < this.addressList.length; i++) {
                if (this.addressList[i].id == addId) {
                    add = this.addressList[i];
                }
            }

            uni.navigateTo({
                url: `/pages/user/addressManage/editAddress/index?add=${JSON.stringify(add)}`
            });
        },

        handleDel(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            let addId = e.currentTarget.dataset.addressid;
            let that = this;
            uni.showModal({
                title: '提示',
                content: '确定要删除该地址吗？',

                success(res) {
                    if (res.confirm) {
                        let data = {
                            userId: uni.getStorageSync('userInfo').id,
                            addressId: addId
                        };
                        app.globalData.$api.deleteAddressByUserid(data).then((res) => {
                            if (res.status === 200) {
                                that.getAdd();
                            } else {
                                uni.showToast({
                                    title: res.data,
                                    icon: 'none',
                                    duration: 2000
                                });
                            }
                        });
                    } else if (res.cancel) {
                        console.log('用户点击取消');
                    }
                }
            });
        },

        getAdd() {
            let data = {
                userId: uni.getStorageSync('userInfo').id
            };
            app.globalData.$api.getAddressByUsrid(data).then((res) => {
                console.log(res);

                if (res.status == 400) {
                    uni.showToast({
                        title: res.data,
                        icon: 'none'
                    });
                } else {
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].isDefault == 1) {
                            [res.data[0], res.data[i]] = [res.data[i], res.data[0]];
                        }
                    }

                    this.setData({
                        addressList: res.data
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
