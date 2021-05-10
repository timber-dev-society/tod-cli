const { connect } = require('../store')
const { addTask } = require('../action/task')

const command = 'add <description...>'

const mapDispatchToProps = dispatch => ({
  submitTask: description => dispatch(addTask(description))
})

const action = connect(
  undefined,
  mapDispatchToProps
)(description => ({ submitTask }) => submitTask(description.join(' ')))

module.exports = {
  command,
  action,
}
