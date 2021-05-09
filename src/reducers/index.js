const { combineReducers } = require('redux')

const tasks = require('./task-reducer')

module.exports = combineReducers({
  tasks,
})
