const LOAD_TODOS = Symbol('@TSK/LOAD_TODOS')
const loadTodos = (context, todos) => ({ type: LOAD_TODOS, payload: {
  context,
  data: todos 
}})

const CREATE_TODO = Symbol('@TSK/CREATE_TODO')
const createTodo = (context, todo) => ({ type: CREATE_TODO, payload: {
  context,
  data: todo,
}})

const ADD_TODO = Symbol('@TSK/ADD_TODO')
const addTodo = (context, todo) => ({ type: ADD_TODO, payload: {
  context,
  data: todo,
}})

const TOGGLE_TODO = Symbol('@TSK/TOGGLE_TODO')
const toggleTodo = (context, identifier) => ({ type: TOGGLE_TODO, payload: {
  context,
  data: identifier,
}})

const DELETE_TODO = Symbol('@TSK/DELETE_TODO')
const deleteTodo = (context, identifier) => ({ type: DELETE_TODO, payload: {
  context,
  data: identifier,
}})

const DELETE_ALL_TODOS = Symbol('@TSK/DELETE_ALL_TODOS')
const deleteAllTodos = (context) => ({ type: DELETE_ALL_TODOS, payload: {
  context,
}})

module.exports = {
  LOAD_TODOS,
  loadTodos,
  CREATE_TODO,
  createTodo,
  ADD_TODO,
  addTodo,
  TOGGLE_TODO,
  toggleTodo,
  DELETE_TODO,
  deleteTodo,
  DELETE_ALL_TODOS,
  deleteAllTodos,
}
