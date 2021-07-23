import * as vscode from 'vscode'
import { enumTargetVisibleLines } from '.'

type CreateOnDidChangeStateResult = {
  status: 'ok'
  editor: vscode.TextEditor
  onDidChangeState: () => void
  dispose: () => void
} | {
  status: 'ng'
}

export const createRemoveLinesDecorationRenderOptions = (): vscode.DecorationRenderOptions => ({
  isWholeLine: true,
  backgroundColor: new vscode.ThemeColor('diffEditor.removedTextBackground')
})

export const createReplaceDecorationRenderOptions = (): vscode.DecorationRenderOptions => ({
  textDecoration: 'line-through',
  backgroundColor: new vscode.ThemeColor('diffEditor.removedTextBackground'),
  after: {
    color: new vscode.ThemeColor('editor.foreground'),
    backgroundColor: new vscode.ThemeColor('diffEditor.insertedTextBackground')
  }
})

export const createOnDidChangeState = (options: {
  converter: (editor: vscode.TextEditor, range: vscode.Range, index: number) => string | undefined
  decorationRenderOptions?: vscode.DecorationRenderOptions
}): CreateOnDidChangeStateResult => {
  const editor = vscode.window.activeTextEditor

  if (editor == null) {
    return { status: 'ng' }
  }

  const { converter, decorationRenderOptions } = options

  const decoOptions = decorationRenderOptions ??
    createReplaceDecorationRenderOptions()
  const deco = vscode.window.createTextEditorDecorationType(decoOptions)

  const disposables: vscode.Disposable[] = [
    deco
  ]

  const dispose = (): void => {
    editor.setDecorations(deco, [])
    disposables.forEach((d) => d.dispose())
    disposables.length = 0
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

  return {
    status: 'ok',
    editor: editor,
    onDidChangeState: onDidChangeState,
    dispose: dispose
  }
}

type CreateOnDidChangeTextEditorVisibleRanges =
{
  status: 'ok'
  editor: vscode.TextEditor
  redraw: () => void
  dispose: () => void
} | {
  status: 'ng'
}

export const createOnDidChangeTextEditorVisibleRanges = (options: {
  getRangesOrOptions: ((iterator: IterableIterator<vscode.TextLine>) => readonly vscode.Range[] | readonly vscode.DecorationOptions[])
  decorationRenderOptions?: vscode.DecorationRenderOptions
}): CreateOnDidChangeTextEditorVisibleRanges => {
  const editor = vscode.window.activeTextEditor

  if (editor == null) {
    return { status: 'ng' }
  }

  const { getRangesOrOptions, decorationRenderOptions } = options

  const decoOptions = decorationRenderOptions ?? {
    backgroundColor: new vscode.ThemeColor('editor.findMatchHighlightBackground')
  }
  const deco = vscode.window.createTextEditorDecorationType(decoOptions)

  const redraw = (): void => {
    const rangesOrOptions = getRangesOrOptions(enumTargetVisibleLines(editor))
    editor.setDecorations(deco, rangesOrOptions)
  }

  const disposables: vscode.Disposable[] = [
    vscode.window.onDidChangeTextEditorVisibleRanges((e) => {
      if (editor === e.textEditor) {
        redraw()
      }
    })
  ]

  const dispose = (): void => {
    disposables.forEach((d) => d.dispose())
    disposables.length = 0
    editor.setDecorations(deco, [])
    deco.dispose()
  }

  return {
    status: 'ok',
    editor,
    redraw,
    dispose
  }
}
