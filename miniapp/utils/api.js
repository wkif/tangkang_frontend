const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const FORM = 'FORM';
const DELETE = 'DELETE';

// const baseURL = 'http://127.0.0.1:8000/api';
const baseURL = 'http://426x8r6735.zicp.vip/api';

function request(method, url, data) {
    return new Promise(function (resolve, reject) {
        let header = {
            'content-type': 'application/json',

        };
        if (wx.getStorageSync('token')) {
            header.Authorization = "JWT " + wx.getStorageSync('token');
        }
        wx.request({
            url: baseURL + url,
            method: method,
            data: method === POST ? JSON.stringify(data) : data,
            header: header,
            success(res) {
                console.log(res);
                //请求成功返回数据
                resolve(res.data);
            },
            fail(err) {
                //请求失败
                reject(err)
                console.log(err);
            }
        })
    })
}


// 请求不同的接口

const API = {
    // getListData: () => request(GET, `/index/index`),
    // SearchGoodsListApi:() => request(GET,`/search/index`) 
    // 基本功能接口

    wxLogin: (data) => request(POST, `/miniapp/login/`, data),
    verifyToken: (data) => request(POST, `/token/verify/`, data),

    // 获取用户协议
    getUserAgreement: () => request(GET, `/miniapp/getUserAgreement/`),
    // 地址管理
    getAddressByUsrid: (data) => request(POST, `/miniapp/getAddressByUsrid/`, data),
    addAddressByUserid: (data) => request(POST, `/miniapp/addAddressByUserid/`, data),
    deleteAddressByUserid: (data) => request(POST, `/miniapp/deleteAddressByUserid/`, data),
    editAddress: (data) => request(POST, `/miniapp/editAddress/`, data),
    // 用户信息
    getUserInfoByUserId: (data) => request(POST, `/miniapp/getUserInfoByUserId/`, data),
    updateUserInfo: (data) => request(POST, `/miniapp/editUserInfo/`, data),
    //公告
    getTopNotice: () => request(GET, `/miniapp/getTopNoticeData/`),


    //血糖记录接口
    getBloodSugarDataByUserId: (data) => request(POST, `/miniapp/getBloodSugarDataByUserId/`, data),
    getLastBloodSugarDataByUserId: (data) => request(POST, `/miniapp/getLastBloodSugarDataByUserId/`, data),
    addBloodSugarData: (data) => request(POST, `/miniapp/addBloodSugarData/`, data),
    deleteBloodSugarData: (data) => request(POST, `/miniapp/deleteBloodSugarData/`, data),
};
module.exports = {
    API
}