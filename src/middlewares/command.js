const { accessSync } = require('fs')

const { COMMANDS, on } = require('../core/middleware')
const { getBaseDir } = require('../core/fs')


on(COMMANDS).push((command, next) => {

  try {
    if (command[command.length - 1]._name !== 'init') {
       accessSync(getBaseDir())
    }
    next()
  } catch (err) {
    throw err
  }

})
