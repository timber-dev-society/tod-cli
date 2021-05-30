const { join } = require('path')
const moment = require('moment')
const { parseTaskFile, parseTaskContent, taskKeyConverter, fileKeyConverter } = require('../storage')

const uid = 'aaaabbbb1212'
const filePath = join(__dirname, uid)
const taskFileContent = `
Created: 2021-05-22 10:11:20 +0200
Author: Some One
Content: 
	My awesome system
	This is a 
	multiline task !`

test('Should be able to generate a Task', () => {
  const task = parseTaskFile(filePath, taskFileContent)

  expect(task.uid).toBe(uid)
  expect(task.created.format('X')).toBe(moment('2021-05-22 10:11:20 +0200', 'YYYY-MM-DD hh:mm:ss ZZ').format('X'))
  expect(task.author).toBe('Some One')

  expect(task.content).toBe(`My awesome system
This is a 
multiline task !`)
})

test('Should generate the same result has the file', () => {
  const task = parseTaskFile(filePath, taskFileContent)
  const [ fileName, fileContent ] = parseTaskContent(task)

  expect(fileName).toBe(uid)
  expect(fileContent).toBe(taskFileContent)
})

test('Should be able to convert task key', () => {
  const test1 = 'test'
  expect(taskKeyConverter(test1)).toBe('Test')

  const test2 = 'testString'
  expect(taskKeyConverter(test2)).toBe('Test String')

  const test3 = 'testLongString'
  expect(taskKeyConverter(test3)).toBe('Test Long String')
})

test('Should be able to convert file key', () => {
  const test1 = 'Test'
  expect(fileKeyConverter(test1)).toBe('test')

  const test2 = 'Test String'
  expect(fileKeyConverter(test2)).toBe('testString')

  const test3 = 'Test Long String'
  expect(fileKeyConverter(test3)).toBe('testLongString')
})
