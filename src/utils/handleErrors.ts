import Vue from 'vue'
import to from 'await-to-js'
import settings from '@/settings'

const sentryCliSettings = settings.sentryCliSettings

/**
 * @description 异步加载并注册Sentry异常监控模块
 * @return Sentry
 */
let loadingSentry = false
let initSentryCompleted = false
const initSentry = () => {
  return new Promise((resolve, reject) => {
    if (loadingSentry || initSentryCompleted) {
      reject('Loading Or Completed!')
      return
    }
    loadingSentry = true
    Promise.all([import(/* webpackChunkName: "sentry" */ '@/plugins/sentry')])
      .then(([{ sentryModule }]) => {
        const { Sentry, Integrations } = sentryModule
        Sentry.init({
          dsn: sentryCliSettings.dsn,
          release: sentryCliSettings.release,
          environment: process.env.NODE_ENV,
          integrations: [
            new Integrations.Vue({
              Vue,
              attachProps: true,
              logErrors: process.env.NODE_ENV !== 'production'
            })
          ]
        })
        initSentryCompleted = true
        resolve(Sentry)
      })
      .catch(err => {
        reject(err)
      })
      .finally(() => {
        loadingSentry = false
      })
  })
}

// 默认提示信息
const DEFAULT_MESSAGE = '系统开小差'

// 错误类型
export const NETWORK_ERR = 'Network Error'
export const REQUEST_CANCEL = 'Request Cancel'
export const REQUEST_TIMEOUT = 'timeout'
export const REQUEST_404 = 'status code 404'
export const RESOLVED_ERROR = 'Error Has Been Resolved'
export const CANCEL_ERROR = 'Uncaught (in promise) cancel'

/**
 * @description 判断错误类型
 * @param {string} errorString
 * @param {string} errorType
 * @returns {boolean}
 */
export const hasErrorOf = (errorString: string, errorType: string): boolean => {
  return errorString.includes(errorType)
}

/**
 * @description 处理错误信息 注意: 只能在返回Promise的异步方法中,或者catch块中使用
 * @param {Error} error
 * @param {{ message: string, isCaptureError: boolean }} [options]
 */
export const handleError = async(
  error: Error,
  options?: { message?: string; isCaptureError?: boolean }
) => {
  const {
    message = DEFAULT_MESSAGE,
    isCaptureError = process.env.NODE_ENV === 'production'
  } = options || {}

  const errorString = error.toString()
  if (!errorString || errorString === 'Error') {
    return
  }
  let ajaxMessage = ''
  switch (true) {
    case hasErrorOf(errorString, REQUEST_CANCEL):
      return
    case hasErrorOf(errorString, CANCEL_ERROR):
      return
    case hasErrorOf(errorString, RESOLVED_ERROR):
      return
    case hasErrorOf(errorString, NETWORK_ERR):
      ajaxMessage = '网络连接错误!'
      break
    case hasErrorOf(errorString, REQUEST_TIMEOUT):
      ajaxMessage = '网络请求超时!'
      break
    case hasErrorOf(errorString, REQUEST_404):
      ajaxMessage = '请求接口不存在!'
      break
    default:
      ajaxMessage = ''
  }

  if (ajaxMessage) {
    Vue.prototype.$toast(ajaxMessage)
    return
  }

  Vue.prototype.$toast.error(message || errorString)

  if (!isCaptureError) {
    throw error
  }

  // 加载sentry插件
  const [err, Sentry] = await to(initSentry())

  if (err) {
    return
  }

  // 主动上报异常
  (Sentry as any)?.captureException(error)
}
