// custom-tab-bar/index.js
const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        active: 0,
        list: [
            // {
            //     "name": "首页",
            //     "selectedIconPath": "/assets/icon/home-active.png",
            //     "iconPath": "/assets/icon/home.png",
            //     "pagePath": "/pages/home/index"
            // },
            // {
            //     "name": "记录",
            //     "selectedIconPath": "/assets/icon/add-active.png",
            //     "iconPath": "/assets/icon/add.png",
            //     "pagePath": "/pages/record/index"
            // },
            // {
            //     "name": "商城",
            //     "selectedIconPath": "/assets/icon/shop-active.png",
            //     "iconPath": "/assets/icon/shop.png",
            //     "pagePath": "/pages/shop/index"
            // },
            // {
            //     "name": "我的",
            //     "selectedIconPath": "/assets/icon/user-active.png",
            //     "iconPath": "/assets/icon/user.png",
            //     "pagePath": "/pages/user/index"
            // }
        ]
    },
    attached: function () {
        if (!app.$shallowEqual(this.data.list, (wx.getStorageSync('tabList')))) {
            this.setData({
                list: (wx.getStorageSync('tabList'))
            })
        }

        // console.log('this.data.list', this.data.list)
    }
    ,
    /**
     * 组件的方法列表
     */
    methods: {
        onChange(event) {
            // event.detail 的值为当前选中项的索引
            this.setData({ active: event.detail });
            let path = this.data.list[event.detail].pagePath
            wx.switchTab({
                url: path,
            })

        },



    }
})
