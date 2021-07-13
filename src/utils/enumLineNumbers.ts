import * as vscode from 'vscode'

export const enumLineNumbers = function * (): IterableIterator<number> {
  const editor = vscode.window.activeTextEditor
  if (editor == null) {
    return
  }

  const doc = editor.document

  if (editor.selection.isEmpty) {
    for (let lineNo = 0; lineNo < doc.lineCount; lineNo++) {
      yield lineNo
    }
  } else {
    const lineNumbers = []

    for (let selNo = 0; selNo < editor.selections.length; selNo++) {
      const sel = editor.selections[selNo]
      for (let lineNo = sel.start.line; lineNo <= sel.end.line; lineNo++) {
        lineNumbers.push(lineNo)
      }
    }

    lineNumbers.sort((a, b) => a - b)

    let last: number = lineNumbers[0]
    yield last

    for (let i = 1; i < lineNumbers.length; i++) {
      const lineNo = lineNumbers[i]
      if (last !== lineNo) {
        yield lineNo
        last = lineNo
      }
    }
  }
}
