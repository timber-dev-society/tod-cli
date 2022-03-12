import { test, expect } from '@jest/globals';

import { stringifyKey } from '../stringifier'

test('Should be able to convert todo key', () => {
  const test1 = 'test'
  expect(stringifyKey(test1)).toBe('Test')

  const test2 = 'testString'
  expect(stringifyKey(test2)).toBe('Test String')

  const test3 = 'testLongString'
  expect(stringifyKey(test3)).toBe('Test Long String')
})
