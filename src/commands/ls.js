const chalk = require('chalk')

const { getRelativeTime } = require('../core/time')
const { connect } = require('../store')

const command = 'ls'

const parseTask = ({ uid, description, done, created }) => {
  const state = `[${chalk.green(done ? 'x' : ' ')}]`
  const identifier = `#${uid.substring(0, 5)}`
  
  return `${state} ${identifier} ${description}`
}

const parseBacklog = ({ uid, description, created }) => {
  const relativeTime = getRelativeTime(created)

  const age = `${relativeTime.duration}${relativeTime.type.charAt(0)}`
  const identifier = `#${uid.substring(0, 5)}`
  
  return `${age} ${identifier} ${description}`
}

const stateToProps = ({ tasks, backlogs }) => ({
  tasks,
  backlogs,
})

const action = connect(
  stateToProps,
)(() => ({ tasks, backlogs }) => {
  console.log('Backlogs ======')
  backlogs.forEach(backlog => console.log(parseBacklog(backlog)))
  console.log('Tasks =====')
  tasks.forEach(task => console.log(parseTask(task)))
})

module.exports = {
  command,
  action,
}
