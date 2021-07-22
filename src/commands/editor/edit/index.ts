import * as evaluateExpression from './evaluateExpression'
import * as convertDate from './convertDate'
import * as dictionary from './dictionary'
import * as distinct from './distinct'
import * as insertDate from './insertDate'
import * as numbering from './numbering'
import * as swap from './swap'

export const cmdTable = [
  ...evaluateExpression.cmdTable,
  ...convertDate.cmdTable,
  ...dictionary.cmdTable,
  ...distinct.cmdTable,
  ...insertDate.cmdTable,
  ...numbering.cmdTable,
  ...swap.cmdTable
]
