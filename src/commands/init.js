const { constants, promises: fs } = require('fs')
const { getBaseDir, writeFile } = require('../core/fs')

const command = 'init'

const action = async () => {

 const baseDir = getBaseDir()
  await fs.mkdir(baseDir)

  await writeFile([], 'backlog')
  await writeFile([], 'tasks')
  await writeFile([], 'archive')
  await writeFile([], 'history')
}

module.exports = {
  command,
  action,
}
