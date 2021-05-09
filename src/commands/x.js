const { register } = require('../helper/command')
const { connect } = require('../store')
const { toggleTask } = require('../action/task')

const mapDispatchToProps = dispatch => ({
  submitToggle: uid => dispatch(toggleTask(uid))
})

const action = connect(
  undefined,
  mapDispatchToProps
)(uid => ({ submitToggle }) => submitToggle(uid))

register('x <identifier>')(action)
