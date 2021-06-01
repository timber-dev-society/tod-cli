const { connect } = require('../store')
const { createTodo } = require('../action/todo')
const { addBacklog } = require('../action/backlog')

const command = 'add <description...>'

const mapStateToProps = ({ app }) => ({
  context: app.context
})

const mapDispatchToProps = dispatch => ({
  submitBacklog: description => dispatch(addBacklog(description)),
  submitTodo: (context, description) => dispatch(createTodo(context, description)),
})

const action = connect(
  mapStateToProps,
  mapDispatchToProps
)((description, { backlog }) => ({ context, submitTodo, submitBacklog }) => {
  if (backlog) {
     submitBacklog(description.join(' '))
     return
  }
  submitTodo(context, description.join(' '), backlog)
})

const options = [{ option: '-b, --backlog', description: 'Save todo in backlog'}]

module.exports = {
  command,
  action,
  options,
}
