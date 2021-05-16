const { combineReducers } = require('redux')

const tasks = require('./task-reducer')
const backlogs = require('./backlog-reducer')

module.exports = combineReducers({
  tasks,
  backlogs,
})
