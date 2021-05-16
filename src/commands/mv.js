const { connect } = require('../store')
const { addTask } = require('../action/task')
const { deleteBacklog } = require('../action/backlog')

const { buildUidMatcher } = require('../core/task')

const command = 'mv <identifier>'

const stateToProps = ({ bakclogs }) => ({
  bakclogs,
})

const mapDispatchToProps = dispatch => ({
  moveTask: task => {
    dispatch(deleteBacklog(task.uid))
    dispatch(addTask(task))
  },
})

const action = connect(
  stateToProps,
  mapDispatchToProps
)(uid => ({ backlogs, moveTask }) => {
  const uidMatcher = buildUidMatcher(uid)
  const task = backlogs.find(backlog => uidMatcher.test(bakclog.uid))

  if (task === undefined) {
    throw 'Error task not found in backlog'
  }

  moveTask(task)
})

module.exports = {
  command,
  action,
}
