import { test, expect } from '@jest/globals'

import { parse, stringify } from '../text'

test('Parsing', () => {
  expect(parse('a')).toBe('a')
  expect(parse([ 'a', 'a' ])).toBe('a\na')
})

test('stringify', () => {
  expect(stringify('a')).toBe('a')
  const data = stringify('a\na')
  expect(data.length).toBe(2)
})
