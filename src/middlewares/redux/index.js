const { applyMiddleware } = require('redux')

const logger = require('./logger')

module.exports = applyMiddleware(logger)
