const proxy = require('express-http-proxy')
const apiMocker = require('connect-api-mocker')

const { API_URL } = process.env
const API_PREFIX = '/api'

function proxyServer(app) {
  const prefix = API_URL ? 'SERVER' : 'MOCK'
  app.use(API_PREFIX, (req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] [${prefix}] ${req.method} - ${req.url}`)
    next()
  })
  if (API_URL) {
    app.use(API_PREFIX, proxy(API_URL))
  } else {
    app.use(API_PREFIX, apiMocker('mocks/api'))
  }
}

module.exports = proxyServer
