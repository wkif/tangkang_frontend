import { request } from '@/api/service'
export const urlPrefix = '/api/system/miniappuser/'

export function x(query) {
  return request({
    url: urlPrefix,
    method: 'get',
    params: query
  })
}

