const { Command, description } = require('commander')
const { version } = require('../../package.json')
const { COMMANDS, on } = require('./middleware')

const tsk = new Command()

tsk.version(version)

const applyMiddleware = (action) => {
  const pipeline = on(COMMANDS)

  return (...context) => {
    pipeline.execute(context)

    action(...context)
  }
}

const register = ({ command, action, options }) => {
  const cmd = tsk.command(command)

  if (options !== undefined && options.length !== 0) {
    options.forEach(({ option, description }) =>  cmd.option(option, description))
  }

  cmd.action(applyMiddleware(action))
}

const parse = () => tsk.parse(process.argv)

module.exports = {
  register,
  parse,
}
