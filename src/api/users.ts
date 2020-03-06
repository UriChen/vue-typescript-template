import request from '@/utils/request'
import {
  ILoginParams,
  ILoginResponse,
  IResponse
} from '@/api/types'
import { handleError } from '@/utils/handleErrors'

export const login = (params: ILoginParams): Promise<ILoginResponse> => {
  return new Promise((resolve, reject) => {
    request({
      url: '/Ajax/UserLoging',
      method: 'post',
      params
    })
      .then(res => {
        const data = res?.data
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
      url: '/Ajax/UserExit',
      method: 'post'
    })
      .then(res => {
        const data = res?.data
        resolve(data)
      })
      .catch(error => {
        reject(error)
        handleError(error)
      })
  })
}

