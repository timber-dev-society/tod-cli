const { register } = require('../helper/command')

register(require('./add'))
register(require('./ls'))
register(require('./rm'))
register(require('./x'))
