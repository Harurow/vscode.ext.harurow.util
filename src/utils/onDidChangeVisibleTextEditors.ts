import * as vscode from 'vscode'

export interface VisibleTextEditorsChangeEvent {
  added: vscode.TextEditor[]
  keeping: vscode.TextEditor[]
  removed: vscode.TextEditor[]
}

export const onDidChangeVisibleTextEditors = (listenr: ((e: VisibleTextEditorsChangeEvent) => any), thisArgs?: any, disposables?: vscode.Disposable[]): vscode.Disposable => {
  const lastVisibles = new Set<vscode.TextEditor>()
  vscode.window.visibleTextEditors.forEach((e) => {
    lastVisibles.add(e)
  })

  listenr({ added: vscode.window.visibleTextEditors, removed: [], keeping: [] })

  return vscode.window.onDidChangeVisibleTextEditors((editors) => {
    const added: vscode.TextEditor[] = []
    const keeping: vscode.TextEditor[] = []
    const removed: vscode.TextEditor[] = []

    const visibles = new Set<vscode.TextEditor>()
    const lastVisibleEditors: vscode.TextEditor[] = []
    lastVisibles.forEach((e) => lastVisibleEditors.push(e))

    editors.forEach(editor => {
      visibles.add(editor)

      if (!lastVisibles.has(editor)) {
        added.push(editor)
        lastVisibles.add(editor)
      } else {
        keeping.push(editor)
      }
    })

    lastVisibleEditors.forEach((e) => {
      if (!visibles.has(e)) {
        removed.push(e)
        lastVisibles.delete(e)
      }
    })

    added.forEach((e) => {
      console.log(`added: ${e.document.uri.path}`)
    })
    keeping.forEach((e) => {
      console.log(`keeping: ${e.document.uri.path}`)
    })
    removed.forEach((e) => {
      console.log(`removed: ${e.document.uri.path}`)
    })
    listenr({ added, keeping, removed })
  }, thisArgs, disposables)
}
