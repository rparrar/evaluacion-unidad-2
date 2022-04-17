const express = require('express')
const path = require('path')
const morgan = require('morgan')
const hbs = require('hbs')
const router = require('./router')

const app = express()

hbs.registerPartials(path.join(__dirname, 'views', 'partials'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', router)

hbs.registerHelper('inc', function (value, options) {
  return parseInt(value) + 1
})

hbs.registerHelper('numberFormat', function (value2, options) {
// Helper parameters
  const dl = options.hash.decimalLength || 0
  const ts = options.hash.thousandsSep || '.'
  const ds = options.hash.decimalSep || ','

  // Parse to float
  const value = parseFloat(value2)

  // The regex
  const re = '\\d(?=(\\d{3})+' + (dl > 0 ? '\\D' : '$') + ')'

  // Formats the number with the decimals
  const num = value.toFixed(Math.max(0, ~~dl))

  // Returns the formatted number
  return (ds ? num.replace('.', ds) : num).replace(new RegExp(re, 'g'), '$&' + ts)
})
module.exports = app
