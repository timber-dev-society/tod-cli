module.exports = storeAPI => next => action => {
  console.log('dispatching', action)

  return next(action)
}
