const { parseKey } = require('../parser')

test('Should be able to convert file key', () => {
  const test1 = 'Test'
  expect(parseKey(test1)).toBe('test')

  const test2 = 'Test String'
  expect(parseKey(test2)).toBe('testString')

  const test3 = 'Test Long String'
  expect(parseKey(test3)).toBe('testLongString')
})
