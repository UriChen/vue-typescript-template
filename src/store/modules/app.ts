import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import { setLanguage } from '@/utils/cookies'
import { getLocale } from '@/lang'
import store from '@/store'
import settings from '@/settings'

const appSettings = settings.appSettings

export enum DeviceType {
  Mobile,
  Desktop,
}

export interface IAppState {
  device: DeviceType
  theme: string
  language: string
  documentClientHeight: number
  documentClientWidth: number
}

@Module({ dynamic: true, store, name: 'app', namespaced: true })
class App extends VuexModule implements IAppState {
  public device = DeviceType.Desktop
  public theme = appSettings.theme
  public language = getLocale()
  public documentClientHeight = 800
  public documentClientWidth = 1000

  @Mutation
  private TOGGLE_DEVICE(device: DeviceType) {
    this.device = device
  }

  @Mutation
  private SET_THEME(theme: string) {
    this.theme = theme
  }

  @Mutation
  private SET_LANGUAGE(language: string) {
    this.language = language
    setLanguage(this.language)
  }

  @Mutation
  private SET_CLIENT_WIDTH(width: number) {
    this.documentClientWidth = width
  }

  @Mutation
  private SET_CLIENT_HEIGHT(height: number) {
    this.documentClientHeight = height
  }

  @Action
  public ToggleDevice(device: DeviceType) {
    this.TOGGLE_DEVICE(device)
  }

  @Action
  public SetTheme(theme: string) {
    this.SET_THEME(theme)
  }

  @Action
  public SetLanguage(language: string) {
    this.SET_LANGUAGE(language)
  }

  @Action
  public SetClientWidth(width: number) {
    this.SET_CLIENT_WIDTH(width)
  }

  @Action
  public SetClientHeight(height: number) {
    this.SET_CLIENT_HEIGHT(height)
  }
}

export const AppModule = getModule(App)
