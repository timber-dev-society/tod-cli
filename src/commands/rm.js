const { register } = require('../helper/command')
const { connect } = require('../store')
const { deleteTask } = require('../action/task')

const mapDispatchToProps = dispatch => ({
  submitDelete: uid => dispatch(deleteTask(uid))
})

const action = connect(
  undefined,
  mapDispatchToProps
)(uid => ({ submitDelete }) => submitDelete(uid))

register('rm <identifier>')(action)
