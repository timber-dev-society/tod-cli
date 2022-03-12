const { promises: fs } = require('fs')
const { join } = require('path')
const { connect } = require('../store')
const { getFileContentFromPath, writeFile } = require('./../core/fs')
const { parseTodoFile } = require('./../core/storage')

const command = 'export <outputFile>'

const stateToProps = ({ app }) => ({ 
  workDir: app.workDir,
})

const action = connect(
  stateToProps,
)(outputFile => async ({ workDir }) => {
  const folders = await fs.readdir(join(workDir, 'todo'))

  const todos = {}
  
  for (const folder of folders) {
    todos[folder] = (await getFileContentFromPath(join(workDir, 'todo', folder)))
                        .map(({ fileName, content }) => parseTodoFile(fileName, content))
  }

  const backlogs = (await getFileContentFromPath(join(workDir, 'backlog')))
                         .map(({ fileName, content }) => parseTodoFile(fileName, content))

  await writeFile(JSON.stringify({ todos, backlogs }), getFileName(workDir, outputFile))

  console.log(`Exported into ${getFileName(workDir, outputFile)}`)
})

module.exports = {
  command,
  action,
}

// Private methods
const getFileName = (workDir, outputFile) => {
  const file = /.json/.test(outputFile) ? outputFile : `${outputFile}.json`

  return join(workDir, '..', file)
}
