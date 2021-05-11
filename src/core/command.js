const { Command } = require('commander')
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

const register = ({ command, action }) => tsk.command(command).action(applyMiddleware(action))

const parse = () => tsk.parse(process.argv)

module.exports = {
  register,
  parse,
}
