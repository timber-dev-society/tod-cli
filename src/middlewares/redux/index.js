const { applyMiddleware } = require('redux')

let middlewares = []
middlewares.push(require('redux-thunk').default)
middlewares.push(require('./storage'))


if (process.env.NODE_ENV === 'TSK_DEV') {
  middlewares.push(require('./logger'))
}

module.exports = applyMiddleware(...middlewares)
