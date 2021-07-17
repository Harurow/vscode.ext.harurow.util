import * as vscode from 'vscode'
import { onDidChangeVisibleTextEditors } from '.'

export const createRender = <T extends { dispose(): any }>(
  createResouce: ((editor: vscode.TextEditor) => T),
  setDecorations: ((editor: vscode.TextEditor, resource: T) => any),
  sections?: string[]
): vscode.Disposable => {
  const resources = new Map<vscode.TextEditor, T>()

  const redraw = (editor: vscode.TextEditor): void => {
    const res = resources.get(editor)
    if (res != null) {
      setDecorations(editor, res)
    }
  }

  const disposables = [
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (sections == null || sections.length === 0) {
        return
      }
      vscode.window.visibleTextEditors.forEach((editor) => {
        if (sections.some((section) => e.affectsConfiguration(section, editor.document))) {
          resources.get(editor)?.dispose()
          resources.set(editor, createResouce(editor))
          redraw(editor)
        }
      })
    }),
    vscode.workspace.onDidChangeTextDocument((e) => {
      vscode.window.visibleTextEditors.forEach((editor) => {
        if (e.document === editor.document) {
          redraw(editor)
        }
      })
    }),
    onDidChangeVisibleTextEditors((e) => {
      e.added.forEach((editor) => {
        const res = createResouce(editor)
        resources.set(editor, res)
        setDecorations(editor, res)
      })
      e.removed.forEach((editor) => {
        resources.get(editor)?.dispose()
        resources.delete(editor)
      })
    }),
    vscode.window.onDidChangeTextEditorVisibleRanges((e) => {
      redraw(e.textEditor)
    })
  ]
  return {
    dispose: (): void => {
      disposables.forEach((d) => d.dispose())
      disposables.length = 0
    }
  }
}
