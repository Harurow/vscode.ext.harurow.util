import * as vscode from 'vscode'

type createOnDidChangeStateResult = {
  status: 'ok'
  editor: vscode.TextEditor
  onDidChangeState: () => void
  dispose: () => void
} | {
  status: 'ng'
}

export const createOnDidChangeState = (
  converter: (editor: vscode.TextEditor, range: vscode.Range, index: number) => string | undefined,
  decoOptions?: vscode.DecorationRenderOptions
): createOnDidChangeStateResult => {
  const editor = vscode.window.activeTextEditor

  if (editor == null) {
    return { status: 'ng' }
  }

  const deco = vscode.window.createTextEditorDecorationType(decoOptions ?? {
    after: {
      color: new vscode.ThemeColor('editor.foreground'),
      backgroundColor: new vscode.ThemeColor('editor.findMatchBackground')
    }
  })

  const dispose = (): void => {
    editor.setDecorations(deco, [])
    deco.dispose()
  }

  const onDidChangeState = (): void => {
    const options = editor
      .selections
      .map((s: vscode.Selection, i: number) => ({
        range: s,
        renderOptions: {
          after: {
            contentText: converter(editor, s, i)
          }
        }
      }))
      .filter((e) => e.renderOptions.after.contentText != null)

    editor.setDecorations(deco, options)
  }

  onDidChangeState.dispose = dispose

  return {
    status: 'ok',
    editor: editor,
    onDidChangeState: onDidChangeState,
    dispose: dispose
  }
}
