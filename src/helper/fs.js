const { constants, promises: fs } = require('fs')
const baseDir = `${process.cwd()}/.tsk/`

const getFilePath = (file, extension = '.json') => `${baseDir}${file}${extension}`

const getBaseDir = () => (baseDir)

const readFile = async (file, extension) => {
  const filepath = getFilePath(file, extension)

  try {
    await fs.access(filepath, constants.F_OK)

    return require(filepath).data
  } catch (e) {
    throw `File "${file}${extension}" doesn't exists in "${baseDir}" path!`
  }
}

const writeFile = async (data, file, extension) => {
  const filepath = getFilePath(file, extension)

  try {
    const fileContent = JSON.stringify({ data })
    await fs.writeFile(filepath, fileContent)
  } catch (e) {
    throw `Unable to write file "${file}${extension}" in "${baseDir}" path!`
  }
}

module.exports = {
  getBaseDir,
  readFile,
  writeFile,
}
