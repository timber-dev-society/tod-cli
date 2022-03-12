const { mockCwd } = require('mock-cwd')
mockCwd()

const { promises: fs } = require('fs')
const { join } = require('path')
const { store } = require('./../../store')
const { setWorkDir } = require('./../../action/app')

test('Init should generate file system', async () => {
  const { action } = require('../init')
  const baseDir = join(process.cwd(), '.tod')
  store.dispatch(setWorkDir(baseDir))

  expect(async () => await action()).not.toThrow()

  const stats = await fs.lstat(baseDir)
  expect(stats.isDirectory()).toBe(true)

  const backlogStats = await fs.lstat(join(baseDir, 'backlog'))
  expect(backlogStats.isDirectory()).toBe(true)

  const todoStats = await fs.lstat(join(baseDir, 'todo'))
  expect(todoStats.isDirectory()).toBe(true)

  const logsStats = await fs.lstat(join(baseDir, 'logs'))
  expect(logsStats.isDirectory()).toBe(true)

  const archiveStats = await fs.lstat(join(baseDir, 'archive'))
  expect(archiveStats.isDirectory()).toBe(true)
})
