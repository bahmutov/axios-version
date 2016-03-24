'use strict'

const debug = require('debug')('ver')
const la = require('lazy-ass')
const is = require('check-more-types')
const semver = require('semver')

const NAME_HEADER = 'x-service-name'
const VERSION_HEADER = 'x-service-version'

function hasVersion (headers) {
  return headers[NAME_HEADER] && headers[VERSION_HEADER]
}

function validateResponseVersion (serviceDependencies, headers) {
  la(is.object(serviceDependencies), 'missing service deps', serviceDependencies)
  la(is.object(headers), 'missing response headers', headers)

  if (!hasVersion(headers)) {
    return true
  }

  const serviceName = headers[NAME_HEADER]
  const serviceVersion = headers[VERSION_HEADER]

  debug(`got response from ${serviceName}@${serviceVersion}`)
  if (!is.has(serviceDependencies, serviceName)) {
    return true
  }

  const expectedVersion = serviceDependencies[serviceName]
  la(is.unemptyString(expectedVersion),
    'invalid semver', expectedVersion, 'for', serviceName)
  const satisfies = semver.satisfies(serviceVersion, expectedVersion)
  debug(`${serviceName}@${serviceVersion} satisfies ${expectedVersion}? ${satisfies}`)

  return satisfies
}

// let external clients know the headers
validateResponseVersion.NAME_HEADER = NAME_HEADER
validateResponseVersion.VERSION_HEADER = VERSION_HEADER

module.exports = validateResponseVersion
