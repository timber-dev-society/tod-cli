const { now } = require('../core/time')
const moment = require('moment')
const { createHash } = require('crypto')

const { buildUidMatcher } = require('../core/todo')

const { LOAD_BACKLOGS, CREATE_BACKLOG, ADD_BACKLOG, DELETE_BACKLOG } = require('../action/backlog')

const defaultBacklog = {
  uid: undefined,
  description: undefined,
  author: undefined,
  done: false,
  created: moment(),
  updated: moment(),
  isDirty: true,
}

module.exports = (state = [], { type, payload }) => {
  switch(type) {
    case LOAD_BACKLOGS:
      return payload

    case CREATE_BACKLOG:
      payload.uid = createHash('sha1').update(payload + now()).digest('hex')
    case ADD_BACKLOG:
      return [
        ...state,
        {
          ...defaultBacklog,
          ...payload,
        }
      ]
    
    case DELETE_BACKLOG:
      uidMatcher = buildUidMatcher(payload)
      return state.filter(todo => !uidMatcher.test(todo.uid))

    default:
      return state
  }
}
