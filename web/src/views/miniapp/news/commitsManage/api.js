import { request } from '@/api/service' //改成这个请求真实后端
export const urlPrefix = '/api/system/newsCommit/'
export function GetList(query) {
    return request({
        url: urlPrefix,
        method: 'get',
        params: query
    })
}

export function GetObj(obj) {
    return request({
        url: urlPrefix + obj.id + '/',
        method: 'get'
    })
}

export function createObj(obj) {
    return request({
        url: urlPrefix,
        method: 'post',
        data: obj
    })
}

export function UpdateObj(obj) {
    return request({
        url: urlPrefix + obj.id + '/',
        method: 'put',
        data: obj
    })
}

export function DelObj(obj) {
    return request({
        url: urlPrefix + obj.id + '/',
        method: 'put',
        data: {
            news: obj.news.id,
            user: obj.user.id,
            is_delete: 1
        }
    })
}
