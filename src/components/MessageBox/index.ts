import isMobile from 'ismobilejs'
import Vue from 'vue'
// @ts-ignore
import Directive, { Alert, Confirm, Toast, Loading } from './ios-messagebox'
import wxAlert from './wechat-messagebox/Alert.vue'
import wxConfirm from './wechat-messagebox/Confirm.vue'

Vue.use(Directive)

function isWeChat() {
  return !!navigator.userAgent.toLowerCase().match(/MicroMessenger/i)
}

function installMessageBox() {
  if (isWeChat()) {
    Vue.use(Alert, {
      component: wxAlert
    })

    Vue.use(Confirm, {
      component: wxConfirm
    })
    // todo: 补充微信定制loading组件
    Vue.use(Toast)
    Vue.use(Loading)
    return
  }

  if (isMobile().apple.device) {
    Vue.use(Alert)
    Vue.use(Confirm)
    Vue.use(Toast)
    Vue.use(Loading)
    return
  }

  if (isMobile().android.device) {
    // todo: 补充安卓设备的定制组件
    Vue.use(Alert)
    Vue.use(Confirm)
    Vue.use(Toast)
    Vue.use(Loading)
    return
  }
// todo: 补充PC端定制组件
  Vue.use(Alert)
  Vue.use(Confirm)
  Vue.use(Toast)
  Vue.use(Loading)
}

installMessageBox()
