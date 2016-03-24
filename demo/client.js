'use strict'

const axios = require('axios')
const url = 'http://localhost:3000'
axios(url)
  .then(console.log)
  .catch(console.error)
