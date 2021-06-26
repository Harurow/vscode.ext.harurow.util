import * as vscode from 'vscode'

export function install (context: vscode.ExtensionContext): void {
  let activeTextEditor: vscode.TextEditor | undefined

  vscode.window.onDidChangeActiveTextEditor((e) => {
    activeTextEditor = e
    console.log('active text editor is changed.')
  }, null, context.subscriptions)

  vscode.workspace.onDidChangeTextDocument((e) => {
    if (activeTextEditor != null && activeTextEditor.document === e.document) {
      console.log('document is changed.')
    }
  }, null, context.subscriptions)
}

export function uninstall (): void {
  // nop
}
