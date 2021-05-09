

const LOAD_TASKS = Symbol('@TSK/LOAD_TASKS')
const loadTasks = tasks => ({type: LOAD_TASKS, payload: tasks})

const ADD_TASK = Symbol('@TSK/ADD_TASK')
const addTask = description => ({type: ADD_TASK, payload: description })

const TOGGLE_TASK = Symbol('@TSK/TOGGLE_TASK')
const toggleTask = identifier => ({type: TOGGLE_TASK, payload: identifier})

const DELETE_TASK = Symbol('@TSK/DELETE_TASK')
const deleteTask = identifier => ({type: DELETE_TASK, payload: identifier})

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
