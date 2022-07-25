import { request } from '@/api/service'
export const urlPrefix = '/api/system/wxappuser/'

export function GetList(query) {
  return request({
    url: urlPrefix,
    method: 'get',
    params: query
  })
}

// export function AddObj(obj) {
//   return request({
//     url: urlPrefix,
//     method: 'post',
//     data: obj
//   })
// }

export function UpdateObj(obj) {
  console.log(obj)
  obj.is_active = !obj.is_active
  if (obj.is_active) {
    obj.is_active = 1
  } else {
    obj.is_active = 0
  }
  return request({
    url: urlPrefix + obj.id + '/',
    method: 'put',
    data: obj
  })
}

// export function DelObj(id) {
//   return request({
//     url: urlPrefix + id + '/',
//     method: 'delete',
//     data: { id }
//   })
// }
export function getDetal(id) {
  return request({
    url: urlPrefix + id + '/',
    method: 'get',
    data: { id }
  })
}