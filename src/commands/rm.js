const { connect } = require('../store')
const { deleteTask } = require('../action/task')

const command = 'rm <identifier>'

const mapDispatchToProps = dispatch => ({
  submitDelete: uid => dispatch(deleteTask(uid))
})

const action = connect(
  undefined,
  mapDispatchToProps
)(uid => ({ submitDelete }) => submitDelete(uid))

module.exports = {
  command,
  action,
}
