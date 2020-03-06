import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { secureLocalStorage, secureSessionStorage } from '@/utils/secure-storage'
import { IAppState } from './modules/app'
import { IUserState } from './modules/user'
import { IPermissionState } from './modules/permission'

Vue.use(Vuex)

// 数据本地化
export const localStorageData = createPersistedState({
  key: 'appData',
  paths: ['app', 'settings'],
  storage: {
    getItem: key => secureLocalStorage.getItem(key),
    setItem: (key, value) => secureLocalStorage.setItem(key, value),
    removeItem: key => secureLocalStorage.removeItem(key)
  }
  // reducer: state => ({}) 存储指定数据
})
export const sessionStorageData = createPersistedState({
  key: 'appData',
  paths: ['permission'],
  storage: {
    getItem: key => secureSessionStorage.getItem(key),
    setItem: (key, value) => secureSessionStorage.setItem(key, value),
    removeItem: key => secureSessionStorage.removeItem(key)
  }
  // reducer: state => ({})
})

export interface IRootState {
  app: IAppState
  user: IUserState
  permission: IPermissionState
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({
  plugins: [localStorageData, sessionStorageData]
})
