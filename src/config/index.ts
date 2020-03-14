const index = require('./settings.js')

interface ICliSettings {
  name: string
  title: string
  version: string
  https: boolean
  host: string
  port: number
  baseUrl: string
  assetsDir: string
  publicPath: string
  outputDir: string
  mockPort: number
  devServerPort: number
}

interface IAppSettings {
  title: string
  theme: string
}

interface ISentryCliSettings {
  url: string
  org: string
  project: string
  token: string
  dsn: string
  release: string
}

export const cliSettings: ICliSettings = index.cliSettings
export const appSettings: IAppSettings = index.appSettings
export const sentryCliSettings: ISentryCliSettings = index.sentryCliSettings

export default {
  cliSettings,
  appSettings,
  sentryCliSettings
}
