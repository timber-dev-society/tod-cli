const { register } = require('../helper/command')
const { connect } = require('../store')
const { addTask } = require('../action/task')

const mapDispatchToProps = dispatch => ({
  submitTask: description => dispatch(addTask(description))
})

const action = connect(
  undefined,
  mapDispatchToProps
)(description => ({ submitTask }) => submitTask(description.join(' ')))

register('add <description...>')(action)
