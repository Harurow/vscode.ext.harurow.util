import * as fileExclude from './fileExclude'
import * as generateDts from './generateDts'

export const cmdTable = [
  ...fileExclude.cmdTable,
  ...generateDts.cmdTable
]
