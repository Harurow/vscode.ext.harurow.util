import * as vscode from 'vscode'
import { WhiteSpaceRender } from './whiteSpaceRender'

export function activate (context: vscode.ExtensionContext): void {
  // eslint-disable-next-line no-new
  new WhiteSpaceRender(context)
}

export function deactivate (): void {
  /* nop */
}
