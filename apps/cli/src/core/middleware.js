const COMMANDS = Symbol('COMMANDS_MIDDLEWARE')

const pipelines = {}

const availableMiddlewares = [ COMMANDS ]

const on = (middleware) => {

  if (!availableMiddlewares.includes(middleware)) {
    throw `Unauthorized middleware target ${middleware.toString()}`
  }

  if (pipelines[middleware] === undefined) {
    pipelines[middleware] = []
  }

  return {
    push: (callback) => pipelines[middleware].push(callback),
    execute: (context) => {
      const stack = pipelines[middleware]
      let prevIndex = -1
      const runner = (index) => {
        if (index === prevIndex) {
          throw new Error('next() called multiple times')
        }
        prevIndex = index
        const middleware = stack[index]
        if (middleware) {
          middleware(context, () => {
            return runner(index + 1)
          })
        }
      }

      try {
        runner(0)
      } catch (err) {
        console.log(err)
      }
    },
  }
}

module.exports = {
  COMMANDS,
  on,
}
