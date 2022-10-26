<template>
    <view>
        <van-nav-bar title="用户协议" left-text="返回" fixed left-arrow @click-left="onClickLeft" />
        <view class="app">
            <view class="content-info">
                <towxml :nodes="article" />
                <view class="content-info-title">
                    <text>创建时间：{{ createTime }}\n</text>
                    <text>更新时间：{{ updateTime }}\n</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import towxml from '../../../towxml/towxml';
// pages/user/userAgreement/index.js
const $api = require('../../../utils/api').API;

const app = getApp();
export default {
    components: {
        towxml
    },
    data() {
        return {
            article: {},
            createTime: '',
            updateTime: ''
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        (async () => {
            //markdown数据源
            let res = await $api.getUserAgreement(options.id);
            console.log('res', res);
            this.setData({
                createTime: res.data.createTime.split('T')[0],
                updateTime: res.data.updateTime.split('T')[0]
            });
            let result = app.globalData.towxml(res.data.content, 'markdown', {
                base: 'www.xxx.com',
                theme: 'light',
                events: {
                    tap: (e) => {
                        console.log('h4', e);
                    }
                }
            }); // 更新解析数据

            this.setData({
                article: result
            });
        })();
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
        }
    }
};
</script>
<style>
@import './index.css';
</style>
