const { constants, promises: fs } = require('fs')
const { getBaseDir, writeFile } = require('../helper/fs')

const command = 'init'

const action = async () => {

  const baseDir = getBaseDir()

  const isDirAlreadyExists = await fs.access(baseDir, constants.F_OK)

  if (isDirAlreadyExists) {
    throw 'Tskr seems already initialized'
  }
  
  try {
    await fs.mkdir(baseDir)


    await writeFile([], 'backlog')
    await writeFile([], 'tasks')
    await writeFile([], 'archive')
    await writeFile([], 'history')
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  command,
  action,
}
