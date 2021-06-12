const moment = require('moment')

const types = require('./../types')
const schema = require('./../schema')

const dotContent = `
Date Value: 2021-05-22 10:11:20 +0200
Text Value: Some Text
Bool Value: 1`

test('Parse a basic schema', () => {

  const result = schema({
    boolValue: types.bool,
    dateValue: types.date.iso8601,
  }).parse(dotContent)

  expect(typeof result.boolValue).toBe('boolean')
  expect(typeof result.textValue).toBe('string')
  expect(result.dateValue).toBeInstanceOf(moment)
})

test('Stringify a basic object', () => {
  const result = schema({
    dateValue: types.date.iso8601,
    textValue: types.text,
    boolValue: types.bool,
  }).stringify({ boolValue: true, dateValue: moment('2021-05-22 10:11:20 +0200', 'YYYY-MM-DD hh:mm:ss ZZ'), textValue: 'Some Text' })

  expect(result).toBe(dotContent)
})


