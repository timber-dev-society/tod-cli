const { now } = require('../core/time')
const { createHash } = require('crypto')

const { LOAD_TASKS, ADD_TASK, TOGGLE_TASK, DELETE_TASK} = require('../action/task')

const defaultTask = {
  uid: undefined,
  description: undefined,
  done: false,
  created: now(),
  updated: now(),
}

module.exports = (state = [], {type, payload}) => {
  let regex

  switch(type) {
    case LOAD_TASKS:
      return payload
  
    case ADD_TASK:
      return [
        ...state,
        {
          ...defaultTask,
          uid: createHash('sha1').update(payload + now()).digest('hex'),
          description: payload,
        }
      ]

    case TOGGLE_TASK:
      regex = RegExp(payload.replace('#', '^'))
      return state.map(task => {
        if (regex.test(task.uid)) {
          const newTask = { 
            ...task, 
            done: !task.done, 
            updated: now() 
          }

          return newTask
        }

        return task
      })
    
    case DELETE_TASK:
      regex = RegExp(payload.replace('#', '^'))
      return state.filter(task => !regex.test(task.uid))

    default:
      return state
  }
}
