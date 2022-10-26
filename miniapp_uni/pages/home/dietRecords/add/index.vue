<template>
    <view>
        <van-nav-bar title="记录" left-text="返回" fixed left-arrow @click-left="onClickLeft" />
        <view class="app" :style="'margin-top:' + marginTopview + 'px;'">
            <van-cell-group inset>
                <van-cell title="时间" :value="timevalue" @tap.native="showTimePopup" />
                <!-- <van-cell wx:for="{{food}}" title="{{item.food.foodName}}" value="{{item.number}}" label="描述信息" border="{{ false }}" /> -->
            </van-cell-group>
            <van-card
                :num="item.number"
                :tag="item.food.foodType"
                :desc="
                    '营养价值：卡路里：' +
                    item.food.foodCalory +
                    '；蛋白质：' +
                    item.food.foodProtein +
                    '脂肪：' +
                    item.food.foodFat +
                    '；碳水：' +
                    item.food.foodCarbohydrate +
                    '；热量：' +
                    item.food.heat +
                    '；维生素A：' +
                    item.food.foodVitaminA +
                    '；维生素C：' +
                    item.food.foodVitaminC +
                    '；维生素D：' +
                    item.food.foodVitaminD +
                    '；维生素E：' +
                    item.food.foodVitaminE +
                    '；'
                "
                :title="item.food.foodName + ' 单位：' + item.food.unit"
                :thumb="item.food.img"
                @longpress.native="handleDel($event, { index })"
                :data-index="index"
                v-for="(item, index) in food"
                :key="index"
            >
                <view slot="footer">
                    <van-button size="mini" @tap.native="sub($event, { index })" :data-index="index">-</van-button>
                    <van-button size="mini" @tap.native="add($event, { index })" :data-index="index">+</van-button>
                </view>
            </van-card>
            <view class="addButtonView">
                <button class="cu-btn block line-greeen lg margin-top" @tap="showPopup">
                    <text class="cuIcon-edit">新增</text>
                </button>
                <button class="cu-btn block line-greeen lg margin-top" @tap="submit">
                    <text class="cuIcon-upload">提交</text>
                </button>
            </view>
        </view>
        <van-action-sheet :show="timeShow">
            <view>
                <van-datetime-picker type="datetime" :value="currentDate" :min-date="minDate" :max-date="maxDate" @cancel="onCancelTime" @confirm="onConfirmTime" />
            </view>
        </van-action-sheet>
        <van-popup :show="show" position="bottom" @close="onClose">
            <view class="Foodlist">
                <van-checkbox-group :value="result" @change="onChange">
                    <!-- <van-checkbox name="{{index}}" icon-size="25px" wx:for="{{foodList}}">{{item.foodName}}</van-checkbox> -->
                    <van-cell-group>
                        <van-cell
                            :title="' ' + item.foodName"
                            value-class="value-class"
                            clickable
                            :data-index="index"
                            @click="toggle($event, { index })"
                            v-for="(item, index) in foodList"
                            :key="index"
                        >
                            <van-checkbox @tap.native.stop.prevent="noop" :class="'checkboxes-' + index" :name="index" />
                        </van-cell>
                    </van-cell-group>
                </van-checkbox-group>
            </view>
        </van-popup>
    </view>
</template>

<script>
import vanDatetimePicker from '../../../../miniprogram_npm/@vant/weapp/datetime-picker/index';
import vanActionSheet from '../../../../miniprogram_npm/@vant/weapp/action-sheet/index';
import vanCell from './@vant/weapp/cell/index';
import vanCellGroup from './@vant/weapp/cell-group/index';
import vanTag from './@vant/weapp/tag/index';
import vanCard from './@vant/weapp/card/index';
import vanPopup from './@vant/weapp/popup/index';
import vanCheckbox from './@vant/weapp/checkbox/index';
import vanCheckboxGroup from './@vant/weapp/checkbox-group/index';
// pages/home/dietRecords/add/index.js
const app = getApp();
export default {
    components: {
        vanDatetimePicker,
        vanActionSheet,
        vanCell,
        vanCellGroup,
        vanTag,
        vanCard,
        vanPopup,
        vanCheckbox,
        vanCheckboxGroup
    },
    data() {
        return {
            timevalue: '',

            // food: [
            //   {
            //     "food": {
            //       "id": 1,
            //       "heat": 123,
            //       "foodFat": 123,
            //       "foodName": "test1",
            //       "foodType": "蔬菜",
            //       "foodCalory": 123,
            //       "foodProtein": 123,
            //       "foodVitaminA": 123,
            //       "foodVitaminC": 123,
            //       "foodVitaminD": 123,
            //       "foodVitaminE": 123,
            //       "foodCarbohydrate": 123,
            //       "img": "https://img.yzcdn.cn/vant/cat.jpeg",
            //       "unit": "kg"
            //     },
            //     "number": 12
            //   },
            //   {
            //     "food": {
            //       "id": 3,
            //       "heat": 1,
            //       "foodFat": 1,
            //       "foodName": "dami",
            //       "foodType": "蔬菜",
            //       "foodCalory": 1,
            //       "foodProtein": 1,
            //       "foodVitaminA": 1,
            //       "foodVitaminC": 1,
            //       "foodVitaminD": 1,
            //       "foodVitaminE": 1,
            //       "foodCarbohydrate": 1,
            //       "img": "https://img.yzcdn.cn/vant/cat.jpeg",
            //       "unit": "kg"
            //     },
            //     "number": 13
            //   }
            // ],
            food: [],

            foodCalory: 0,
            foodProtein: 0,
            foodFat: 0,
            foodCarbohydrate: 0,
            foodVitaminA: 0,
            foodVitaminC: 0,
            foodVitaminE: 0,
            foodVitaminD: 0,
            heat: 0,
            foodList: [],

            // date
            timeShow: false,

            timeColumns: [],
            minHour: 10,
            maxHour: 20,
            minDate: new Date(new Date() - 365 * 24 * 60 * 60 * 1000).getTime(),
            maxDate: new Date().getTime(),
            currentDate: new Date().getTime(),

            // foodList
            show: true,

            result: [],
            marginTopview: app.globalData.navBarHeight,
            selectTimeShow: false
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getFoodList();
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

        onConfirmTime(e) {
            this.setData({
                currentDate: e.detail,
                timevalue: app.globalData.$formatTime(e.detail),
                timeShow: false
            });

            if (app.globalData.speedFlag) {
                app.globalData.$Text2Speech(app.globalData.$formatTime(e.detail));
            }
        },

        showTimePopup() {
            this.setData({
                timeShow: true
            });
        },

        onCancelTime() {
            this.setData({
                selectTimeShow: false
            });
        },

        async getFoodList() {
            let res = await app.globalData.$api.getfoodDatabase();

            if (res.status == 200) {
                this.setData({
                    foodList: res.data
                });
            }
        },

        showPopup() {
            this.setData({
                show: true
            });
        },

        onClose() {
            this.setData({
                show: false
            });
        },

        onChange(event) {
            console.log('event', event.detail);
            this.setData({
                result: event.detail
            });
            let food = this.food;
            this.result.forEach((index) => {
                console.log('index', index);
                let obj = {
                    food: this.foodList[index],
                    number: 1
                };
                console.log('obj', obj); // if (!food.includes(obj)) {
                //   food.push(obj)
                // }

                let flag = food.some((item) => {
                    if (item.food.id == obj.food.id) {
                        return true;
                    }
                });

                if (!flag) {
                    food.push(obj);
                }
            });
            this.setData({
                food: food
            });
            this.calculate();
        },

        add(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            console.log('e', e.currentTarget.dataset.index);
            let food = this.food;
            food[e.currentTarget.dataset.index].number++;
            this.setData({
                food: food
            });
            this.calculate();
        },

        sub(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            let food = this.food;

            if (food[e.currentTarget.dataset.index].number > 1) {
                food[e.currentTarget.dataset.index].number--;
            }

            this.setData({
                food: food
            });
            this.calculate();
        },

        handleDel(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            console.log('e', e.currentTarget.dataset.index);
            let food = this.food; // 询问

            uni.showModal({
                title: '提示',
                content: '确定要删除吗？',
                success: (res) => {
                    if (res.confirm) {
                        food.splice(e.currentTarget.dataset.index, 1);
                        this.setData({
                            food: food
                        });
                        this.calculate();
                    }

                    if (res.cancel) {
                    }
                }
            });
        },

        submit() {
            if (this.food.length == 0) {
                uni.showToast({
                    title: '请选择食物',
                    icon: 'none'
                });
                return;
            }

            if (this.timevalue == '') {
                uni.showToast({
                    title: '请选择时间',
                    icon: 'none'
                });
                return;
            }

            let data = {
                userId: uni.getStorageSync('userInfo').id,
                time: this.timevalue,
                food: this.food,
                foodCalory: this.foodCalory,
                foodProtein: this.foodProtein,
                foodFat: this.foodFat,
                foodCarbohydrate: this.foodCarbohydrate,
                foodVitaminA: this.foodVitaminA,
                foodVitaminC: this.foodVitaminC,
                foodVitaminE: this.foodVitaminE,
                foodVitaminD: this.foodVitaminD,
                heat: this.heat
            };
            app.globalData.$api.addDietRecords(data).then((res) => {
                if (res.status == 200) {
                    uni.showToast({
                        title: '添加成功',
                        icon: 'success',
                        duration: 2000
                    });
                    uni.navigateBack({
                        delta: 1
                    });
                } else {
                    uni.showToast({
                        title: '添加失败',
                        icon: 'none',
                        duration: 2000
                    });
                }
            });
        },

        calculate() {
            let foods = this.food;
            let calory = 0;
            let protein = 0;
            let fat = 0;
            let carbohydrate = 0;
            let vitaminA = 0;
            let vitaminC = 0;
            let vitaminE = 0;
            let vitaminD = 0;
            let heat = 0;
            foods.forEach((item) => {
                calory += item.food.foodCalory * item.number;
                protein += item.food.foodProtein * item.number;
                fat += item.food.foodFat * item.number;
                carbohydrate += item.food.foodCarbohydrate * item.number;
                vitaminA += item.food.foodVitaminA * item.number;
                vitaminC += item.food.foodVitaminC * item.number;
                vitaminE += item.food.foodVitaminE * item.number;
                vitaminD += item.food.foodVitaminD * item.number;
                heat += item.food.heat * item.number;
            });
            this.setData({
                foodCalory: calory,
                foodProtein: protein,
                foodFat: fat,
                foodCarbohydrate: carbohydrate,
                foodVitaminA: vitaminA,
                foodVitaminC: vitaminC,
                foodVitaminE: vitaminE,
                foodVitaminD: vitaminD,
                heat: heat
            }); // for (let i=0;i<foods.length;i++) {
            //   this.data.foodCalory += foods[i].food.foodCalory * foods[i].number
            //   this.data.foodProtein += foods[i].food.foodProtein * foods[i].number
            //   this.data.foodFat += foods[i].food.foodFat * foods[i].number
            //   this.data.foodCarbohydrate += foods[i].food.foodCarbohydrate * foods[i].number
            //   this.data.foodVitaminA += foods[i].food.foodVitaminA * foods[i].number
            //   this.data.foodVitaminC += foods[i].food.foodVitaminC * foods[i].number
            //   this.data.foodVitaminE += foods[i].food.foodVitaminE * foods[i].number
            //   this.data.foodVitaminD += foods[i].food.foodVitaminD * foods[i].number
            // }
        },

        toggle(e, _dataset) {
            /* ---处理dataset begin--- */
            this.datasetHandle(e, _dataset);
            /* ---处理dataset end--- */
            console.log('占位：函数 toggle 未声明');
        },

        noop() {
            console.log('占位：函数 noop 未声明');
        }
    }
};
</script>
<style>
@import './index.css';
</style>
