const moment = require('moment')

const getRelativeTime = (timestamp) => {
  const now = moment()
  const compare = moment(timestamp, 'x')

  const toTest = [ 'years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds' ]

  const type = toTest.find((type) => (now.diff(compare, type) > 0))
  
  return { duration: now.diff(compare, type), type }
}

const now = () => moment().format('x')

module.exports = {
  getRelativeTime,
  now,
}
