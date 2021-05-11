const chalk = require('chalk')

const { getRelativeTime } = require('../core/time')
const { connect } = require('../store')

const command = 'ls'

const parseTask = ({ uid, description, done, created }) => {
  const relativeTime = getRelativeTime(created)

  const age = `${relativeTime.duration}${relativeTime.type.charAt(0)}`
  const state = `[${chalk.green(done ? 'x' : ' ')}]`
  const identifier = `#${uid.substring(0, 5)}`
  
  return `${state} ${age} ${identifier} ${description}`
}

const stateToProps = ({ tasks }) => ({
  tasks,
})

const action = connect(
  stateToProps,
)(() => ({ tasks }) => tasks.forEach(task => console.log(parseTask(task))))

module.exports = {
  command,
  action,
}
