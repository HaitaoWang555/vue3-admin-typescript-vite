import type { AxiosPromise } from 'axios'
import request from '@/utils/request'
import type { ResponseBodyType, TableList } from '@/types/api'

export type TableParams = {
  importance?: number
  displayTime?: string | string[]
}

export function getList(
  params?: TableParams
): AxiosPromise<ResponseBodyType<TableList>> {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params,
  })
}
