const { parse } = require('./core/command')
const { join } = require('path')
const { readFile, writeFile, readDir } = require('./core/fs')
const { getCurrentBranchName, getGitUserName, getGitUserEmail } = require('./core/git')

const { store } = require('./store')

const { loadTasks } = require('./action/task')
const { loadBacklogs } = require('./action/backlog')
const { setContext, setAuthor, setWorkDir } = require('./action/app')
const { parseTaskFile } = require('./core/storage')

const start = async () => {
  // init store
  // const backlogs = await readFile('backlogs')
  // store.dispatch(loadBacklogs(backlogs))

  // const tasks = await readFile('tasks')
  // store.dispatch(loadTasks(tasks))

  const context = await getCurrentBranchName()
  store.dispatch(setContext(context))
 
  const author = `${await getGitUserName()} <${await getGitUserEmail()}>`
  store.dispatch(setAuthor(author))
 
  const workDir = join(process.cwd(), '.tsk')
  store.dispatch(setWorkDir(workDir))

  const taskDir = join(workDir, 'todo', context)
  const fileNames = await readDir(taskDir)

  let tasks = []
  for (const fileName of fileNames) {
    const task = await readFile(join(taskDir, fileName))
    tasks.push(parseTaskFile(fileName, task))
  }

  store.dispatch(loadTasks(context, tasks))

  // init commandes
  require('./middlewares')
  require('./commands')

  // parse user input
  parse()

  // save file update
  //await writeFile(store.getState().backlogs, 'backlogs')
  //await writeFile(store.getState().tasks, 'tasks')
}

start()
