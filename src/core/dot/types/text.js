
const parse = (value) => typeof value === 'string' ? value : value.join('\n')

const stringify = (value) => {
  const lines = value.split('\n')

  return lines.length === 1 ? lines[0] : lines
}

module.exports = {
  parse,
  stringify,
}
