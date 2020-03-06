// const whitelister = require('purgecss-whitelister')
const purgecss = require('@fullhuman/postcss-purgecss')({
  // Specify the paths to all of the template files in your project
  content: [
    './public/**/*.html',
    './src/**/*.vue',
    './src/**/*.tsx',
    './src/**/*.ts',
    './src/**/*.scss',
    './src/**/*.css'
  ],
  css: [],
  whitelist: [],
  whitelistPatterns: [],
  whitelistPatternsChildren: [],
  variables: true,
  rejected: true,
  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
})

module.exports = {
  plugins: [
    require('tailwindcss')('./tailwind.config.js'),
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : [])
    // ...[purgecss]
  ]
}
