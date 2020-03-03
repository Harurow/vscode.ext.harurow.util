import datetime from './datetime'
import edit from './edit'
import encoding from './encoding'
import removeLines from './removeLines'
import select from './select'
import transformCase from './transformCase'

const cmdTable = [
  ...datetime,
  ...edit,
  ...encoding,
  ...removeLines,
  ...select,
  ...transformCase
]

export default cmdTable
