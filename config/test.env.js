var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"test"',
  API: '"http://192.168.0.103:8081"',
  API2: '"http://192.168.0.103:8082"'
})
