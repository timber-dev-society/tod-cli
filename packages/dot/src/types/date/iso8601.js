
const ISO8601_FORMAT = 'YYYY-MM-DD hh:mm:ss ZZ'

export const parse = (value) => new Date(Date.parse(value, ISO8601_FORMAT))

export const stringify = (value) => value?.toISOString() || ''

export default {
  parse,
  stringify,
}
