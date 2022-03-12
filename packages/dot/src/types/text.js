
export const parse = (value) => typeof value === 'string' ? value : value.join('\n')

export const stringify = (value) => {
  const lines = value.split('\n')

  return lines.length === 1 ? lines[0] : lines
}

export default {
  parse,
  stringify,
}
