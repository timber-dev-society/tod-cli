const { now } = require('../core/time')
const moment = require('moment')
const { createHash } = require('crypto')

const { buildUidMatcher } = require('../core/todo')

const { LOAD_TODOS, CREATE_TODO, ADD_TODO, TOGGLE_TODO, DELETE_TODO } = require('../action/todo')

const defaultTodo = {
  uid: undefined,
  description: undefined,
  done: false,
  created: moment(),
  updated: moment(),
}

module.exports = (state = {}, { type, payload }) => {
  let uidMatcher

  if (payload === undefined) {
    return state
  }

  const { context, data } = payload

  if (context !== undefined && state[context] === undefined) {
    state[context] = []
  }

  switch(type) {
    case LOAD_TODOS:
      return {
        ...state,
        [context]: data
      }

    case CREATE_TODO:
      return {
        ...state,
        [context]: [
          ...state[context],
          {
            ...defaultTodo,
            uid: createHash('sha1').update(payload + now()).digest('hex'),
            description: data,
            isDirty: true,
          },
        ]
      }
  
    case ADD_TODO:
      return {
        ...state,
        [context]: [
          ...state[context],
          {
            ...defaultTodo,
            ...data,
            isDirty: true,
          },
        ]
      }

    case TOGGLE_TODO:
      uidMatcher = buildUidMatcher(data)
      return {
        ...state,
        [context]: state[context].map(todo => {
          if (uidMatcher.test(todo.uid)) {
            return {
              ...todo, 
              done: !todo.done, 
              updated: moment(),
              isDirty: true,
            }
          }

          return todo
        })
      }
    
    case DELETE_TODO:
      uidMatcher = buildUidMatcher(data)
      return {
        ...state,
        [context]: state[context].map(todo => {
          if (uidMatcher.test(todo.uid)) {
            return {
              ...todo,
              isDeleted: true,
            }
          }

          return todo
        })
      }

    default:
      return state
  }
}
