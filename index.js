'use strict'

const join = require('path').join
const packagePath = join(process.cwd(), 'package.json')
const fs = require('fs')
if (!fs.existsSync(packagePath)) {
  console.error('Cannot find package', packagePath)
  process.exit(-1)
}
const pkg = require(packagePath)
const serviceDependencies = (pkg.config && pkg.config.services) || pkg.services
if (!serviceDependencies) {
  console.error('Cannot find service dependencies in', packagePath)
  process.exit(-2)
}

const install = require('./src/install-interceptor')
install(serviceDependencies)

const debug = require('debug')('ver')
debug('installed axios interceptor for', Object.keys(serviceDependencies))
