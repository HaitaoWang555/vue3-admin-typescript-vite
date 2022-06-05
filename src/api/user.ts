import type { AxiosPromise } from 'axios'
import request from '@/utils/request'

export function login(
  data: API.LoginParams
): AxiosPromise<API.ResponseBodyType<API.LoginResult>> {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data,
  })
}

export function getInfo(
  token: string
): AxiosPromise<API.ResponseBodyType<API.CurrentUser>> {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token },
  })
}

export function logout(): AxiosPromise<API.ResponseBodyType<null>> {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post',
  })
}
