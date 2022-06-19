import type { AxiosPromise } from 'axios'
import request from '@/utils/request'
import type {
  LoginParams,
  ResponseBodyType,
  LoginResult,
  CurrentUser,
} from '@/types/api'

export function login(
  data: LoginParams
): AxiosPromise<ResponseBodyType<LoginResult>> {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data,
  })
}

export function getInfo(
  token: string
): AxiosPromise<ResponseBodyType<CurrentUser>> {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token },
  })
}

export function logout(): AxiosPromise<ResponseBodyType<null>> {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post',
  })
}
