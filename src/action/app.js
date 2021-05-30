const SET_CONTEXT = Symbol('@APP/SET_CONTEXT')
const setContext = context => ({
  type: SET_CONTEXT,
  payload: context,
})

const SET_AUTHOR = Symbol('@APP/SET_AUTHOR')
const setAuthor = author => ({
  type: SET_AUTHOR,
  payload: author,
})

const SET_WORK_DIR = Symbol('@APP/SET_WORK_DIR')
const setWorkDir = workDir => ({
  type: SET_WORK_DIR,
  payload: workDir,
})

module.exports = {
  SET_CONTEXT,
  setContext,
  SET_AUTHOR,
  setAuthor,
  SET_WORK_DIR,
  setWorkDir,
}
