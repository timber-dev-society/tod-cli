const { constants, promises: fs } = require('fs')
const { getBaseDir, writeFile } = require('../core/fs')

const command = 'init'

const action = async () => {

 const baseDir = getBaseDir()
  await fs.mkdir(baseDir)

  await writeFile({ data: [] }, 'backlog')
  await writeFile({ data: {} }, 'todos')
  await writeFile({ data: [] }, 'archive')
  await writeFile({ data: [] }, 'history')
}

module.exports = {
  command,
  action,
}
