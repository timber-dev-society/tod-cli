const { store } = require('./store')
const { createTodo } = require('./../../action/todo')

test('test add todo', () => {
  store.dispatch(createTodo('main', { description: 'Test todo', author: 'Jest Tester' }))

  const todos = store.getState().todos

  expect(todos.main).toBeDefined()
  expect(todos.main[0].author).toBe('Jest Tester')
  expect(todos.main[0].description).toBe('Test todo')
})
