const { now } = require('../core/time')
const moment = require('moment')
const { createHash } = require('crypto')

const { buildUidMatcher } = require('../core/task')

const { LOAD_TASKS, CREATE_TASK, ADD_TASK, TOGGLE_TASK, DELETE_TASK } = require('../action/task')

const defaultTask = {
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
    case LOAD_TASKS:
      return {
        ...state,
        [context]: data
      }

    case CREATE_TASK:
      return {
        ...state,
        [context]: [
          ...state[context],
          {
            ...defaultTask,
            uid: createHash('sha1').update(payload + now()).digest('hex'),
            description: data,
            isDirty: true,
          },
        ]
      }
  
    case ADD_TASK:
      return {
        ...state,
        [context]: [
          ...state[context],
          {
            ...defaultTask,
            ...data,
            isDirty: true,
          },
        ]
      }

    case TOGGLE_TASK:
      uidMatcher = buildUidMatcher(data)
      return {
        ...state,
        [context]: state[context].map(task => {
          if (uidMatcher.test(task.uid)) {
            return {
              ...task, 
              done: !task.done, 
              updated: now() 
            }
          }

          return task
        })
      }
    
    case DELETE_TASK:
      uidMatcher = buildUidMatcher(data)
      return {
        ...state,
        [context]: state[context].filter(task => !uidMatcher.test(task.uid))
      }

    default:
      return state
  }
}
