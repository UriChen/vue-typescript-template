const settings = require('./src/settings')

module.exports = {
  name: settings.cliSettings.name,
  inputFiles: ['./src'],
  mode: 'modules',
  out: 'docs',
  includeDeclarations: true,
  exclude: './src/icons/**/*.ts',
  excludeExternals: true
}
