import Vue from 'vue'
import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { getToken, setToken, removeToken } from '@/utils/cookies'
import router, { resetRouter } from '@/router'
import { PermissionModule } from './permission'
import store from '@/store'
import { login, logout, getUserInfo } from '@/api/users'
import { ILoginParams } from '@/api/types'
import to from 'await-to-js'
import { handleError } from '@/utils/handleErrors'

const { $confirm, $loading } = Vue.prototype

export interface IUserState {
  token: string
  roles: string[]
}

@Module({ dynamic: true, store, name: 'user', namespaced: true })
class User extends VuexModule implements IUserState {
  public token = getToken() || ''
  public roles: string[] = []

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
  }

  @Mutation
  private SET_ROLES(roles: string[]) {
    this.roles = roles
  }

  @Action
  public ResetToken() {
    removeToken()
    this.SET_TOKEN('')
    this.SET_ROLES([])
    resetRouter()
  }

  @Action({ rawError: true })
  public GetUserInfo() {
    return new Promise(async(resolve, reject) => {
      if (this.token === '') {
        handleError(Error('GetUserInfo: token is undefined!'))
        return
      }
      $loading.show('正在获取用户信息...')
      const [err, userData] = await to(getUserInfo())
      $loading.hide()
      if (err || !userData) {
        reject('failed')
        return
      }
      const { roles } = userData
      if (!roles || roles.length <= 0) {
        handleError(Error('GetUserInfo: roles must be a non-null array!'))
        reject('failed')
        return
      }
      this.SET_ROLES(roles)
      resolve('success')
    })
  }

  @Action({ rawError: true })
  public async ChangeRoles(role: string) {
    // Dynamically modify permissions
    const token = role + '-token'
    this.SET_TOKEN(token)
    setToken(token)
    await this.GetUserInfo()
    resetRouter()
    // Generate dynamic accessible routes based on roles
    PermissionModule.GenerateRoutes(this.roles)
    // Add generated routes
    router.addRoutes(PermissionModule.dynamicRoutes)
  }

  @Action({ rawError: true })
  public UserLogin({ username, password }: ILoginParams) {
    return new Promise(async(resolve, reject) => {
      $loading.show('正在登录...')
      const [err, data] = await to(login({ username, password }))
      $loading.hide()
      if (err || !data) {
        reject('failed')
        return
      }
      this.SET_TOKEN(data.token)
      resolve('success')
    })
  }

  @Action({ rawError: true })
  public UserLogout() {
    return new Promise(async(resolve, reject) => {
      const [no] = await to($confirm('确认退出登录吗?'))
      if (no) {
        reject('failed')
        return
      }
      const [err] = await to(logout())
      if (err) {
        reject('failed')
        return
      }
      this.ResetToken()
      resolve('success')
    })
  }
}

export const UserModule = getModule(User)
