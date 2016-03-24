'use strict'

const la = require('lazy-ass')
const is = require('check-more-types')

// const semver = require('semver')

function validateResponseVersion (serviceDependencies, headers) {
  la(is.object(serviceDependencies), 'missing service deps', serviceDependencies)
  la(is.object(headers), 'missing response headers', headers)

  return true
}

module.exports = validateResponseVersion
