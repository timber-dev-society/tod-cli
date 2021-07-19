const { promises: fs } = require('fs')
const { join } = require('path')
const { connect } = require('../store')

const command = 'init'

const stateToProps = ({ app }) => ({ 
  workDir: app.workDir,
})

const action = connect(
  stateToProps,
)(() => async ({ workDir }) => {

  await fs.mkdir(workDir)
  await fs.mkdir(join(workDir, 'backlog'))
  await fs.mkdir(join(workDir, 'todo'))
  await fs.mkdir(join(workDir, 'logs'))
  await fs.mkdir(join(workDir, 'archive'))
})

module.exports = {
  command,
  action,
}
