const { connect } = require('../store')
const { addTodo } = require('../action/todo')
const { deleteBacklog } = require('../action/backlog')

const { buildUidMatcher } = require('../core/todo')

const command = 'mv <identifier>'

const stateToProps = ({ backlogs, app }) => ({
  context: app.context,
  todos: app.todo[context],
  backlogs,
})

const mapDispatchToProps = dispatch => ({
  moveToTodo: (context, todo) => {
    dispatch(deleteBacklog(todo.uid))
    dispatch(addTodo(context, todo))
  },
  moveToBacklog: () => {
    dispatch(deleteTodo(context, todo.uid))
    dispatch(addBacklog(todo))
  },
})

const action = connect(
  stateToProps,
  mapDispatchToProps
)((uid, { backlog }) => ({ context, backlogs, todos, moveToTodo, moveToBacklog }) => {
  const uidMatcher = buildUidMatcher(uid)
  if (backlog) {
    const todo = todos.find(todo => uidMatcher.test(todo.uid))

    moveToBacklog(todo)
  }

  const todo = backlogs.find(backlog => uidMatcher.test(backlog.uid))

  if (todo === undefined) {
    throw 'Error todo not found in backlog'
  }

  moveToTodo(context, todo)
})

const options = [{ option: '-b, --backlog', description: 'Move ToDo to backlogs'}]

module.exports = {
  command,
  action,
  options,
}
