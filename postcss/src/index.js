const autoprefixer = require('autoprefixer')
const postcss = require('postcss')
const precss = require('precss')
const penv = require('postcss-preset-env')
const fs = require('fs')
const mysqlf = require('./myself')

fs.readFile('./src/test.less', (err, css) => {
  postcss([mysqlf(), precss, autoprefixer, penv()])
    .process(css, { from: './src/test.less', to: './out.css' })
    .then(result => {
      // console.log(result.css)
      fs.writeFile('./out.css', result.css, () => {})
      // if ( result.map ) fs.writeFile('dest/app.css.map', result.map)
    })
})