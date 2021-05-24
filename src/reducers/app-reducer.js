const { SET_CONTEXT } = require('../action/app')

const defaultState = {
  context: 'main',
}

module.exports = (state = defaultState, { type, payload }) => {

  switch(type) {
    case SET_CONTEXT:
      return {
        ...state,
        context: payload,
      }
    default:
      return state
  }
}
