const { register } = require('../core/command')

register(require('./add'))
register(require('./ls'))
register(require('./rm'))
register(require('./x'))
