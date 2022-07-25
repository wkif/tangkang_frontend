import { request } from '@/api/service'
export const urlPrefix = '/api/system/userAgreement/'
export function getDetal(id) {
  return request({
    url: urlPrefix + id + '/',
    method: 'get',
    data: { id }
  })
}
export function UpdateObj(obj) {

  return request({
    url: urlPrefix + obj.id + '/',
    method: 'put',
    data: obj.data
  })
}
export function uploadImg(data) {
  // return request({
  //   url: '/api/system/file/',
  //   method: 'post',
  //   data: data
  // })
}