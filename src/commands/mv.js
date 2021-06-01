const { connect } = require('../store')
const { addTodo } = require('../action/todo')
const { deleteBacklog } = require('../action/backlog')

const { buildUidMatcher } = require('../core/todo')

const command = 'mv <identifier>'

const stateToProps = ({ backlogs, app }) => ({
  context: app.context,
  backlogs,
})

const mapDispatchToProps = dispatch => ({
  moveTodo: (context, todo) => {
    dispatch(deleteBacklog(todo.uid))
    dispatch(addTodo(context, todo))
  },
})

const action = connect(
  stateToProps,
  mapDispatchToProps
)(uid => ({ context, backlogs, moveTodo }) => {
  const uidMatcher = buildUidMatcher(uid)
  const todo = backlogs.find(backlog => uidMatcher.test(backlog.uid))


  if (todo === undefined) {
    throw 'Error todo not found in backlog'
  }

  moveTodo(context, todo)
})

module.exports = {
  command,
  action,
}
