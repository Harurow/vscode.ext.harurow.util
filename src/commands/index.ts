import { commands, Disposable } from 'vscode'
import '../utils/string.extension'
import * as editor from './editor'
import * as experiment from './experiment'
import * as explorer from './explorer'
import * as misc from './misc'

const register = commands.registerCommand

const cmdTable = [
  ...editor.cmdTable,
  ...experiment.cmdTable,
  ...explorer.cmdTable,
  ...misc.cmdTable
]

export function registerCommands (): Disposable[] {
  return cmdTable.map(i => register(`harurow.${i.name}`, i.func))
}
