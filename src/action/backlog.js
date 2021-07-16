const LOAD_BACKLOGS = Symbol('@TSK/LOAD_BACKLOGS')
const loadBacklogs = backlogs => ({ type: LOAD_BACKLOGS, payload: backlogs })

const CREATE_BACKLOG = Symbol('@TSK/CREATE_BACKLOG')
const createBacklog = (description) => ({ type: CREATE_BACKLOG, payload: description })

const ADD_BACKLOG = Symbol('@TSK/ADD_BACKLOG')
const addBacklog = backlog => ({ type: ADD_BACKLOG, payload: backlog })

const DELETE_BACKLOG = Symbol('@TSK/DELETE_BACKLOG')
const deleteBacklog = identifier => ({ type: DELETE_BACKLOG, payload: identifier })

module.exports = {
  LOAD_BACKLOGS,
  loadBacklogs,
  ADD_BACKLOG,
  addBacklog,
  CREATE_BACKLOG,
  createBacklog,
  DELETE_BACKLOG,
  deleteBacklog,
}
