'use strict'

const axios = require('axios')
const validate = require('./src/validate-headers')
const la = require('lazy-ass')
const is = require('check-more-types')

// TODO intercept only some requests
function installInterceptor (deps) {
  la(is.object(deps), 'missing deps', deps)

  axios.interceptors.response.use(function (response) {
    if (!validate(deps, response.headers)) {
      // TODO form good meaningful error message
      return Promise.reject(new Error('Service version mismatch'))
    }
    return response
  })
}

module.exports = installInterceptor
