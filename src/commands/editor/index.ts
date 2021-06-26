import * as datetime from './datetime'
import * as edit from './edit'
import * as encoding from './encoding'
import * as removeLines from './removeLines'
import * as transformCase from './transformCase'

export const cmdTable = [
  ...datetime.cmdTable,
  ...edit.cmdTable,
  ...encoding.cmdTable,
  ...removeLines.cmdTable,
  ...transformCase.cmdTable
]
