const SET_CONTEXT = Symbol('@APP/SET_CONTEXT')
const setContext = context => ({
  type: SET_CONTEXT,
  payload: context,
})

const SET_WORK_DIR = Symbool('@APP/SET_WORK_DIR')
const setWorkDir = workDir => ({
  type: SET_WORK_DIR,
  payload: setWorkDir,
})

module.exports = {
  SET_CONTEXT,
  setContext,
  SET_WORK_DIR,
  setWorkDir,
}
