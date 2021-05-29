const { now } = require('../core/time')
const moment = require('moment')
const { createHash } = require('crypto')

const { buildUidMatcher } = require('../core/task')

const { LOAD_BACKLOGS, ADD_BACKLOG, DELETE_BACKLOG } = require('../action/backlog')

const defaultBacklog = {
  uid: undefined,
  description: undefined,
  done: false,
  created: moment(),
  updated: moment(),
}

module.exports = (state = [], { type, payload }) => {
  switch(type) {
    case LOAD_BACKLOGS:
      return payload
  
    case ADD_BACKLOG:
      return [
        ...state,
        {
          ...defaultBacklog,
          uid: createHash('sha1').update(payload + now()).digest('hex'),
          description: payload,
          isDirty: true,
        }
      ]
    
    case DELETE_BACKLOG:
      uidMatcher = buildUidMatcher(payload)
      return state.filter(task => !uidMatcher.test(task.uid))

    default:
      return state
  }
}
