import * as convertDate from './convertDate'
import * as dictionary from './dictionary'
import * as distinct from './distinct'
import * as evaluateExpression from './evaluateExpression'
import * as insertDate from './insertDate'
import * as numbering from './numbering'
import * as removeLines from './removeLines'
import * as swap from './swap'
import * as transCase from './transCase'

export const cmdTable = [
  ...convertDate.cmdTable,
  ...dictionary.cmdTable,
  ...distinct.cmdTable,
  ...evaluateExpression.cmdTable,
  ...insertDate.cmdTable,
  ...numbering.cmdTable,
  ...removeLines.cmdTable,
  ...swap.cmdTable,
  ...transCase.cmdTable,
]
