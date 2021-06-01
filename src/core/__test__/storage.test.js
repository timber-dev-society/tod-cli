const { join } = require('path')
const moment = require('moment')
const { parseTodoFile, parseTodoContent, todoKeyConverter, fileKeyConverter } = require('../storage')

const uid = 'aaaabbbb1212'
const filePath = join(__dirname, uid)
const todoFileContent = `
Created: 2021-05-22 10:11:20 +0200
Author: Some One
Content: 
	My awesome system
	This is a 
	multiline todo !`

test('Should be able to generate a Todo', () => {
  const todo = parseTodoFile(filePath, todoFileContent)

  expect(todo.uid).toBe(uid)
  expect(todo.created.format('X')).toBe(moment('2021-05-22 10:11:20 +0200', 'YYYY-MM-DD hh:mm:ss ZZ').format('X'))
  expect(todo.author).toBe('Some One')

  expect(todo.content).toBe(`My awesome system
This is a 
multiline todo !`)
})

test('Should generate the same result has the file', () => {
  const todo = parseTodoFile(filePath, todoFileContent)
  const [ fileName, fileContent ] = parseTodoContent(todo)

  expect(fileName).toBe(uid)
  expect(fileContent).toBe(todoFileContent)
})

test('Should be able to convert todo key', () => {
  const test1 = 'test'
  expect(todoKeyConverter(test1)).toBe('Test')

  const test2 = 'testString'
  expect(todoKeyConverter(test2)).toBe('Test String')

  const test3 = 'testLongString'
  expect(todoKeyConverter(test3)).toBe('Test Long String')
})

test('Should be able to convert file key', () => {
  const test1 = 'Test'
  expect(fileKeyConverter(test1)).toBe('test')

  const test2 = 'Test String'
  expect(fileKeyConverter(test2)).toBe('testString')

  const test3 = 'Test Long String'
  expect(fileKeyConverter(test3)).toBe('testLongString')
})
