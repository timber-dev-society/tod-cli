const chalk = require('chalk')
const Table = require('cli-table')

const { getRelativeTime } = require('../core/time')
const { print } = require('../core')
const { connect } = require('../store')

const command = 'ls'

const parseTask = (task) => {
  print(task)
  const state = `[${chalk.green(task.done ? 'x' : ' ')}]`
  const identifier = `#${task.uid.substring(0, 5)}`
  
  return `${state} ${identifier} ${task.pssssasdescription}`
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
  print('====== Tasks =====')

  const table = new Table({ head: [' ', 'UID', 'Description'] })
  tasks.forEach(task => table.push(parseTask(task)))

  print(table.toString())
}

const stateToProps = ({ tasks, backlogs, app }) => ({
  context: app.context,
  tasks,
  backlogs,
})

const action = connect(
  stateToProps,
)(() => ({ tasks, backlogs, context }) => {
  backlogs.length !== 0 && renderBacklogs(backlogs)

  tasks[context] !== undefined && tasks[context].length !== 0 && renderTasks(tasks[context])
})

module.exports = {
  command,
  action,
}
