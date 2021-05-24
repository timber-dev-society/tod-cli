const SET_CONTEXT = Symbol('@APP/SET_CONTEXT')
const setContext = context => ({
  type: SET_CONTEXT,
  payload: context
})

module.exports = {
  SET_CONTEXT,
  setContext,
}
