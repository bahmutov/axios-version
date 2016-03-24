'use strict'

const debug = require('debug')('ver')
const axios = require('axios')
const validate = require('./validate-headers')
const la = require('lazy-ass')
const is = require('check-more-types')

// TODO intercept only some requests
function installInterceptor (deps) {
  la(is.object(deps), 'missing deps', deps)

  axios.interceptors.response.use(function (response) {
    debug('validating response from', response.config.url)
    if (!validate(deps, response.headers)) {
      // TODO form good meaningful error message
      return Promise.reject(new Error('Service version mismatch'))
    }
    return response
  })
}

module.exports = installInterceptor
