import * as vscode from 'vscode'

export const emptyDisposable: vscode.Disposable = {
  dispose: () => { /* nop */ }
}
