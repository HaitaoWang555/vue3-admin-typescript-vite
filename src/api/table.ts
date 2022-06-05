import type { AxiosPromise } from 'axios'
import request from '@/utils/request'

export function getList(): AxiosPromise<API.ResponseBodyType<API.TableList>> {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
  })
}
