<template>
    <view>
        <van-nav-bar title="个人信息" left-text="返回" left-arrow @click-left="onClickLeft" />
        <view class="app" :style="'margin-top:' + marginTopview + 'px;'">
            <form>
                <view class="cu-form-group margin-top">
                    <view class="title">手机号码</view>
                    <input placeholder="手机号码" :value="userInfo.mobile" maxlength="11" @change="inputPhoneNum" />
                    <view class="cu-capsule radius">
                        <view class="cu-tag bg-blue">+86</view>
                        <view class="cu-tag line-blue">中国大陆</view>
                    </view>
                </view>
                <view class="cu-form-group">
                    <view class="title">邮件</view>
                    <input placeholder="可选" :value="userInfo.email" @change="inputemail" />
                </view>
                <view class="cu-form-group">
                    <view class="title">性别</view>
                    <switch class="red sm switch-sex" :checked="userInfo.gender" @change="changeSex"></switch>
                </view>
                <view class="cu-form-group">
                    <view class="title">身高</view>
                    <picker @change="PickerChangeheight" :value="userInfo.height" :range="heightPicker">
                        <view class="picker">{{ userInfo.height }}</view>
                    </picker>
                </view>
                <view class="cu-form-group">
                    <view class="title">体重</view>
                    <picker @change="PickerChangeweight" :value="userInfo.weight" :range="weightPicker">
                        <view class="picker">{{ userInfo.weight }}</view>
                    </picker>
                </view>
                <view class="cu-form-group">
                    <view class="title">腰围</view>
                    <picker @change="PickerChangewaistline" :value="userInfo.waistline" :range="waistlinePicker">
                        <view class="picker">{{ userInfo.waistline }}</view>
                    </picker>
                </view>
                <view class="cu-form-group">
                    <view class="title">血型</view>
                    <picker @change="PickerChangebloodType" :value="userInfo.bloodType" :range="bloodTypePicker">
                        <view class="picker">{{ userInfo.bloodType }}</view>
                    </picker>
                </view>
                <view class="cu-form-group">
                    <view class="title">出生日期</view>
                    <picker mode="date" :value="userInfo.birthday" start="1949-10-01" @change="DateChange">
                        <view class="picker">
                            {{ userInfo.birthday }}
                        </view>
                    </picker>
                </view>
            </form>
            <view class="cu-bar btn-group">
                <button class="cu-btn bg-green shadow-blur round lg" @tap="submit">保存</button>
            </view>
        </view>
    </view>
</template>

<script>
import vanField from './@vant/weapp/field/index';
// pages/user/imformationManage/index.js
const app = getApp();
export default {
    components: {
        vanField
    },
    data() {
        return {
            userInfo: {
                height: '',
                weight: '',
                bloodType: '',
                waistline: '',
                gender: 0,
                birthday: '',
                mobile: '',
                email: ''
            },
            heightPicker: [],
            weightPicker: [],
            waistlinePicker: [],
            bloodTypePicker: ['A', 'B', 'AB', 'O', 'Rh阳性', 'Rh阴性', '其他'],
            index: 0,
            endDate: '',
            marginTopview: app.globalData.navBarHeight
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // this.setData({
        //     userInfo: wx.getStorageSync('userInfo')
        // })
        this.getUserInfo();
        let heightPicker = [];

        for (let i = 100; i < 250; i++) {
            heightPicker.push(i);
        }

        this.setData({
            heightPicker: heightPicker
        });
        let weightPicker = [];

        for (let i = 30; i < 200; i++) {
            weightPicker.push(i);
        }

        this.setData({
            weightPicker: weightPicker
        });
        let waistlinePicker = [];

        for (let i = 30; i < 200; i++) {
            waistlinePicker.push(i);
        }

        this.setData({
            waistlinePicker: waistlinePicker
        });
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

        PickerChangeheight(e) {
            // console.log(e);
            if (app.globalData.speedFlag) {
                app.globalData.$Text2Speech(`身高已经更改为${this.heightPicker[e.detail.value]}厘米`);
            }

            this.setData({
                'userInfo.height': this.heightPicker[e.detail.value]
            });
        },

        PickerChangeweight(e) {
            // console.log(e);
            if (app.globalData.speedFlag) {
                app.globalData.$Text2Speech(`体重已经更改为${this.weightPicker[e.detail.value]}公斤`);
            }

            this.setData({
                'userInfo.weight': this.weightPicker[e.detail.value]
            });
        },

        PickerChangebloodType(e) {
            // console.log(e);
            if (app.globalData.speedFlag) {
                app.globalData.$Text2Speech(`血型已经更改为${this.bloodTypePicker[e.detail.value]}`);
            }

            this.setData({
                'userInfo.bloodType': this.bloodTypePicker[e.detail.value]
            });
        },

        PickerChangewaistline(e) {
            // console.log(e);
            if (app.globalData.speedFlag) {
                app.globalData.$Text2Speech(`腰围已经更改为${this.waistlinePicker[e.detail.value]}厘米`);
            }

            this.setData({
                'userInfo.waistline': this.waistlinePicker[e.detail.value]
            });
        },

        changeSex(e) {
            console.log('e', e.detail.value);

            if (app.globalData.speedFlag) {
                app.globalData.$Text2Speech(`性别已经更改为${e.detail.value ? '女' : '男'}`);
            }

            if (e.detail.value) {
                this.setData({
                    'userInfo.gender': 1
                });
            } else {
                this.setData({
                    'userInfo.gender': 0
                });
            }
        },

        DateChange(e) {
            if (app.globalData.speedFlag) {
                app.globalData.$Text2Speech(`出生日期已经更改为${e.detail.value}`);
            }

            this.setData({
                'userInfo.birthday': e.detail.value
            });
        },

        // 手机号部分
        inputPhoneNum: function (e) {
            let phoneNumber = e.detail.value;

            if (phoneNumber.length === 11) {
                let checkedNum = this.checkPhoneNum(phoneNumber);

                if (checkedNum) {
                    this.setData({
                        'userInfo.mobile': phoneNumber
                    });
                } else {
                    uni.showToast({
                        title: '手机号格式不正确',
                        icon: 'none',
                        duration: 2000
                    });
                }
            } else {
                uni.showToast({
                    title: '手机号格式不正确',
                    icon: 'none',
                    duration: 2000
                });
            }
        },

        checkPhoneNum: function (phoneNumber) {
            // 手机号检验
            let reg = /^1[3456789]\d{9}$/;

            if (reg.test(phoneNumber)) {
                return true;
            } else {
                return false;
            }
        },

        // 邮箱验证部分
        inputemail: function (e) {
            let email = e.detail.value;
            let checkedNum = this.checkEmail(email);

            if (checkedNum) {
                this.setData({
                    'userInfo.email': email
                });
            } else {
                uni.showToast({
                    title: '邮箱格式不正确',
                    icon: 'none',
                    duration: 2000
                });
            }
        },

        checkEmail: function (email) {
            // 邮箱检验
            let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;

            if (reg.test(email)) {
                return true;
            } else {
                return false;
            }
        },

        submit: function () {
            let userInfo = this.userInfo;
            let that = this;

            if (userInfo.height && userInfo.weight && userInfo.waistline && userInfo.bloodType && userInfo.birthday && userInfo.mobile && userInfo.email) {
                uni.showLoading({
                    title: '提交中',
                    mask: true
                });
                let data = {
                    userId: userInfo.id,
                    email: userInfo?.email,
                    gender: userInfo.gender,
                    height: userInfo.height,
                    weight: userInfo.weight,
                    waistline: userInfo.waistline,
                    bloodType: userInfo.bloodType,
                    birthday: userInfo.birthday,
                    mobile: userInfo.mobile
                };
                app.globalData.$api.updateUserInfo(data).then((res) => {
                    uni.hideLoading();

                    if (res.status === 200) {
                        uni.showToast({
                            title: '提交成功',
                            icon: 'success',
                            duration: 2000
                        });

                        if (app.globalData.speedFlag) {
                            app.globalData.$Text2Speech(`提交成功`);
                        }

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
            }
        },

        getUserInfo: function () {
            let data = {
                userId: uni.getStorageSync('userInfo').id
            };
            app.globalData.$api.getUserInfoByUserId(data).then((res) => {
                if (res.status === 200) {
                    let userInfo = res.data;
                    this.setData({
                        userInfo
                    });
                    uni.setStorageSync('userInfo', userInfo);
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
