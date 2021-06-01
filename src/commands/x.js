const { connect } = require('../store')
const { toggleTodo } = require('../action/todo')

const command = 'x <identifier>'

const mapDispatchToProps = dispatch => ({
  submitToggle: uid => dispatch(toggleTodo(uid))
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
