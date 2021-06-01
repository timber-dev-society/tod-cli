const chalk = require('chalk')
const Table = require('cli-table')

const { getRelativeTime } = require('../core/time')
const { print } = require('../core')
const { connect } = require('../store')

const command = 'ls'

const stateToProps = ({ tasks, backlogs, app }, {}) => ({
  context: app.context,
  tasks,
  backlogs,
})

const action = connect(
  stateToProps,
)((noop, { backlog }) => ({ tasks, backlogs, context }) => {
  // backlogs.length !== 0 && renderBacklogs(backlogs)
  if (backlog) {
     return renderBacklogs(backlogs)
  }

  const todo = tasks[context]
  todo !== undefined && todo.length !== 0 && renderTasks(todo)
})

const options = [{ option: '-b, --backlog', description: 'See backlogs'}]

module.exports = {
  command,
  action,
  options,
}

// private methods

const parseTask = (task) => {
  print(task)
  const state = `[${chalk.green(task.done ? 'x' : ' ')}]`
  const identifier = `#${task.uid.substring(0, 5)}`
  
  return [ state, identifier, task.description ]
}

const parseBacklog = ({ uid, description, created }) => {
  const relativeTime = getRelativeTime(created)

  const age = `${relativeTime.duration}${relativeTime.type.charAt(0)}`
  const identifier = `#${uid.substring(0, 5)}`
  
  return [ identifier, age, description ]
}

const renderBacklogs = (backlogs) => {
  if (backlogs.length === 0) {
    print('Backlog availables')
    return
  } 
  const table = tasks.reduce((acc, task) => acc.push(parseTask(task)) && acc, new Table({ head: ['UID', 'Age', 'Description'] })).toString()

  print(table.toString())
}

const renderTasks = (tasks) => {
  const table = tasks.reduce((acc, task) => acc.push(parseTask(task)) && acc, new Table({ head: [' ', 'UID', 'Description'] }))

  print(table.toString())
}
