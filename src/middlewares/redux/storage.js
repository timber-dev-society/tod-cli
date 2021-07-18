const { join } = require('path')
const { promises: fs } = require('fs')

const { ADD_BACKLOG, CREATE_BACKLOG, DELETE_BACKLOG } = require("../../action/backlog")
const { ADD_TODO, CREATE_TODO, DELETE_ALL_TODOS, DELETE_TODO, TOGGLE_TODO } = require("../../action/todo")
const { writeFile } = require("../../core/fs")
const { parseTodoContent } = require("../../core/storage")

module.exports = store => next => action => {
  const { type } = action
  const result = next(action)

  switch (type) {

    case ADD_BACKLOG:
    case CREATE_BACKLOG: 
      {
        const { app, backlogs } = store.getState()
        const path = getBacklogPath(app)

        backlogs[app.context].some(({ isDirty, ...backlog }) => (isDirty && storeContent(path, backlog)))
      }
      break
    
    case DELETE_BACKLOG:
      {
        const { app, backlogs } = store.getState()
        const path = getBacklogPath(app)
        
        backlogs.some(({ isDeleted, uid }) => (isDeleted && remove(path, uid)))
      }
      break
  

    case ADD_TODO:
    case TOGGLE_TODO:
    case CREATE_TODO: 
      {
        const { app, todos } = store.getState()
        const path = getTodoPath(app)

        todos[app.context].some(({ isDirty, ...todo }) => (isDirty && storeContent(path, todo)))
      }
      break

    case DELETE_TODO:
      {
        const { app, todos } = store.getState()
        const path = getTodoPath(app)
        
        todos[app.context].some(({ isDeleted, uid }) => (isDeleted && remove(path, uid)))
      }
      break

    case DELETE_ALL_TODOS:
      {
        const { app } = store.getState()

        fs.rmdir(getTodoPath(app))
      }
      break

    default:
      break

  }

  return result
}

const storeContent = (path, data) => {
  const [ filename, content ] = parseTodoContent(data)
  const filepath = join(path, filename)

  writeFile(content, filepath).catch(async () => {
    await fs.mkdir(path)
    writeFile(content, filepath)
  })

  return true
}

const remove = (path, uid) => {
  const filepath = join(path, uid)

  fs.rm(filepath)

  return true;
}

const getTodoPath = ({ workDir, context }) => join(workDir, 'todo', context)

const getBacklogPath = ({ workDir }) => join(workDir, 'backlog')
