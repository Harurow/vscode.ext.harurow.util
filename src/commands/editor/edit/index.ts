import * as calc from './calc'
import * as dictionary from './dictionary'
import * as distinct from './distinct'
import * as numbering from './numbering'
import * as swap from './swap'

export const cmdTable = [
  ...calc.cmdTable,
  ...dictionary.cmdTable,
  ...distinct.cmdTable,
  ...numbering.cmdTable,
  ...swap.cmdTable
]
