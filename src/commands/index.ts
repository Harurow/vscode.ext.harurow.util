import { commands, Disposable } from 'vscode'
import '../utils/string.extension'
import editor from './editor'
import experiment from './experiment'
import explorer from './explorer'
import misc from './misc'

const register = commands.registerCommand

const cmdTable = [
  ...editor,
  ...experiment,
  ...explorer,
  ...misc
]

export function registerCommands (): Disposable[] {
  return cmdTable.map(i => register(`harurow.${i.name}`, i.func))
}
