'use strict'

const serviceDependencies = {
  'test-service': '~2.3.0'
}

const install = require('./src/install-interceptor')
install(serviceDependencies)

const debug = require('debug')('ver')
debug('installed axios interceptor for', Object.keys(serviceDependencies))
