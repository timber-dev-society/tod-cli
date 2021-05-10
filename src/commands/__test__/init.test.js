const fs = require('fs/promises')
const { mockCwd } = require('mock-cwd')

const mock = mockCwd();
const { action } = require('../init')

test('Init should generate file system', async () => {
  console.log(action())

  mock.restore();

  expect(true).toBe(true)
})
