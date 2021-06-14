const text = require('./types/text')


const parseKey = key => (
  key.split(' ')
    .map((word, index) => index === 0 ? word.toLowerCase() : word)
    .join('')
)

const parser = (schema, keys) => (content) => (
  content.split('\n')
    .reduce(parseLine, [])
    .reduce((acc, data) => {
    const key = parseKey(data.key)
    if (keys.includes(key)) {
      return {
        ...acc,
        [key]: schema[key].parse(data.value)
      }
    }

    return {
      ...acc,
      [key]: text.parse(data.value)
    }
    }, {})
)

module.exports = {
  parser,
  parseKey,
}

const parseLine = (acc, line) => {
  // line is empty
  if (line.trim() === '') {
    return acc
  }

  // is multi line value
  if (/\t/.test(line)) {
    if (typeof acc[currentKey].value === 'string') {
      acc[currentKey].value = []
    }

    acc[currentKey].value.push(line.replace(/\t/, ''))

    return acc
  }

  // line key value
  const [ key, ...value ] = line.split(':')

  currentKey = acc.length
  acc.push({
    key,
    value: value.join(':').trim(),
  })

  return acc
}
