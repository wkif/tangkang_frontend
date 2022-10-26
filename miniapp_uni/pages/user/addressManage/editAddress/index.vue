<template>
    <view>
        <van-nav-bar title="地址详情" left-text="返回" fixed left-arrow @click-left="onClickLeft" />
        <view class="app" :style="'margin-top:' + marginTopview + 'px;'">
            <van-cell-group>
                <van-field v-model="name" required clearable label="姓名" placeholder="请输入姓名" @click-icon="onClickIcon" />
                <van-field v-model="phone" required clearable label="手机" placeholder="请输入手机号码" @click-icon="onClickIcon" />
                <van-field v-model="address" required clearable label="详细地址" placeholder="请输入详细地址" @click-icon="onClickIcon" />
                <van-field v-model="postalCode" required clearable label="邮政编码" placeholder="请输入邮政编码" @click-icon="onClickIcon" />
            </van-cell-group>
            <view class="cu-form-group">
                <view class="title">地址</view>
                <region-picker @change="RegionChange" :value="baseAddress" :custom-item="customItem">
                    <view class="picker">{{ baseAddress[0] }}，{{ baseAddress[1] }}，{{ baseAddress[2] }}</view>
                </region-picker>
            </view>
            设置为默认地址：
            <van-switch :checked="isDefault" @change="onChange" />
            <view class="buttonView">
                <button class="cu-btn bg-green shadow-blur round lg" v-if="!editFlag" @tap="onClick">保存</button>
                <button class="cu-btn bg-green shadow-blur round lg" v-else @tap="submitEdit">保存</button>
                <!-- <van-button type="primary" wx:if="{{!editFlag}}" bind:click="onClick">保存</van-button>
        <van-button type="primary" wx:else bind:click="submitEdit">保存</van-button> -->
            </view>
        </view>
    </view>
</template>

<script>
import vanField from './@vant/weapp/field/index';
import vanSwitch from './@vant/weapp/switch/index';
// pages/user/addressManage/editAddress/index.js
const app = getApp();
export default {
    components: {
        vanField,
        vanSwitch
    },
    data() {
        return {
            id: 1,
            name: '',
            phone: '',
            baseAddress: ['广东省', '广州市', '海珠区'],
            address: '',
            isDefault: true,
            postalCode: '',
            editFlag: false,
            marginTopview: app.globalData.navBarHeight,
            customItem: ''
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        let addI = JSON.parse(options?.add);

        if (addI) {
            this.setData({
                id: addI.id,
                name: addI.name,
                phone: addI.phone,
                baseAddress: addI.baseAddress.split(','),
                address: addI.address,
                postalCode: addI.postalCode,
                isDefault: addI.isDefault,
                editFlag: true
            });
        } else {
            this.setData({
                id: 1,
                name: '',
                phone: '',
                baseAddress: ['', '', ''],
                postalCode: '',
                isDefault: false
            });
        }
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

        onChange({ detail }) {
            // 需要手动对 checked 状态进行更新
            this.setData({
                isDefault: detail
            });
        },

        RegionChange: function (e) {
            if (app.globalData.speedFlag) {
                app.globalData.$Text2Speech(e.detail.value.join(''));
            }

            this.setData({
                baseAddress: e.detail.value
            });
        },

        onClick() {
            let data = {
                userId: uni.getStorageSync('userInfo').id,
                name: this.name,
                phone: this.phone,
                baseAddress: this.baseAddress.join(','),
                address: this.address,
                postalCode: this.postalCode,
                isDefault: this.isDefault
            };
            app.globalData.$api.addAddressByUserid(data).then((res) => {
                if (res.status === 200) {
                    uni.navigateBack({
                        delta: 1
                    });
                } else {
                    uni.showToast({
                        title: res.data,
                        icon: 'none',
                        duration: 2000
                    });
                }
            });
        },

        submitEdit() {
            let data = {
                userId: uni.getStorageSync('userInfo').id,
                addressId: this.id,
                name: this.name,
                phone: this.phone,
                baseAddress: this.baseAddress.join(','),
                address: this.address,
                postalCode: this.postalCode,
                isDefault: this.isDefault
            };
            app.globalData.$api.editAddress(data).then((res) => {
                if (res.status === 200) {
                    uni.showToast({
                        title: res.data,
                        icon: 'success',
                        duration: 2000
                    });
                    uni.navigateBack({
                        delta: 1
                    });
                } else {
                    uni.showToast({
                        title: res.data,
                        icon: 'none',
                        duration: 2000
                    });
                }
            });
        },

        onClickIcon() {
            console.log('占位：函数 onClickIcon 未声明');
        }
    }
};
</script>
<style>
@import './index.css';
</style>
