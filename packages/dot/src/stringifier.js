import text from './types/text'

export const stringifyKey = key => (
  key.replace(/([A-Z])/g, ' $1')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
)

export const stringifier = (schema, keys) => data => (
  Object.keys(data)
    .sort((a, b) => keys.indexOf(a) - keys.indexOf(b))
    .map(key => ({
      key: stringifyKey(key),
      value: keys.includes(key) ? schema[key].stringify(data[key]) : text.stringify(data[key])
    }))
    .reduce((acc, { key, value }) => {
      acc += `\n${key}: ${typeof value === 'string' ? value : `\n\t${value.join('\n\t')}`}`
      return acc
    }, '')
)
