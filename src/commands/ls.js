const chalk = require('chalk')
const Table = require('cli-table')

const { getRelativeTime } = require('../core/time')
const { print } = require('../core')
const { connect } = require('../store')

const command = 'ls'

const stateToProps = ({ tasks, backlogs, app }) => ({
  context: app.context,
  tasks,
  backlogs,
})

const action = connect(
  stateToProps,
)(() => ({ tasks, backlogs, context }) => {
  // backlogs.length !== 0 && renderBacklogs(backlogs)

  const todo = tasks[context]
  todo !== undefined && todo.length !== 0 && renderTasks(todo)
})

module.exports = {
  command,
  action,
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
  print('====== Backlogs ======')

  const table = new Table({ head: ['UID', 'Age', 'Description'] })
  backlogs.forEach(backlog => table.push(parseBacklog(backlog)))

  print(table.toString())
}

const renderTasks = (tasks) => {
  const data = tasks.reduce((acc, task) => acc.push(parseTask(task)) && acc, new Table({ head: [' ', 'UID', 'Description'] })).toString()

  print(data)
}
