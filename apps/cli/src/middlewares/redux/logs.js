const { promises: fs } = require('fs')
const { join } = require('path')
const moment = require('moment')


const { ADD_BACKLOG, CREATE_BACKLOG, DELETE_BACKLOG } = require("../../action/backlog")
const { ADD_TODO, CREATE_TODO, DELETE_ALL_TODOS, DELETE_TODO, TOGGLE_TODO } = require("../../action/todo")

module.exports = store => next => action => {
  const { type } = action

  if ([
    ADD_BACKLOG,
    CREATE_BACKLOG,
    DELETE_BACKLOG,
    ADD_TODO,
    TOGGLE_TODO,
    CREATE_TODO,
    DELETE_TODO,
    DELETE_ALL_TODOS
  ].includes(type)) {
    const fileContent = JSON.stringify({ ...action, type: type.description })
    const filePath = join(
      store.getState().app.workDir,
      'logs',
      moment().utcOffset('+0000').format('x'),
    )
  
    fs.writeFile(filePath, fileContent).catch((reason) => console.log(reason))
  }
  

  return next(action)
}
