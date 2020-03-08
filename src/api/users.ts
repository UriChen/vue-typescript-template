import request from '@/utils/request'
import {
  ILoginParams,
  ILoginResponse,
  IResponse,
  IUserInfo
} from '@/api/types'
import { handleError } from '@/utils/handleErrors'

export const login = (data: ILoginParams): Promise<ILoginResponse> => {
  return new Promise((resolve, reject) => {
    request({
      url: '/users/login',
      method: 'post',
      data
    })
      .then(({ data }) => {
        resolve(data)
      })
      .catch(error => {
        reject(error)
        handleError(error)
      })
  })
}

export const logout = (): Promise<IResponse> => {
  return new Promise((resolve, reject) => {
    request({
      url: '/users/logout',
      method: 'post'
    })
      .then(({ data }) => {
        resolve(data)
      })
      .catch(error => {
        reject(error)
        handleError(error)
      })
  })
}
export const getUserInfo = (): Promise<IUserInfo> => {
  return new Promise((resolve, reject) => {
    request({
      url: '/users/userInfo',
      method: 'get'
    })
      .then(({ data }) => {
        resolve(data)
      })
      .catch(error => {
        reject(error)
        handleError(error)
      })
  })
}

