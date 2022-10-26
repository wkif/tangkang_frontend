<template>
    <view>
        <van-nav-bar title="新增日记录" left-text="返回" fixed left-arrow @click-left="onClickLeft" />
        <view class="app" :style="'margin-top:' + marginTopview + 'px;'">
            <van-cell-group>
                <van-field :value="bloodSugarTypeValue" required clearable label="记录类型" placeholder="请选择类型" :border="false" @tap.native="selectType" />
                <van-field :value="bloodSugarValue" required clearable label="血糖值" placeholder="请选择血糖值" :border="false" @tap.native="selectValue" />
                <van-field :value="bloodSugarTime" required clearable label="时间" placeholder="请选择记录时间" :border="false" @tap.native="selectTime" />
            </van-cell-group>
            <view class="buttonView">
                <button class="cu-btn bg-themeColor shadow-blur round lg" @tap="addRec">新增记录</button>
            </view>
            <van-action-sheet :show="selectTypeShow">
                <view>
                    <van-picker show-toolbar title="血糖类型" :default-index="0" :columns="typeColumns" @cancel="onCancelType" @confirm="onConfirmType" @change="onTypeChange" />
                </view>
            </van-action-sheet>
            <van-action-sheet :show="selectValueShow">
                <view>
                    <van-picker show-toolbar title="血糖值" :default-index="0" :columns="valueColumns" @cancel="onCancelValue" @confirm="onConfirmValue" @change="onTypeChange" />
                </view>
            </van-action-sheet>
            <van-action-sheet :show="selectTimeShow">
                <view>
                    <van-datetime-picker type="datetime" :value="currentDate" :min-date="minDate" :max-date="maxDate" @cancel="onCancelTime" @confirm="onConfirmTime" />
                </view>
            </van-action-sheet>
        </view>
    </view>
</template>

<script>
import vanDatetimePicker from './@vant/weapp/datetime-picker/index';
import vanActionSheet from './@vant/weapp/action-sheet/index';
import vanPicker from './@vant/weapp/picker/index';
import vanField from './@vant/weapp/field/index';
// pages/record/dailyRecord/add/index.js
const app = getApp();
export default {
    components: {
        vanDatetimePicker,
        vanActionSheet,
        vanPicker,
        vanField
    },
    data() {
        return {
            bloodSugarType: '',
            bloodSugarTypeValue: '',
            selectTypeShow: false,
            typeColumns: ['空腹血糖', '早餐后2小时血糖', '午餐前血糖', '午餐后2小时血糖', '晚餐前血糖', '晚餐后2小时血糖', '睡前血糖', '任意时间血糖', '夜间2时血糖', '其他'],
            selectValueShow: false,
            bloodSugarValue: '',
            valueColumns: [],
            bloodSugarTime: '',
            selectTimeShow: false,
            timeColumns: [],
            minHour: 10,
            maxHour: 20,
            minDate: new Date(new Date() - 365 * 24 * 60 * 60 * 1000).getTime(),
            maxDate: new Date().getTime(),
            currentDate: new Date().getTime(),
            marginTopview: app.globalData.navBarHeight
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let valueColumns = [];

        for (let i = 2; i <= 10; i += 0.1) {
            valueColumns.push(i.toFixed(1));
        }

        this.setData({
            valueColumns: valueColumns
        });
        let timeColumns = [];

        for (let i = 0; i < 24; i++) {
            timeColumns.push(i + ':00');
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

        selectType() {
            this.setData({
                selectTypeShow: true
            });
        },

        selectValue() {
            this.setData({
                selectValueShow: true
            });
        },

        selectTime() {
            this.setData({
                selectTimeShow: true
            });
        },

        onTypeChange(event) {
            console.log('event', event);
            const { picker, value, index } = event.detail;
            console.log(`当前值：${value}, 当前索引：${index}`);

            if (!value) {
                this.setData({
                    currentDate: event.detail
                });
            } else {
                if (app.globalData.speedFlag) {
                    app.globalData.$Text2Speech(value);
                }
            }
        },

        onConfirmType(e) {
            console.log(e);
            this.setData({
                bloodSugarType: e.detail.index,
                bloodSugarTypeValue: e.detail.value,
                selectTypeShow: false
            });
        },

        onCancelType() {
            this.setData({
                selectTypeShow: false
            });
        },

        onConfirmValue(e) {
            console.log(e);
            this.setData({
                bloodSugarValue: e.detail.value,
                selectValueShow: false
            });
        },

        onCancelValue() {
            this.setData({
                selectValueShow: false
            });
        },

        onConfirmTime(e) {
            this.setData({
                currentDate: e.detail,
                bloodSugarTime: app.globalData.$formatTime(e.detail),
                selectTimeShow: false
            });

            if (app.globalData.speedFlag) {
                app.globalData.$Text2Speech(app.globalData.$formatTime(e.detail));
            }
        },

        onInput(event) {
            console.log('event', event);
            this.setData({
                currentDate: event.detail
            });
        },

        onCancelTime() {
            this.setData({
                selectTimeShow: false
            });
        },

        addRec() {
            let data = {
                bloodSugarLevel: this.bloodSugarValue,
                bloodSugarType: this.bloodSugarType,
                bloodSugarTime: this.bloodSugarTime,
                userId: uni.getStorageSync('userInfo').id
            };
            app.globalData.$api.addBloodSugarData(data).then((res) => {
                console.log('res', res);

                if (res.status == 200) {
                    uni.showToast({
                        title: '添加成功',
                        icon: 'success',
                        duration: 2000
                    });
                    setTimeout(() => {
                        uni.navigateBack({
                            delta: 1
                        });
                        2000;
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
    }
};
</script>
<style>
@import './index.css';
</style>
