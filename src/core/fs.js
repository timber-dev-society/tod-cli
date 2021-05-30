const { promises: fs } = require('fs')
const { compress, decompress } = require('./archive')

const baseDir = `${process.cwd()}/.tsk/`

const getFilePath = (file, extension = '.json') => `${baseDir}${file}${extension}`

const getBaseDir = () => (baseDir)

const readDir = async path => {

  return await fs.readdir(path)
}

const readFile = async (filepath) => {
  try {
    const data = await fs.readFile(filepath)

    return decompress(data)
  } catch (e) {
    throw `File "${file}${extension}" doesn't exists in "${baseDir}" path!`
  }
}

const writeFile = async (content, filepath) => {
  try {
    const data = compress(content)
    await fs.writeFile(filepath, data)
  } catch (e) {
    throw `Unable to write file "${filepath}" ${e} !`
  }
}

module.exports = {
  getBaseDir,
  readDir,
  readFile,
  writeFile,
}
