const { store } = require('./store')
const { createBacklog } = require('./../../action/backlog')

test('test add todo', () => {
  store.dispatch(createBacklog({ description: 'Test todo', author: 'Jest Tester' }))

  const todos = store.getState().backlogs

  expect(todos.length).toBe(1)
  expect(todos[0].author).toBe('Jest Tester')
  expect(todos[0].description).toBe('Test todo')
})
