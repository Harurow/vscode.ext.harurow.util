import * as vscode from 'vscode'
import { TrackerFactory } from './tracker'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let factory: TrackerFactory | null = null

export function activate (context: vscode.ExtensionContext): void {
  // factory = new TrackerFactory()
  // context.subscriptions.push(vscode.debug.registerDebugAdapterTrackerFactory('*', factory))
}

export function deactivate (): void {
  factory = null
}
