const { connect } = require('../store')
const { addTask } = require('../action/task')
const { deleteBacklog } = require('../action/backlog')

const { buildUidMatcher } = require('../core/task')

const command = 'mv <identifier>'

const stateToProps = ({ backlogs, app }) => ({
  context: app.context,
  backlogs,
})

const mapDispatchToProps = dispatch => ({
  moveTask: (context, task) => {
    dispatch(deleteBacklog(task.uid))
    dispatch(addTask(context, task))
  },
})

const action = connect(
  stateToProps,
  mapDispatchToProps
)(uid => ({ context, backlogs, moveTask }) => {
  const uidMatcher = buildUidMatcher(uid)
  const task = backlogs.find(backlog => uidMatcher.test(backlog.uid))


  if (task === undefined) {
    throw 'Error task not found in backlog'
  }

  moveTask(context, task)
})

module.exports = {
  command,
  action,
}
