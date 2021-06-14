const { parse, stringify } = require('../bool')

test('Parsing', () => {
  expect(parse('1')).toBe(true)
  expect(parse('0')).toBe(false)
})

test('stringify', () => {
  expect(stringify(true)).toBe('1')
  expect(stringify(false)).toBe('0')
})
