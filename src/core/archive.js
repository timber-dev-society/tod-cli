
let compress = content => content
let decompress = content => content

if (process.env.NODE_ENV !== 'TSK_TEST') {
  const { deflate, inflate } = require('pako')

  compress = (content) => deflate(content)
  decompress = (content) => inflate(content, { to: 'string' })
}

module.exports = {
  compress,
  decompress,
}
