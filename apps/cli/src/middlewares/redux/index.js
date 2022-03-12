const { applyMiddleware } = require('redux')

let middlewares = []
middlewares.push(require('redux-thunk').default)
middlewares.push(require('./storage'))
middlewares.push(require('./logs'))


if (process.env.NODE_ENV === 'TSK_DEV') {
  middlewares.push(require('./dev-logger'))
}

module.exports = applyMiddleware(...middlewares)
