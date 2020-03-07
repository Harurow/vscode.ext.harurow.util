import datetime from './datetime'
import edit from './edit'
import encoding from './encoding'
import removeLines from './removeLines'
import transformCase from './transformCase'

const cmdTable = [
  ...datetime,
  ...edit,
  ...encoding,
  ...removeLines,
  ...transformCase
]

export default cmdTable
