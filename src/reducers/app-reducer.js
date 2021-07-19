const { SET_CONTEXT, SET_WORK_DIR, SET_AUTHOR } = require('../action/app')

const defaultState = {
  context: 'main',
  workDir: '',
  author: '',
}

module.exports = (state = defaultState, { type, payload }) => {

  switch(type) {
    case SET_CONTEXT:
      return {
        ...state,
        context: payload,
      }
    case SET_WORK_DIR:
      return {
        ...state,
        workDir: payload,
      }
    case SET_AUTHOR:
      return {
        ...state,
        author: payload,
      }
    default:
      return state
  }
}
