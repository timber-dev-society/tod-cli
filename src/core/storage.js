const path = require('path')
const schemaBuilder = require('./dot/schema')
const types = require('./dot/types')

const parseTodoFile = (fileName, content) => {
  const data = todoSchema.parse(content)

  return {
    ...data,
    uid: path.basename(fileName)
  }
}

const parseTodoContent = (data) => {
  const uid = data.uid
  delete data.uid
  delete data.isDirty

  return [
    uid,
    todoSchema.stringify(data),
  ]
}

module.exports = {
  parseTodoFile,
  parseTodoContent,
}

// Private methods
const todoSchema = schemaBuilder({
  description: types.text,
  author: types.text,
  created: types.date.iso8601,
  updated: types.date.iso8601,
  done: types.bool,
  content: types.text,
})
