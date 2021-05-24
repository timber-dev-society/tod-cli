const path = require('path')
const moment = require('moment')

const DATE_FORMAT = 'YYYY-MM-DD hh:mm:ss ZZ'

const parseTaskFile = (fileName, content) => {

  return content.split('\n')
                .reduce(parseLine, [])
                .reduce(createTaskObject, {
                  uid: path.basename(fileName)
                })
}

const parseTaskContent = (content) => {
  const data = Object.keys(content)
                     .filter(key => key !== 'uid')
                     .map(key => {
                      let value
                      if (key === 'created') {
                        value = content[key].format(DATE_FORMAT)
                      } else {
                        value = content[key].split('\n')
                      }
      
                      return {
                        key: taskKeyConverter(key),
                        value: value.length === 1 ? value[0] : value,
                      }
                    }).reduce((acc, { key, value }) => {
                      acc += `\n${key}: ${typeof value === 'string' ? value : `\n\t${value.join('\n\t')}`}`

                      return acc
                    }, '')


  return [
    content.uid,
    data,
  ]
}

const taskKeyConverter = key => key.replace(/([A-Z])/g, ' $1').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

const fileKeyConverter = key => key.split(' ').map((word, index) => index === 0 ? word.toLowerCase() : word).join('')

module.exports = {
  parseTaskFile,
  parseTaskContent,
  taskKeyConverter,
  fileKeyConverter,
}

// Private methods
let currentKey


const parseLine = (acc, line) => {
  // line is empty
  if (line.trim() === '') {
    return acc
  }

  // is multi line value
  if (/\t/.test(line)) {
    if (typeof acc[currentKey].value === 'string') {
      acc[currentKey].value = []
    }

    acc[currentKey].value.push(line.replace(/\t/, ''))

    return acc
  }

  // line key value
  const [ key, ...value ] = line.split(':')

  currentKey = acc.length
  acc.push({
    key,
    value: value.join(':').trim(),
  })

  return acc
}

const createTaskObject = (acc, data) => {
  const key = data.key.toLowerCase()

  if (typeof data.value !== 'string') {
    acc[key] = data.value.join('\n')

    return acc
  }
  
  if (key === 'created') {
    acc[key] = moment(data.value, DATE_FORMAT)

    return acc
  }

  acc[key] = data.value

  return acc
}
