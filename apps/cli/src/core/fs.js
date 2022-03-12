const { promises: fs } = require('fs')
const { join } = require('path')

const baseDir = join(process.cwd(), '.tod')

const getBaseDir = () => (baseDir)

const readDir = async path => {

  return await fs.readdir(path)
}

const readFile = async (filepath) => {
  try {
    return await (await fs.readFile(filepath)).toString()
  } catch (e) {
    throw `File "${file}${extension}" doesn't exists in "${baseDir}" path!`
  }
}

const writeFile = async (content, filepath) => {
  try {
    await fs.writeFile(filepath, content)
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
      fileContents.push({ fileName, content })
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
