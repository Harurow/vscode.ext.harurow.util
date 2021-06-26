import * as vscode from 'vscode'
import './utils'
import { registerCommands } from './commands'

export function activate (context: vscode.ExtensionContext): void {
  console.log('extension.activate'.toLocalize())
  context.subscriptions.push(...registerCommands())
}

export function deactivate (): void {
  console.log('extension.deactivate'.toLocalize())
}
