const { connect } = require('../store')
const { deleteTodo } = require('../action/todo')
const { deleteBacklog } = require('../action/backlog')

const command = 'rm <identifier>'

const stateToProps = ({ app }) => ({
  context: app.context,
})

const mapDispatchToProps = dispatch => ({
  submitDeleteToDo: (context, uid) => dispatch(deleteTodo(context, uid)),
  submitDeleteBacklog: uid => dispatch(deleteBacklog(uid)),
})

const action = connect(
  stateToProps,
  mapDispatchToProps
)((uid, { backlog }) => ({ context, submitDeleteToDo, submitDeleteBacklog }) => {
  backlog && submitDeleteBacklog(uid)
  !backlog && submitDeleteToDo(context, uid)
})

const options = [{ option: '-b, --backlog', description: 'See backlogs' }]

module.exports = {
  command,
  action,
  options,
}
