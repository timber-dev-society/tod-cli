const LOAD_TASKS = Symbol('@TSK/LOAD_TASKS')
const loadTasks = tasks => ({ type: LOAD_TASKS, payload: tasks })

const ADD_TASK = Symbol('@TSK/ADD_TASK')
const addTask = (context, task) => ({ type: ADD_TASK, payload: {
  context,
  data: task,
}})

const TOGGLE_TASK = Symbol('@TSK/TOGGLE_TASK')
const toggleTask = (context, identifier) => ({ type: TOGGLE_TASK, payload: {
  context,
  data: identifier,
}})

const DELETE_TASK = Symbol('@TSK/DELETE_TASK')
const deleteTask = (context, identifier) => ({ type: DELETE_TASK, payload: {
  context,
  data: identifier,
}})

module.exports = {
  LOAD_TASKS,
  loadTasks,
  ADD_TASK,
  addTask,
  TOGGLE_TASK,
  toggleTask,
  DELETE_TASK,
  deleteTask,
}
