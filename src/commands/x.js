const { connect } = require('../store')
const { toggleTask } = require('../action/task')

const command = 'x <identifier>'

const mapDispatchToProps = dispatch => ({
  submitToggle: uid => dispatch(toggleTask(uid))
})

const action = connect(
  undefined,
  mapDispatchToProps
)(uid => ({ submitToggle }) => {
  console.log(uid);submitToggle(uid)})

module.exports = {
  command,
  action,
}
