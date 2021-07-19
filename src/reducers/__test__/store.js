const { createStore } = require('redux')
const rootReducer = require('./../../reducers')

const store = createStore(
  rootReducer,
)

const noop = () => ({})

const connect = (stateToProps = noop, mapDispatchToProps = noop) => (action) => (...props) => (action(...props)({
  ...stateToProps(store.getState()),
  ...mapDispatchToProps(store.dispatch),
}))

module.exports = {
  store,
  connect,
}
