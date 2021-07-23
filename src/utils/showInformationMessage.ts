import * as vscode from 'vscode'

export function showInformationMessage (message: string, ...items: string[]): void {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  vscode.window.showInformationMessage(message, ...items)
}
