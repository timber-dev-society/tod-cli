const text = require('./types/text')

const stringifyKey = key => (
  key.replace(/([A-Z])/g, ' $1')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
)

const stringifier = (schema, keys) => data => (
  Object.keys(data)
    .sort((a, b) => keys.indexOf(a) - keys.indexOf(b))
    .map(key => ({
      key: stringifyKey(key),
      value: keys.includes(key) ? schema[key].stringify(data[key]) : text.stringify(data[key])
    }))
    .reduce((acc, { key, value }) => {
      if (typeof value === 'string') {
        acc += `\n${key}: ${value}`
        return acc
      }

      acc += `\n${key}: ${value.length === 1 ? value[0] : `\n\t${value.join('\n\t')}`}`
      return acc
    }, '')
)

module.exports = {
  stringifyKey,
  stringifier
}
