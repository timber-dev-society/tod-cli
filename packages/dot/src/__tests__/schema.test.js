import { test, expect } from '@jest/globals';

import types from './../types'
import schema from './../schema'

const now = new Date()

const dotContent = `
Date Value: ${now.toISOString()}
Text Value: Some Text
Bool Value: 1`

test('Parse a basic schema', () => {

  const { boolValue, textValue, dateValue } = schema({
    boolValue: types.bool,
    dateValue: types.date.iso8601,
  }).parse(dotContent)

  expect(boolValue).toBe(true)
  expect(textValue).toBe('Some Text')
  expect(dateValue.toUTCString()).toBe(now.toUTCString())
})

test('Stringify a basic object', () => {
  const result = schema({
    dateValue: types.date.iso8601,
    textValue: types.text,
    boolValue: types.bool,
  }).stringify({ boolValue: true, dateValue: now, textValue: 'Some Text' })

  expect(result).toBe(dotContent)
})


