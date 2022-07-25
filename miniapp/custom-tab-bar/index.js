Component({
    data: {
        selected: 0,//当前选中的tab下标
        color: "#1E1E1E",
        selectedColor: "#646464",//tabbar选中字体颜色
        list: [{
            "pagePath": "/pages/home/index",
            "iconPath": "/assets/icon/home.png",
            "selectedIconPath": "/assets/icon/home-active.png",
            "text": "首页"
        },
        {
            "pagePath": "/pages/information/index",
            "iconPath": "/assets/icon/in.png",
            "selectedIconPath": "/assets/icon/in-active.png",
            "text": "资讯"
        },
        {
            "pagePath": "/pages/record/index",
            "iconPath": "/assets/icon/add.png",
            "selectedIconPath": "/assets/icon/add.png",
            "text": '',
            diyClass: "diy"
        }
            ,
        {
            "pagePath": "/pages/shop/index",
            "iconPath": "/assets/icon/shop.png",
            "selectedIconPath": "/assets/icon/shop-active.png",
            "text": "商城"
        },
        {
            "pagePath": "/pages/user/index",
            "iconPath": "/assets/icon/user.png",
            "selectedIconPath": "/assets/icon/user-active.png",
            "text": "我的"
        }
        ],//tabbar循环数据集
    },
    attached() {
    },
    methods: {
        switchTab(e) {
            const data = e.currentTarget.dataset;
            const url = data.path
            this.setData({
                selected: data.index
            })
            if (data.index == 2) {
                wx.navigateTo({
                    url: url
                })
            } else {
                wx.switchTab({ url })
            }
        }
    },
})