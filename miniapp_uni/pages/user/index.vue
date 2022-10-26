<template>
    <view class="app">
        <view class="topView">
            <view class="circle1"></view>
            <view class="circle2 animate-bounce-up"></view>
            <view class="infoView" v-if="loginFlag">
                <van-transition name="slide-left">
                    <van-row>
                        <van-col span="4">
                            <div class="head-img">
                                <image class="avatar" :src="userInfo.avatar"></image>
                            </div>
                        </van-col>
                        <van-col span="10" offset="4">
                            <view class="name">{{ userInfo.username }}</view>
                            <view class="desc">{{ userInfo.userStatement }}</view>
                        </van-col>
                    </van-row>
                </van-transition>
            </view>
            <view class="loginView" v-else>
                <view class="loginBtn" @tap="doLogin">登录</view>
                <!-- <van-button class="loginBtn" >登录</van-button> -->
            </view>
        </view>
        <view class="cardView">
            <view class="card">
                <view class="header">个性服务</view>
                <view class="content">
                    <van-row>
                        <van-col :span="24 / iconBox.length" v-for="(item, index) in iconBox" :key="index">
                            <view class="iconBox" @tap="gotoInfor" :data-path="item.path">
                                <van-icon :name="item.icon" size="35px" color="#aed6db" />
                                <text>{{ item.name }}</text>
                            </view>
                        </van-col>
                        <!-- <van-col span="6">
                        <view class="iconBox" bindtap="gotointegral">
                            <van-icon name="gold-coin-o" size="35px" color="#5cbc46" />
                            <text>积分</text>
                        </view>
                    </van-col> -->
                    </van-row>
                </view>
            </view>
        </view>
        <!-- <view>{{inviteCode}}</view> -->
        <view class="mainView">
            <van-cell-group inset v-for="(item, index) in cellList" :key="index">
                <van-cell :title="item.title" is-link :icon="item.icon" :label="item.label" @tap.native="gotoCell($event, { path: item.path })" :data-path="item.path" />
            </van-cell-group>
            <button class="contactButton" open-type="contact">联系客服</button>
            <button class="logoutButton" v-if="loginFlag" @tap="loginOut">退出登录</button>
            <view class="adView">
                <van-row class="adRow">
                    <van-col span="4">
                        <image class="adImg animate-bounce-up" src="/static/assets/img/present.png"></image>
                    </van-col>
                    <van-col span="10" offset="4">
                        <button class="addText" open-type="share">邀好友 赚积分</button>
                        <view class="count" v-if="userInfo.numberofPersonsInvited">已经邀请 {{ userInfo.numberofPersonsInvited }}1 人</view>
                    </van-col>
                </van-row>
            </view>
        </view>
    </view>
</template>

<script>
import vanDivider from './@vant/weapp/divider/index';
import vanRow from './@vant/weapp/row/index';
import vanCol from './@vant/weapp/col/index';
import vanCell from './@vant/weapp/cell/index';
import vanCellGroup from './@vant/weapp/cell-group/index';
// pages/user/index.js
// const $api = require('../../utils/api').API;
const app = getApp();
export default {
    components: {
        vanDivider,
        vanRow,
        vanCol,
        vanCell,
        vanCellGroup
    },
    data() {
        return {
            userInfo: {
                avatar: '',
                username: '',
                userStatement: '',
                numberofPersonsInvited: ''
            },
            InviteFriendsNum: 13,
            loginFlag: false,
            iconBox: [
                {
                    icon: 'friends-o',
                    name: '信息管理',
                    path: '/pages/user/informationManage/index'
                },
                {
                    icon: 'gold-coin-o',
                    name: '积分',
                    path: '/pages/user/integral/index'
                },
                {
                    icon: 'orders-o',
                    name: '订单',
                    path: '/pages/shop/orderManage/index'
                } // {
                //     icon: 'logistics',
                //     name: '物流',
                //     path: '/pages/nodata/index'
                // }
            ],
            cellList: [
                {
                    title: '地址管理',
                    path: '/pages/user/addressManage/index',
                    icon: 'location-o',
                    label: '管理您的收货地址'
                },
                {
                    title: '设置',
                    path: '/pages/user/setting/index',
                    icon: 'setting-o',
                    label: '个性化设置'
                },
                {
                    title: '关于我们',
                    path: '/pages/user/about/index',
                    icon: 'info-o',
                    label: '了解我们的项目'
                },
                {
                    title: '用户协议',
                    path: '/pages/user/userAgreement/index',
                    icon: 'question-o',
                    label: '请仔细阅读本《用户协议》'
                }
            ],
            inviteCode: '12',
            marginTopview: app.globalData.navBarHeight
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log('onLoad', options);
        this.setData({
            loginFlag: app.globalData.loginFlag,
            userInfo: uni.getStorageSync('userInfo'),
            inviteCode: options?.inviteCode
        });

        if (!this.loginFlag) {
            app.globalData
                .loginAutomatic()
                .then((res) => {
                    console.log('res', res);
                    this.setData({
                        loginFlag: true,
                        userInfo: uni.getStorageSync('userInfo')
                    });
                })
                .catch((err) => {
                    console.log('err', err);
                    this.setData({
                        loginFlag: false
                    });
                });
        }
    },
    // gotointegral() {
    //     if (!this.data.loginFlag) {
    //         wx.showToast({
    //             title: '请先登录',
    //             icon: 'none',
    //             duration: 2000//持续的时间
    //         })
    //         this.doLogin()
    //     } else {
    //         wx.navigateTo({
    //             url: '/pages/user/integral/index',
    //         })
    //     }
    // },
    onShareAppMessage: function () {
        if (this.userInfo) {
            return {
                title: '弹出分享时显示的分享标题',
                desc: '分享页面的内容',
                path: '/pages/user/index?inviteCode=' + this.userInfo.inviteCode // 路径，传递参数到指定页面。
            };
        } else {
            return {
                title: '弹出分享时显示的分享标题',
                desc: '分享页面的内容',
                path: '/pages/user/index'
            };
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
        doLogin() {
            let that = this;
            uni.getUserProfile({
                desc: '编辑会员资料',
                // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                complete: (res) => {
                    if (res.errMsg == 'getUserProfile:ok') {
                        console.log('成功了'); //存储用户昵称和头像

                        uni.setStorageSync('userInfo', {
                            name: res.userInfo.nickName,
                            img: res.userInfo.avatarUrl
                        });
                        let userInfo = res.userInfo;
                        uni.login({
                            success: (res) => {
                                console.log(res);
                                app.globalData.$api
                                    .wxLogin({
                                        code: res.code,
                                        info: userInfo,
                                        inviteCode: that.inviteCode
                                    })
                                    .then((res) => {
                                        // console.log('123131', res)
                                        if (res.status == 200) {
                                            uni.setStorageSync('token', res.token);
                                            uni.setStorageSync('userInfo', res.data);
                                            this.setData({
                                                loginFlag: true,
                                                userInfo: res.data
                                            });
                                            app.globalData.loginFlag = true;
                                            app.globalData.speedFlag = res.data.speed;
                                        } else {
                                            uni.showToast({
                                                title: res.msg,
                                                icon: 'none',
                                                duration: 2000
                                            });
                                        }
                                    });
                            }
                        });
                    } else {
                        console.log('234243', res);
                    }
                }
            });
        },

        loginOut() {
            uni.removeStorageSync('token');
            uni.removeStorageSync('userInfo');
            this.setData({
                loginFlag: false
            });
            app.globalData.loginFlag = false;
        },

        gotoInfor(e) {
            console.log('e', e.currentTarget.dataset.path);

            if (!this.loginFlag) {
                uni.showToast({
                    title: '请先登录',
                    icon: 'none',
                    duration: 2000 //持续的时间
                });
                this.doLogin();
            } else {
                uni.navigateTo({
                    url: e.currentTarget.dataset.path
                });
            }
        },

        gotoCell(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            let path = e.currentTarget.dataset.path;

            if (path == '/pages/user/addressManage/index') {
                if (this.loginFlag) {
                    uni.navigateTo({
                        url: path
                    });
                } else {
                    uni.showToast({
                        title: '请先登录',
                        icon: 'none',
                        duration: 2000 //持续的时间
                    });
                    this.doLogin();
                }
            } else {
                uni.navigateTo({
                    url: path
                });
            } // wx.navigateTo({
            //     url: path,
            // })
        }
    }
};
</script>
<style>
@import './index.css';
</style>
