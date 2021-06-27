const { connect } = require('../store')
const { deleteAllTodos } = require('../action/todo')

const command = 'resolve <identifier>'

const mapDispatchToProps = dispatch => ({
  submitDelete: context => dispatch(deleteAllTodos(context))
})

const action = connect(
  undefined,
  mapDispatchToProps
)(context => ({ submitDelete }) => submitDelete(context))

module.exports = {
  command,
  action,
}
