const { connect } = require('../store')
const { createTodo } = require('../action/todo')
const { createBacklog } = require('../action/backlog')

const command = 'add <description...>'

const mapStateToProps = ({ app }) => ({
  context: app.context,
  author: app.author,
})

const mapDispatchToProps = dispatch => ({
  submitBacklog: (description, author) => dispatch(createBacklog({ description, author })),
  submitTodo: (context, description, author) => dispatch(createTodo(context, { description, author })),
})

const action = connect(
  mapStateToProps,
  mapDispatchToProps
)((description, { backlog }) => ({ context, author, submitTodo, submitBacklog }) => {
  if (backlog) {
     submitBacklog(description.join(' '), author)
     return
  }
  submitTodo(context, description.join(' '), author)
})

const options = [{ option: '-b, --backlog', description: 'Save todo in backlog' }]

module.exports = {
  command,
  action,
  options,
}
