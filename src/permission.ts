import router from './router'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import { Route } from 'vue-router'
import store, { localStorageData, sessionStorageData } from '@/store'
import { UserModule } from '@/store/modules/user'
import { AppModule } from '@/store/modules/app'
import i18n from '@/lang'
import settings from './settings'
import awaitTo from 'await-to-js'
import { handleError } from '@/utils/handleErrors'
import { requestCancelList } from '@/utils/request'

/**
 * 是否要在切换页面的时候把上一个页面的未完成的请求取消掉
 */
const IS_CANCEL_REQUEST_BEFORE_ROUTER_LEAVE = true

/**
 * 设置进度条
 */
NProgress.configure({ showSpinner: false })

/**
 * 权限白名单
 */
export const whiteList = ['/account/login', '/account/register', '/account/forget', '/404', '/401']

/**
 * store动态注册userModule
 */
store.registerModule('user', UserModule, { preserveState: true })
store.registerModule('app', AppModule, { preserveState: true })
localStorageData(store)
sessionStorageData(store)

/**
 * 获取网页标签title
 * @param key
 * @return title
 */
const getPageTitle = (key: string) => {
  const hasKey = i18n.te(`route.${key}`)
  if (hasKey) {
    const pageName = i18n.t(`route.${key}`)
    return `${settings.appSettings.title} - ${pageName}`
  }
  return `${settings.appSettings.title}`
}

/**
 * 异步加载并注册store模块
 */
let PermissionModule: any
let isLoadedStoreModules = false
const loadStoreModules = () => {
  return new Promise((resolve, reject) => {
    if (isLoadedStoreModules) {
      resolve()
      return
    }
    Promise.all(
      [
        import(/* webpackChunkName: "permissionStore" */ '@/store/modules/permission')
      ]
    ).then(([{ PermissionModule: permission }]) => {
      store.registerModule('permission', permission, { preserveState: true })
      localStorageData(store)
      sessionStorageData(store)
      PermissionModule = permission
      isLoadedStoreModules = true
      resolve()
    }).catch(err => {
      reject(err)
      handleError(err)
    })
  })
}

/**
 * 全局路由拦截
 */
router.beforeEach(async(to: Route, from: Route, next: any) => {
  // Start progress bar
  NProgress.start()

  /**
   *   切换页面把正在发生的请求取消
   *   如果要离开的路由未设置缓存(meta.onCache = true),则必须取消请求
   */
  if (IS_CANCEL_REQUEST_BEFORE_ROUTER_LEAVE || from.meta?.noCache) {
    requestCancelList.forEach((requestCancel, index) => {
      requestCancel.cancel()
      requestCancelList.splice(index, 1)
    })
  }

  // Determine whether the user has logged in
  if (UserModule.token) {
    // 加载store模块
    const [err] = await awaitTo(loadStoreModules())
    if (err) {
      NProgress.done()
      return
    }

    if (to.path === '/account/login') {
      // If is logged in, redirect to the home page
      next({ path: '/home' })
      return
    }

    // Check whether the user has obtained his permission roles
    if (UserModule.roles.length === 0) {
      try {
        // Note: roles must be a object array! such as: ['admin'] or ['developer', 'editor']
        await UserModule.GetUserInfo()
        const roles = UserModule.roles
        // Generate accessible routes map based on role
        PermissionModule.GenerateRoutes(roles)
        // Dynamically add accessible routes
        router.addRoutes(PermissionModule.dynamicRoutes)
        // Hack: ensure addRoutes is complete
        // Set the replace: true, so the navigation will not leave a history record
        next({ ...to, replace: true })
        return
      } catch (err) {
        // Remove token and redirect to login page
        UserModule.ResetToken()
        next(`/account/login?redirect=${to.path}`)
        handleError(err)
        return
      }
    }

    next()
    return
  }

  // Has no token
  if (whiteList.includes(to.path)) {
    // In the free login whitelist, go directly
    next()
    return
  }

  // Other pages that do not have permission to access are redirected to the login page.
  next(`/account/login?redirect=${to.path}`)
})

router.afterEach((to: Route) => {
  // Finish progress bar
  NProgress.done()

  // set page title
  document.title = getPageTitle(to.meta.title)
})
