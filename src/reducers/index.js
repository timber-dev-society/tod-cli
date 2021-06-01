const { combineReducers } = require('redux')

const app = require('./app-reducer')
const backlogs = require('./backlog-reducer')
const todos = require('./todo-reducer')

module.exports = combineReducers({
  app,
  backlogs,
  todos,
})
