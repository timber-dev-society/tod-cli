const { register } = require('../helper/command')
const { getBaseDir } = require('../helper/fs')

const action = () => {

  return getBaseDir()
}


// register('init')(action)

module.exports = {
  action,
}
