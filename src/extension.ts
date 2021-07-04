import * as vscode from 'vscode'
import './utils'
import { registerCommands } from './commands'
import * as renders from './renders'
import * as debuggers from './debuggers'

export function activate (context: vscode.ExtensionContext): void {
  console.log('extension.activate'.toLocalize())
  context.subscriptions.push(...registerCommands())
  renders.activate(context)
  debuggers.activate(context)
}

export function deactivate (): void {
  console.log('extension.deactivate'.toLocalize())
  renders.deactivate()
  debuggers.deactivate()
}
