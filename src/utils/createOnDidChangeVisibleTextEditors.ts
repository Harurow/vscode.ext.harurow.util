import * as vscode from 'vscode'

export const createOnDidChangeVisibleTextEditors = (visibles: Set<vscode.TextEditor>, visibleCallback: ((editor: vscode.TextEditor) => void)): ((visibleTextEditors: vscode.TextEditor[]) => void) => {
  return (visibleTextEditors: vscode.TextEditor[]): void => {
    const newVisibles = new Set<vscode.TextEditor>()

    visibleTextEditors.forEach(editor => {
      if (!visibles.has(editor)) {
        visibleCallback(editor)
        visibles.add(editor)
      }
      newVisibles.add(editor)
    })

    const removedTextEditors: vscode.TextEditor[] = []
    visibles.forEach((editor) => {
      if (!newVisibles.has(editor)) {
        removedTextEditors.push(editor)
      }
    })

    removedTextEditors.forEach(visibles.delete)
  }
}
