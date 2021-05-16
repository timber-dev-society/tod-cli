const buildUidMatcher = uid => new RegExp(payload.replace('#', '^'))

module.exports = {
  buildUidMatcher,
}
