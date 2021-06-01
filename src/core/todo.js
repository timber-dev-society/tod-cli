const buildUidMatcher = uid => new RegExp(uid.replace('#', '^'))

module.exports = {
  buildUidMatcher,
}
