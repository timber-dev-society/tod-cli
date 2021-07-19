const { combineReducers } = require('redux')

const app = require('./app-reducer')
const backlogs = require('./backlogs-reducer')
const todos = require('./todos-reducer')

module.exports = combineReducers({
  app,
  backlogs,
  todos,
})
