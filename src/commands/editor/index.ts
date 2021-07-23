import * as edit from './edit'
import * as encoding from './encoding'
import * as selection from './selection'

export const cmdTable = [
  ...edit.cmdTable,
  ...encoding.cmdTable,
  ...selection.cmdTable,
]
