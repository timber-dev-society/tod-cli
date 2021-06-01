const { promises: fs } = require('fs')
const { join } = require('path')
const { compress, decompress } = require('./archive')

const baseDir = `${process.cwd()}/.tod/`

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

const getFileContentFromPath = async path => {
  let fileContents = []

  try {
    const fileNames = await readDir(path)
  
    for (const fileName of fileNames) {
      const content = await readFile(join(path, fileName))
      fileContents.push({ name: fileName, content: content })
    }
  } catch (err) { }

  return fileContents
}

module.exports = {
  getBaseDir,
  readDir,
  readFile,
  writeFile,
  getFileContentFromPath,
}
