import * as convert from './convert'
import * as insert from './insert'

export const cmdTable =
[
  ...convert.cmdTable,
  ...insert.cmdTable
]
