const { mockCwd } = require('mock-cwd')
mockCwd()

const { constants, promises: fs } = require('fs')
const { join } = require('path')
const { getBaseDir } = require('../../helper/fs')

const baseDir = getBaseDir()
const fileExists = file => async () => await fs.access(join(baseDir, file), constants.F_OK)

test('Init should generate file system', async () => {

  const { action } = require('../init')

  try {
    await action()
  } catch (err) {
    console.log(err)
    return
  }

    const stats = await fs.lstat(baseDir)
    expect(stats.isDirectory()).toBe(true)

    expect(fileExists('backlog.json')).not.toThrow()

    expect(fileExists('tasks.json')).not.toThrow()

    expect(fileExists('archive.json')).not.toThrow()

    expect(fileExists('history.json')).not.toThrow()

    const backlogStats = await fs.lstat(join(baseDir, 'backlog.json'))
    expect(backlogStats.isFile()).toBe(true)
})
