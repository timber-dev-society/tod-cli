const { ADD_BACKLOG, DELETE_BACKLOG } = require("../../action/backlog")
const { ADD_TASK, DELETE_TASK } = require("../../action/task")
const { writeFile } = require("../../core/fs")
const { parseTaskContent } = require("../../core/storage")

module.exports = store => next => action => {
  const { type } = action
  const result = next(action)

  switch (type) {
    case ADD_BACKLOG:
      const { app, backlogs } = store.getState()

      backlogs.forEach(backlog => {
        console.log(backlog)
        if (backlog.isDirty) {
          const [ filename, content ] = parseTaskContent(backlog)
          writeFile(content, `${app.workDir}backlogs/${filename}`)
        }
      });
      break

    case ADD_TASK:
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
