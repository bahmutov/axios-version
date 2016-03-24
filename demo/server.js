'use strict'

const koa = require('koa')
const serviceVersion = require('koa-version-header')
const app = koa()
app.use(serviceVersion({
  name: 'demo-server',
  version: '1.2.0'
}))
app.use(function * () {
  console.log('responding to request')
  this.body = 'ok'
})
app.listen(3000)

console.log('make any request to port 3000 to see server with X-... headers')
