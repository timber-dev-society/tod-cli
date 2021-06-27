const { connect } = require('../store')
const { toggleTodo } = require('../action/todo')

const command = 'x <identifier>'

const stateToProps = ({ app }) => ({ context: app.context })

const mapDispatchToProps = dispatch => ({
  submitToggle: (context, uid) => dispatch(toggleTodo(context, uid))
})

const action = connect(
  stateToProps,
  mapDispatchToProps
)(uid => ({ context, submitToggle }) => {
  submitToggle(context, uid)
})

module.exports = {
  command,
  action,
}
