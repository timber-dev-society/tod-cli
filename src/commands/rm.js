const { connect } = require('../store')
const { deleteTodo } = require('../action/todo')

const command = 'rm <identifier>'

const mapDispatchToProps = dispatch => ({
  submitDelete: uid => dispatch(deleteTodo(uid))
})

const action = connect(
  undefined,
  mapDispatchToProps
)(uid => ({ submitDelete }) => submitDelete(uid))

module.exports = {
  command,
  action,
}
