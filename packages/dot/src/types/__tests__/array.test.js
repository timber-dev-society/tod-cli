import { test, expect } from '@jest/globals'

import { parse, stringify } from '../array'

test('Parsing', () => {
  expect(parse([ 'a' ])).toBe('a')
  expect(parse([ 'a', 'a' ])).toBe('a\na')
})

test('stringify', () => {
  expect(stringify('a')).toStrictEqual(['a'])
  expect(stringify('a\na')).toStrictEqual([ 'a', 'a' ])
})
