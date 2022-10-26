<template>
    <view>
        <van-nav-bar title="新增日记录" left-text="返回" fixed left-arrow @click-left="onClickLeft" />
        <view class="app" :style="'margin-top:' + marginTopview + 'px;'">
            <van-cell-group>
                <van-field :value="bloodSugarTime" required clearable label="时间" placeholder="请选择记录时间" :border="false" @tap.native="selectTime" />
                <van-field :value="GLL" required clearable label="糖化血红蛋白(%)" placeholder="请选择糖化血红蛋白" :border="false" @tap.native="selectGLL" />
                <van-field :value="ML" required clearable label="微量白蛋白(mg/L)" placeholder="请选择微量白蛋白" :border="false" @tap.native="selectML" />
                <van-field :value="DPA" required clearable label="足跟静脉搏动" placeholder="请选择足跟静脉搏动" :border="false" @tap.native="selectDPA" />
            </van-cell-group>
            <view class="buttonView">
                <button class="cu-btn bg-green shadow-blur round lg" @tap="addRec">新增记录</button>
            </view>
            <van-action-sheet :show="GLLShow">
                <view>
                    <van-picker show-toolbar title="糖化血红蛋白" :default-index="0" :columns="GLLColumns" @cancel="onCancelGLL" @confirm="onConfirmGLL" @change="onTypeChange" />
                </view>
            </van-action-sheet>
            <van-action-sheet :show="MLShow">
                <view>
                    <van-picker show-toolbar title="微量白蛋白" :default-index="0" :columns="MLColumns" @cancel="onCancelML" @confirm="onConfirmML" @change="onTypeChange" />
                </view>
            </van-action-sheet>
            <van-action-sheet :show="DPAShow">
                <view>
                    <van-picker show-toolbar title="足跟静脉搏动" :default-index="0" :columns="DPAColumns" @cancel="onCancelDPA" @confirm="onConfirmDPA" @change="onTypeChange" />
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
            bloodSugarTime: '',
            selectTimeShow: false,
            timeColumns: [],
            minHour: 10,
            maxHour: 20,
            minDate: new Date(new Date() - 365 * 24 * 60 * 60 * 1000).getTime(),
            maxDate: new Date().getTime(),
            currentDate: new Date().getTime(),
            GLL: '',
            GLLShow: false,
            GLLColumns: [],
            ML: '',
            MLShow: false,
            MLColumns: [],
            DPA: '',
            DPAShow: false,
            DPAColumns: [],
            marginTopview: app.globalData.navBarHeight
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let GLLColumns = [];

        for (let i = 0.03; i <= 0.07; i += 0.001) {
            GLLColumns.push(i.toFixed(3));
        }

        this.setData({
            GLLColumns: GLLColumns
        });
        let MLColumns = [];

        for (let i = 20; i <= 200; i += 10) {
            MLColumns.push(i);
        }

        this.setData({
            MLColumns: MLColumns
        });
        let DPAColumns = ['触及', '未触及'];
        this.setData({
            DPAColumns: DPAColumns
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

        selectTime() {
            this.setData({
                selectTimeShow: true
            });
        },

        selectGLL() {
            this.setData({
                GLLShow: true
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

        onCancelTime() {
            this.setData({
                selectTimeShow: false
            });
        },

        onConfirmGLL(e) {
            this.setData({
                GLL: e.detail.value,
                GLLShow: false
            });
        },

        onCancelGLL() {
            this.setData({
                GLLShow: false
            });
        },

        selectML() {
            this.setData({
                MLShow: true
            });
        },

        onConfirmML(e) {
            this.setData({
                ML: e.detail.value,
                MLShow: false
            });
        },

        onCancelML() {
            this.setData({
                MLShow: false
            });
        },

        selectDPA() {
            this.setData({
                DPAShow: true
            });
        },

        onConfirmDPA(e) {
            this.setData({
                DPA: e.detail.value,
                DPAShow: false
            });
        },

        onCancelDPA() {
            this.setData({
                DPAShow: false
            });
        },

        addRec() {
            let data = {
                periodicalTime: this.bloodSugarTime,
                glycosylatedHemoglobin: this.GLL,
                microalbuminuria: this.ML,
                dorsalisPedisArtery: this.DPA,
                userId: uni.getStorageSync('userInfo').id
            };
            app.globalData.$api.addPeriodicalLoggingData(data).then((res) => {
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
