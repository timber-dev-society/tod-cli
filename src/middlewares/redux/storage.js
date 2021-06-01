const { ADD_BACKLOG, DELETE_BACKLOG } = require("../../action/backlog")
const { ADD_TODO, DELETE_TODO, CREATE_TODO } = require("../../action/todo")
const { writeFile } = require("../../core/fs")
const { parseTodoContent } = require("../../core/storage")

module.exports = store => next => action => {
  const { type } = action
  const result = next(action)

  switch (type) {
    case ADD_BACKLOG:
      {
        const { app, backlogs } = store.getState()

        backlogs.some(backlog => {
          if (backlog.isDirty) {
            const [ filename, content ] = parseTodoContent(backlog)
            writeFile(content, `${app.workDir}/backlogs/${filename}`)

            return true
          }
        })
      }
      break

    case CREATE_TODO: 
      {
        const { app, todos } = store.getState()

        todos[app.context].some(todo => {
          if (todo.isDirty) {
            const [ filename, content ] = parseTodoContent(todo)
            writeFile(content, `${app.workDir}/todo/${app.context}/${filename}`)

            return true
          }
        })
      }
      break

    case DELETE_BACKLOG:
      break

    case DELETE_TODO:
      break

    default:
      break

  }

  return result
}
