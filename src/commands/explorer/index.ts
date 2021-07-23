import * as autoReveal from './autoReveal'
import * as fileExclude from './fileExclude'
import * as generateDts from './generateDts'

export const cmdTable = [
  ...autoReveal.cmdTable,
  ...fileExclude.cmdTable,
  ...generateDts.cmdTable,
]
