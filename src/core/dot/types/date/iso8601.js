
const moment = require('moment')

const ISO8601_FORMAT = 'YYYY-MM-DD hh:mm:ss ZZ'

const parse = (value) => moment(value, ISO8601_FORMAT)

const stringify = (value) => value.format(ISO8601_FORMAT)

module.exports = {
  parse,
  stringify,
}
