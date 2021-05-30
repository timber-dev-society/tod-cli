const { ADD_BACKLOG, DELETE_BACKLOG } = require("../../action/backlog")
const { ADD_TASK, DELETE_TASK, CREATE_TASK } = require("../../action/task")
const { writeFile } = require("../../core/fs")
const { parseTaskContent } = require("../../core/storage")

module.exports = store => next => action => {
  const { type } = action
  const result = next(action)

  switch (type) {
    case ADD_BACKLOG:
      {
        const { app, backlogs } = store.getState()

        backlogs.some(backlog => {
          if (backlog.isDirty) {
            const [ filename, content ] = parseTaskContent(backlog)
            writeFile(content, `${app.workDir}/backlogs/${filename}`)

            return true
          }
        })
      }
      break

    case CREATE_TASK: 
      {
        const { app, tasks } = store.getState()

        tasks[app.context].some(task => {
          if (task.isDirty) {
            const [ filename, content ] = parseTaskContent(task)
            writeFile(content, `${app.workDir}/todo/${app.context}/${filename}`)

            return true
          }
        })
      }
      break

    case DELETE_BACKLOG:
      break

    case DELETE_TASK:
      break

    default:
      break

  }

  return result
}
