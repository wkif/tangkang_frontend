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
            console.log('list',this.data.list)
            // event.detail 的值为当前选中项的索引
            this.setData({ active: event.detail });
            let path = this.data.list[event.detail].pagePath
            wx.switchTab({
                url: path,
            })

        },



    }
})
