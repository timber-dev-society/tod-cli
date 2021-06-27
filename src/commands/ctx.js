const { promises: fs } = require('fs')
const { join } = require('path')
const { connect } = require('../store')

const command = 'ctx'

const stateToProps = ({ app }) => ({ 
  workDir: app.workDir,

})

const action = connect(
  stateToProps
)(() => async ({ workDir }) => {
  const files = await fs.readdir(join(workDir, 'todo'))

  files.some(file => console.log(file))
})

module.exports = {
  command,
  action,
}
