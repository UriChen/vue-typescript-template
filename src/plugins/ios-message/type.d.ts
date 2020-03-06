// 确保在声明补充的类型之前导入 'vue'
import Vue from 'vue'

type TLocation = 'bottom' | 'center' | 'top'

declare module 'vue/types/vue' {
// 声明为 Vue 补充属性
  interface Vue {
    $alert: (content: string | {
      title?: string
      content: string
      btnText?: string
      component?: any
    }) => void
    $confirm: (content: string | {
      title?: string
      content: string
      yesStyle?: object
      yesText?: string
      noStyle?: object
      noText?: string
      component?: any
    }) => void
    $toast: (message: string, options?: {
      path?: string
      durtaion?: number
      location?: TLocation
      toastStyle?: object
      imgStyle?: object
    }) => void
    $loading: {
      show: (message: string) => void
      hide: () => void
    }
  }
}
