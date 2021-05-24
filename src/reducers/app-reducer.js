const { SET_CONTEXT, SET_WORK_DIR } = require('../action/app')

const defaultState = {
  context: 'main',
  workDir: '',
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
    default:
      return state
  }
}
