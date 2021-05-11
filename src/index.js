const { parse } = require('./core/command')
const { readFile, writeFile } = require('./core/fs')
const { store } = require('./store')
const { loadTasks } = require('./action/task')

const start = async () => {
  // init store
  const tasks = await readFile('tasks')
  
  store.dispatch(loadTasks(tasks))

  // init commandes
  require('./middlewares')
  require('./commands')

  // parse user input
  parse()

  // save file update
  await writeFile(store.getState().tasks, 'tasks')
}

start()
