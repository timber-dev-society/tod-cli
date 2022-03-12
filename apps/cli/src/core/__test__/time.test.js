
const moment = require('moment') 

const { getRelativeTime } = require('../time.js')

test('Detect seconds', () => {
  const compare = moment().subtract(2, 'seconds').format('x')

  expect(getRelativeTime(compare).type).toBe('seconds')
})

test('Detect minutes', () => {
  const compare = moment().subtract(2, 'minutes').format('x')

  expect(getRelativeTime(compare).type).toBe('minutes')
})

test('Detect hours', () => {
  const compare = moment().subtract(2, 'hours').format('x')

  expect(getRelativeTime(compare).type).toBe('hours')
})

test('Detect days', () => {
  const compare = moment().subtract(2, 'days').format('x')

  expect(getRelativeTime(compare).type).toBe('days')
})

test('Detect weeks', () => {
  const compare = moment().subtract(2, 'weeks').format('x')

  expect(getRelativeTime(compare).type).toBe('weeks')
})

test('Detect months', () => {
  const compare = moment().subtract(2, 'months').format('x')

  expect(getRelativeTime(compare).type).toBe('months')
})

test('Detect years', () => {
  const compare = moment().subtract(2, 'years').format('x')

  expect(getRelativeTime(compare).type).toBe('years')
})

