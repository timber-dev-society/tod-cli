import { parser } from './parser'
import { stringifier } from './stringifier'

const schemaBuilder = (schema) => {
  let keys = []

  if (schema) {
    keys = Object.keys(schema)
  }

  return {
    parse: parser(schema, keys),
    stringify: stringifier(schema, keys),
    addRule: (key, parse) => schemaBuilder({
      [key]: parse,
      ...schema,
    }),
  }
}

export default schemaBuilder
