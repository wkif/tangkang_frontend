const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const FORM = 'FORM';
const DELETE = 'DELETE'; // const baseURL = 'http://127.0.0.1:8000/api';
// const baseURL = 'http://426x8r6735.zicp.vip/api';

const baseURL = 'https://tkapi.kifroom.icu/api';

function request(method, url, data) {
    return new Promise(function (resolve, reject) {
        let header = {
            'content-type': 'application/json'
        };

        if (uni.getStorageSync('token')) {
            header.Authorization = 'JWT ' + uni.getStorageSync('token');
        }

        uni.request({
            url: baseURL + url,
            method: method,
            data: method === POST ? JSON.stringify(data) : data,
            header: header,

            success(res) {
                console.log(res); //请求成功返回数据

                resolve(res.data);
            },

            fail(err) {
                //请求失败
                reject(err);
                console.log(err);
            }
        });
    });
} // 请求不同的接口

const API = {
    // getListData: () => request(GET, `/index/index`),
    // SearchGoodsListApi:() => request(GET,`/search/index`)
    // 基本功能接口
    wxLogin: (data) => request(POST, `/miniapp/login/`, data),
    verifyToken: (data) => request(POST, `/token/verify/`, data),
    // 语音播报
    changespeed: (data) => request(POST, `/miniapp/changespeed/`, data),
    getspeed: (data) => request(POST, `/miniapp/getspeed/`, data),
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
    // 不定期记录
    getperiodicalLoggingData: (data) => request(POST, `/miniapp/getperiodicalLoggingDataByUserId/`, data),
    addPeriodicalLoggingData: (data) => request(POST, `/miniapp/addPeriodicalLoggingData/`, data),
    deletePeriodicalLoggingData: (data) => request(POST, `/miniapp/deletePeriodicalLoggingData/`, data),
    // 食品数据库
    getfoodDatabaseByname: (data) => request(POST, `/miniapp/getfoodDatabaseByname/`, data),
    getfoodDatabase: () => request(GET, `/miniapp/getfoodDatabase/`),
    getDietRecordsByUserId: (data) => request(POST, `/miniapp/getDietRecords/`, data),
    deleteDietRecords: (data) => request(POST, `/miniapp/deleteDietRecords/`, data),
    addDietRecords: (data) => request(POST, `/miniapp/addDietRecords/`, data),
    // 积分
    getIntegralHistory: (data) => request(POST, `/miniapp/getIntegralHistory/`, data),
    getUserIntegral: (data) => request(POST, `/miniapp/getUserIntegral/`, data),
    // 商店
    getShopList: () => request(GET, `/miniapp/getShopList/`),
    getTopGoods: () => request(GET, `/miniapp/getTopGoods/`),
    getGoodDetail: (data) => request(POST, `/miniapp/getGoodDetail/`, data),
    addOrder: (data) => request(POST, `/miniapp/addOrder/`, data),
    getMyOrderList: (data) => request(POST, `/miniapp/getMyOrderList/`, data),
    payOrder: (data) => request(POST, `/miniapp/payment/`, data),
    confirmOrder: (data) => request(POST, `/miniapp/confirmOrder/`, data),
    cancelOrder: (data) => request(POST, `/miniapp/cancelOrder/`, data),
    // 资讯
    getTopNews: () => request(GET, `/miniapp/getTopNews/`),
    getNewsList: () => request(GET, `/miniapp/getNewsList/`),
    getNewsDetail: (data) => request(POST, `/miniapp/getNewsDetail/`, data),
    getNewsComment: (data) => request(POST, `/miniapp/getNewsComment/`, data),
    addCommit: (data) => request(POST, `/miniapp/addCommit/`, data),
    deleteCommit: (data) => request(POST, `/miniapp/deleteCommit/`, data)
};
module.exports = {
    API
};
