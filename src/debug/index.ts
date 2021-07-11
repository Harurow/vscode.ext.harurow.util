import * as vscode from 'vscode'
import { DebugAdapterTrackerFactory } from './DebugAdapterTrackerFactory'

export function activate (_: vscode.ExtensionContext): void {
  vscode.debug.registerDebugAdapterTrackerFactory('*', new DebugAdapterTrackerFactory())
}

export function deactivate (): void {
  // nop
}
