<template>
    <view>
        <van-nav-bar :title="newsData.title" left-text="返回" fixed left-arrow @click-left="onClickLeft" />
        <view class="app" :style="'margin-top:' + marginTopview + 'px;'">
            <view class="content-info">
                <scroll-view scroll-y :scroll-top="scrollTop" :scroll-with-animation="true" style="height: 100vh" :scroll-into-view="toViewid">
                    <view class="coverImg">
                        <image :src="newsData.cover" mode="widthFix" />
                    </view>
                    <view class="title">{{ newsData.title }}</view>
                    <view class="content-time">
                        <!-- <text>创建时间：{{newsData.createTime}}\n</text> -->
                        <text>{{ newsData.updateTime }}\n</text>
                    </view>
                    <towxml :nodes="article" />
                    <view class="tool">
                        <view class="tool-item" @tap="goTop">
                            <image src="/static/assets/icon/go_to_top.png" />
                        </view>
                        <view class="tool-item" @tap="goCommit">
                            <image src="/static/assets/icon/commit.png" />
                            <!-- <text>评论</text> -->
                        </view>
                    </view>
                    <view class="commitView" id="commitView">
                        <view class="commitInput">
                            <view class="cu-bar input">
                                <view class="cu-avatar round" :style="'background-image:url(' + userInfo.avatar + ');'"></view>
                                <input @input="input" class="solid-bottom" maxlength="300" cursor-spacing="10" />
                                <button class="cu-btn bg-green shadow-blur" @tap="submit">发送</button>
                            </view>
                        </view>
                        <view class="cu-list menu-avatar comment solids-top">
                            <view class="cu-item" v-for="(item, index) in commitList" :key="index">
                                <view class="cu-avatar round" :style="'background-image:url(' + item.user.avatar + ');'"></view>

                                <view class="content">
                                    <view class="text-grey">{{ item.user.username }}</view>
                                    <view class="text-gray text-content text-df">{{ item.content }}</view>
                                    <view class="margin-top-sm flex justify-between">
                                        <view class="text-gray text-df">{{ item.time }}</view>
                                        <view>
                                            <view class="text-gray text-df" v-if="userInfo.id == item.user.id" @tap="deleteFun" :data-id="item.id">
                                                <text class="cuIcon-delete lg text-gray"></text>
                                            </view>
                                            <text class="text-gray">{{ index + 1 }}楼</text>
                                            <!-- <text class="cuIcon-messagefill text-gray margin-left-sm"></text> -->
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </scroll-view>
            </view>
        </view>
    </view>
</template>

<script>
import towxml from '../../../towxml/towxml';
import vanSticky from './@vant/weapp/sticky/index';
// pages/home/newsDetail/index.js
const app = getApp();
export default {
    components: {
        towxml,
        vanSticky
    },
    data() {
        return {
            newsId: '',
            article: '',
            newsData: {
                title: '',
                cover: '',
                updateTime: ''
            },
            commitList: [],
            scrollTop: 0,
            offsetTop: 0,
            toViewid: '',
            userInfo: uni.getStorageSync('userInfo'),
            inputValue: '',
            marginTopview: app.globalData.navBarHeight
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // this.setData({
        //     newsId: options.id
        // })
        // this.getNewsDetail()
        (async () => {
            //markdown数据源
            // 加载
            uni.showLoading({
                title: '加载中'
            });
            let data = {
                userId: uni.getStorageSync('userInfo').id,
                newsId: options.id
            };
            let res = await app.globalData.$api.getNewsDetail(data);
            console.log('res', res);
            this.setData({
                newsData: res.data.news // commitList: res.data.commitList
            });
            let result = app.globalData.towxml(res.data.news.content, 'markdown', {
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
            this.getNewsComment(); // 关闭加载

            uni.hideLoading();
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
        },

        goTop() {
            //scroll-view的方法
            this.setData({
                scrollTop: 0
            });
        },

        input(e) {
            this.setData({
                inputValue: e.detail.value
            });
        },

        getNewsComment() {
            let data = {
                userId: this.userInfo.id,
                newsId: this.newsData.id
            };
            app.globalData.$api.getNewsComment(data).then((res) => {
                if (res.status == 200) {
                    this.setData({
                        commitList: res.data
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

        goCommit() {
            this.setData({
                toViewid: 'commitView'
            });
        },

        async submit() {
            let data = {
                userId: this.userInfo.id,
                newsId: this.newsData.id,
                content: this.inputValue
            };
            let res = await app.globalData.$api.addCommit(data);

            if (res.status == 200) {
                this.setData({
                    inputValue: ''
                }); // wx.showToast({
                //     title: res.data,
                //     icon: 'success',
                //     duration: 2000
                // })

                this.getNewsComment();
            } else {
                uni.showToast({
                    title: res.data,
                    icon: 'none',
                    duration: 2000
                });
            }
        },

        deleteFun(e) {
            let data = {
                userId: this.userInfo.id,
                newsId: this.newsData.id,
                commitId: e.currentTarget.dataset.id
            };
            app.globalData.$api.deleteCommit(data).then((res) => {
                if (res.status == 200) {
                    uni.showToast({
                        title: res.data,
                        icon: 'success',
                        duration: 2000
                    });
                    this.getNewsComment();
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
