const os = require('os')
const iptable = {}
const ifaces = os.networkInterfaces()

for (const dev in ifaces) {
  ifaces[dev].forEach(function(details, alias) {
    if (details.family === 'IPv4') {
      iptable[dev + (alias ? ':' + alias : '')] = details.address
    }
  })
}

const IS_PROD = process.env.NODE_ENV === 'production'

const APP_NAME = 'vue-typescript-template'
const VERSION = '@1.0.0'
const HTTPS = true

const DEV_HOST = Object.values(iptable).find(item => item !== '127.0.0.1') || '192.168.0.105'
const DEV_PORT = 3000
const DEV_SERVER_PORT = 8080

const MOCK_PORT = 3000

const PROD_HOST = DEV_HOST // todo: 发布时要改为服务器域名
const PROD_PORT = DEV_PORT // todo: 发布时要改为服务器端口

const prodSettings = {
  name: APP_NAME, // 项目名
  title: APP_NAME, // 网页标题
  version: VERSION, // 版本号
  https: HTTPS, // 是否开启https
  host: PROD_HOST, // 域名
  port: PROD_PORT, // 端口
  baseUrl: `${HTTPS ? 'https' : 'http'}://${PROD_HOST}:${PROD_PORT}`, // 协议域名端口号
  assetsDir: 'static', // 静态资源目录
  publicPath: `/${APP_NAME}/`, // 服务器目录
  outputDir: `D:/WWW/${APP_NAME}${VERSION}` // 打包文件输出目录
}

const devSettings = {
  ...prodSettings,
  title: `${APP_NAME} for dev`,
  mockPort: MOCK_PORT,
  devServerPort: DEV_SERVER_PORT,
  host: DEV_HOST,
  port: DEV_PORT,
  baseUrl: `${HTTPS ? 'https' : 'http'}://${DEV_HOST}:${DEV_PORT}`
}

const cliSettings = IS_PROD ? prodSettings : devSettings

const appSettings = {
  title: cliSettings.title,
  theme: 'primary'
}

const sentryCliSettings = {
  url: 'https://sentry.io/',
  org: 'urichen',
  project: 'vue-element-typescript-admin',
  token: '1ffcda956d5f444fba899f2c53a72b22288e22273ecc43ee81177079e0529cae',
  dsn: 'https://85b26f0175654ebd91324100ee47063c@sentry.io/2782614',
  release: APP_NAME + VERSION
}

module.exports = {
  cliSettings,
  appSettings,
  sentryCliSettings
}
