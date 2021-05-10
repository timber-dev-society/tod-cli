const { mockCwd } = require('mock-cwd')
mockCwd()

const { constants, promises: fs } = require('fs')
const { join } = require('path')
const { getBaseDir } = require('../../helper/fs')

beforeEach(async () => {
  //expect(process.cwd()).not.toBe(join(__dirname, '..', '..', '..'))
  //await fs.mkdir(process.cwd())
})

afterEach(async () => {
  //await fs.unlink(process.cwd())
})

test('Init should generate file system', async () => {

  const { action } = require('../init')

  const baseDir = await getBaseDir()

  action()

  //try {
    const isDirCreated = await fs.access(baseDir, constants.F_OK)
    expect(isDirCreated).toBe(true)

    //const isConfigCreated = await fs.access(join(baseDir, 'config.json'), constants.F_OK)
    //expect(isConfigCreated).toBe(true)

    const isBacklogCreated = await fs.access(join(baseDir, 'backlog.json'), constants.F_OK)
    expect(isBacklogCreated).toBe(true)

    const isTasksCreated = await fs.access(join(baseDir, 'tasks.json'), constants.F_OK)
    expect(isTasksCreated).toBe(true)

    const isArchiveCreated = await fs.access(join(baseDir, 'archive.json'), constants.F_OK)
    expect(isArchiveCreated).toBe(true)

    const isHistoryCreated = await fs.access(join(baseDir, 'history.json'), constants.F_OK)
    expect(isHistoryCreated).toBe(true)
  //} catch (error) {
  //  console.log(error)
  //  expect(error).toBe(false)
  //}
})
