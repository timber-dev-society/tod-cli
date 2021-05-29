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

const writeFile = async (content, filepath) => {
  console.log(content, filepath)

  try {
    await fs.writeFile(filepath, content)
  } catch (e) {
    throw `Unable to write file "${filepath}" ${e} !`
  }
}

module.exports = {
  getBaseDir,
  readFile,
  writeFile,
}
