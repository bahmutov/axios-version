'use strict'

const axios = require('axios')
const url = 'http://localhost:3000'
axios(url)
  .then((response) => {
    const name = response.headers['x-service-name']
    const version = response.headers['x-service-version']
    console.log(`service ${name}@${version} says ${response.data}`)
  })
  .catch(console.error)
