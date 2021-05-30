const { connect } = require('../store')
const { createTask } = require('../action/task')
const { addBacklog } = require('../action/backlog')

const command = 'add <description...>'

const mapStateToProps = ({ app }) => ({
  context: app.context
})

const mapDispatchToProps = dispatch => ({
  submitBacklog: description => dispatch(addBacklog(description)),
  submitTask: (context, description) => dispatch(createTask(context, description)),
})

const action = connect(
  mapStateToProps,
  mapDispatchToProps
)((description, { backlog }) => ({ context, submitTask, submitBacklog }) => {
  if (backlog) {
     submitBacklog(description.join(' '))
     return
  }
  submitTask(context, description.join(' '), backlog)
})

const options = [{ option: '-b, --backlog', description: 'Save task in backlog'}]

module.exports = {
  command,
  action,
  options,
}
