const { applyMiddleware } = require('redux')
const thunk = require('redux-thunk').default

const logger = require('./logger')
const storage = require('./storage')

module.exports = applyMiddleware(
  thunk,
  logger,
  storage,
)
