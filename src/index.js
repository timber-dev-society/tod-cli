const { parse } = require('./core/command')
const { join } = require('path')
const { readFile, writeFile, readDir, getFileContentFromPath } = require('./core/fs')
const { getCurrentBranchName, getGitUserName, getGitUserEmail } = require('./core/git')

const { store } = require('./store')

const { loadTodos } = require('./action/todo')
const { loadBacklogs } = require('./action/backlog')
const { setContext, setAuthor, setWorkDir } = require('./action/app')
const { parseTodoFile } = require('./core/storage')

const start = async () => {
  // init store
  // const backlogs = await readFile('backlogs')
  // store.dispatch(loadBacklogs(backlogs))

  // const todos = await readFile('todos')
  // store.dispatch(loadTodos(todos))

  const context = await getCurrentBranchName()
  store.dispatch(setContext(context))
 
  const author = `${await getGitUserName()} <${await getGitUserEmail()}>`
  store.dispatch(setAuthor(author))
 
  const workDir = join(process.cwd(), '.tod')
  store.dispatch(setWorkDir(workDir))

  const todoDir = join(workDir, 'todo', context)
  const todo = (await getFileContentFromPath(todoDir)).map(({ fileName, content }) => parseTodoFile(fileName, content))
  store.dispatch(loadTodos(context, todo))

  const backlogDir = join(workDir, 'backlog')
  const backlog = (await getFileContentFromPath(backlogDir)).map(({ fileName, content }) => parseTodoFile(fileName, content))
  store.dispatch(loadBacklogs(backlog))

  // init commandes
 // require('./middlewares')
  require('./commands')

  // parse user input
  parse()

  // save file update
  //await writeFile(store.getState().backlogs, 'backlogs')
  //await writeFile(store.getState().todos, 'todos')
}

start()
