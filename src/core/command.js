const { Command } = require('commander')
const { version } = require('../../package.json')
const { COMMANDS, on } = require('./middleware')

const tod = new Command()

tod.version(version)

const applyMiddleware = (action) => {
  const pipeline = on(COMMANDS)

  return (...context) => {
    pipeline.execute(context)

    action(...context)
  }
}

const register = ({ command, action, options }) => {
  const cmd = tod.command(command)

  if (options !== undefined && options.length !== 0) {
    options.forEach(({ option, description }) =>  cmd.option(option, description))
  }

  cmd.action(applyMiddleware(action))
}

const parse = () => tod.parse(process.argv)

module.exports = {
  register,
  parse,
}
