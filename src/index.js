const { parse } = require('./helper/command')
const { readFile, writeFile } = require('./helper/loader')
const { store } = require('./store')
const { loadTasks } = require('./action/task')

const start = async () => {
  // init store
  const tasks = await readFile('tasks')
  
  store.dispatch(loadTasks(tasks))

  // init commandes
  require('./commands')

  // parse user input
  parse()

  // save file update
  await writeFile(store.getState().tasks, 'tasks')
}

start()
