const { Command } = require('commander')
const package = require('../../package.json')

const tsk = new Command()

tsk.version(package.version)

const register = (command) => (action) => tsk.command(command).action(action)

const parse = () => tsk.parse(process.argv)

module.exports = {
  register,
  parse,
}
