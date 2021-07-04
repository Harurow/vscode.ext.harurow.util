import * as vscode from 'vscode'
import { WhiteSpaceRender } from './whiteSpaceRender'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let whiteSpaceRender: WhiteSpaceRender | null = null

export function activate (context: vscode.ExtensionContext): void {
  whiteSpaceRender = new WhiteSpaceRender(context)
}

export function deactivate (): void {
  // nop
  whiteSpaceRender = null
}
