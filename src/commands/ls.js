const chalk = require('chalk')
const Table = require('cli-table')

const { getRelativeTime } = require('../core/time')
const { print } = require('../core')
const { connect } = require('../store')
const { loadBacklogs } = require('../action/backlog')
const { loadTodos } = require('../action/todo')

const command = 'ls'

const stateToProps = ({ todos, backlogs, app }) => ({
  context: app.context,
  todos,
  backlogs,
})

const action = connect(
  stateToProps,
)(({ backlog }) => ({ todos, backlogs, context }) => {
  if (backlog) {
    if (backlogs.length === 0) {
      return print('No backlog availables')
    } 
    return render(backlogs, ['UID', 'Age', 'Description'], parseBacklog)
  }

  const todo = todos[context]
  if (todo.length === 0) {
    return print('No ToDos availables')
  }
  
  render(todo, [' ', 'UID', 'Description'], parseTodo)
})

const options = [{ option: '-b, --backlog', description: 'See backlogs'}]

module.exports = {
  command,
  action,
  options,
}

// private methods

const parseTodo = (todo) => {
  const state = `[${chalk.green(todo.done ? 'x' : ' ')}]`
  const identifier = `#${todo.uid.substring(0, 5)}`
  
  return [ state, identifier, todo.description ]
}

const parseBacklog = ({ uid, description, created }) => {
  const relativeTime = getRelativeTime(created)

  const age = `${relativeTime.duration}${relativeTime.type.charAt(0)}`
  const identifier = `#${uid.substring(0, 5)}`
  
  return [ identifier, age, description ]
}

const render = (tasks, head, lineRenderer) => {
  const table = tasks.reduce((acc, task) => acc.push(lineRenderer(task)) && acc, new Table({ head }))

  print(table.toString())
}
