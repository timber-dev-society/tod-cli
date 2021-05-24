const { combineReducers } = require('redux')

const app = require('./app-reducer')
const backlogs = require('./backlog-reducer')
const tasks = require('./task-reducer')

module.exports = combineReducers({
  app,
  backlogs,
  tasks,
})
