const LOAD_BACKLOGS = Symbol('@TSK/LOAD_BACKLOGS')
const loadBacklogs = backlogs => ({type: LOAD_BACKLOGS, payload: backlogs})

const ADD_BACKLOG = Symbol('@TSK/ADD_BACKLOG')
const addBacklog = description => ({type: ADD_BACKLOG, payload: description })

const DELETE_BACKLOG = Symbol('@TSK/DELETE_BACKLOG')
const deleteBacklog = identifier => ({type: DELETE_BACKLOG, payload: identifier})

module.exports = {
  LOAD_BACKLOGS,
  loadBacklogs,
  ADD_BACKLOG,
  addBacklog,
  DELETE_BACKLOG,
  deleteBacklog,
}
