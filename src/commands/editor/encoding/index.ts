import * as encoding from './encoding'
import * as decoding from './decoding'

export const cmdTable =
[
  ...encoding.cmdTable,
  ...decoding.cmdTable
]
