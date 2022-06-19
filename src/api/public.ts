import type { AxiosPromise } from 'axios'
import request from '@/utils/request'
import type { ResponseBodyType, TableList } from '@/types/api'

export function getList(): AxiosPromise<ResponseBodyType<TableList>> {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
  })
}

export function sendSms(
  params: unknown
): AxiosPromise<ResponseBodyType<string>> {
  return request({
    url: '/vue-admin-template/public/sendSms',
    method: 'get',
    params,
  })
}
export function submit(
  data: Record<string, unknown>
): AxiosPromise<ResponseBodyType<string>> {
  return request({
    url: '/vue-admin-template/public/submit',
    method: 'post',
    data,
  })
}
