// pages/user/imformationManage/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        heightPicker: [],
        weightPicker: [],
        waistlinePicker: [],
        bloodTypePicker: ['A', 'B', 'AB', 'O', 'Rh阳性', 'Rh阴性', '其他'],
        index: 0,
        endDate: '',
    },
    onClickLeft() {
        wx.navigateBack({
            delta: 1
        })
    },
    PickerChangeheight(e) {
        // console.log(e);
        this.setData({
            'userInfo.height': this.data.heightPicker[e.detail.value]
        })
    },
    PickerChangeweight(e) {
        // console.log(e);
        this.setData({
            'userInfo.weight': this.data.weightPicker[e.detail.value]
        })
    },
    PickerChangebloodType(e) {
        // console.log(e);
        this.setData({
            'userInfo.bloodType': this.data.bloodTypePicker[e.detail.value]
        })
    },
    PickerChangewaistline(e) {
        // console.log(e);
        this.setData({
            'userInfo.waistline': this.data.waistlinePicker[e.detail.value]
        })
    },
    changeSex(e) {
        console.log('e', e.detail.value)
        if (e.detail.value) {
            this.setData({
                'userInfo.gender': 1
            })
        } else {
            this.setData({
                'userInfo.gender': 0
            })
        }
    },
    DateChange(e) {
        this.setData({
            'userInfo.birthday': e.detail.value
        })
    },

    // 手机号部分
    inputPhoneNum: function (e) {
        let phoneNumber = e.detail.value
        if (phoneNumber.length === 11) {
            let checkedNum = this.checkPhoneNum(phoneNumber)
            if (checkedNum) {
                this.setData({
                    'userInfo.mobile': phoneNumber
                })
            } else {
                wx.showToast({
                    title: '手机号格式不正确',
                    icon: 'none',
                    duration: 2000
                })
            }
        } else {
            wx.showToast({
                title: '手机号格式不正确',
                icon: 'none',
                duration: 2000
            })
        }
    },
    checkPhoneNum: function (phoneNumber) {
        // 手机号检验
        let reg = /^1[3456789]\d{9}$/
        if (reg.test(phoneNumber)) {
            return true
        } else {
            return false
        }
    },
    // 邮箱验证部分
    inputemail: function (e) {
        let email = e.detail.value
        let checkedNum = this.checkEmail(email)
        if (checkedNum) {
            this.setData({
                'userInfo.email': email
            })
        } else {
            wx.showToast({
                title: '邮箱格式不正确',
                icon: 'none',
                duration: 2000
            })
        }

    },
    checkEmail: function (email) {
        // 邮箱检验
        let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
        if (reg.test(email)) {
            return true
        }
        else {
            return false
        }
    },
    submit: function () {
        let userInfo = this.data.userInfo
        let that = this
        if (userInfo.height && userInfo.weight && userInfo.waistline && userInfo.bloodType && userInfo.birthday && userInfo.mobile && userInfo.email) {
            wx.showLoading({
                title: '提交中',
                mask: true
            })
            let data = {
                userId: userInfo.id,
                email: userInfo?.email,
                gender: userInfo.gender,
                height: userInfo.height,
                weight: userInfo.weight,
                waistline: userInfo.waistline,
                bloodType: userInfo.bloodType,
                birthday: userInfo.birthday,
                mobile: userInfo.mobile,
            }
            app.$api.updateUserInfo(data).then(res => {
                wx.hideLoading()
                if (res.status === 200) {
                    wx.showToast({
                        title: '提交成功',
                        icon: 'success',
                        duration: 2000
                    })
                    wx.navigateBack({
                        delta: 1
                    })
                } else {
                    wx.showToast({
                        title: res.data,
                        icon: 'none',
                        duration: 2000
                    })
                }
            })
        }


    },
    getUserInfo: function () {
        let data = {
            userId: wx.getStorageSync('userInfo').id
        }
        app.$api.getUserInfoByUserId(data).then(res => {
            if (res.status === 200) {
                let userInfo = res.data

                this.setData({
                    userInfo,
                })
                wx.setStorageSync('userInfo', userInfo);
            } else {
                wx.showToast({
                    title: res.data,
                    icon: 'none',
                    duration: 2000
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // this.setData({
        //     userInfo: wx.getStorageSync('userInfo')
        // })
        this.getUserInfo()
        let heightPicker = []
        for (let i = 100; i < 250; i++) {
            heightPicker.push(i)
        }
        this.setData({
            heightPicker: heightPicker
        })
        let weightPicker = []
        for (let i = 30; i < 200; i++) {
            weightPicker.push(i)
        }
        this.setData({
            weightPicker: weightPicker
        })
        let waistlinePicker = []
        for (let i = 30; i < 200; i++) {
            waistlinePicker.push(i)
        }
        this.setData({
            waistlinePicker: waistlinePicker
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})