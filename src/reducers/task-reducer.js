const { now } = require('../helper/time')
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
      return state.map(task => {
        if (RegExp(payload).test(task.uid)) {
          return { 
            ...task, 
            done: !task.done, 
            updated: now() 
          }
        }

        return task
      })
    
    case DELETE_TASK:
      return state.filter(task => !RegExp(payload).test(task.uid))

    default:
      return state
  }
}
