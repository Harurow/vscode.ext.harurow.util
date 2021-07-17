import * as vscode from 'vscode'
import { getVisibleRanges } from './getVisibleRanges'

export const enumTargetLines = function * (editor: vscode.TextEditor): IterableIterator<vscode.TextLine> {
  const doc = editor.document

  if (editor.selection.isEmpty) {
    for (let i = 0; i < doc.lineCount; i++) {
      yield doc.lineAt(i)
    }
    return
  }

  const selections = copySortRanges(editor.selections)

  let lastLineNumber: number = -1
  for (let i = 0; i < selections.length; i++) {
    const sel = selections[i]
    for (let j = sel.start.line; j <= sel.end.line; j++) {
      if (j > lastLineNumber) {
        yield doc.lineAt(j)
        lastLineNumber = j
      }
    }
  }
}

export const enumTargetVisibleLines = function * (editor: vscode.TextEditor): IterableIterator<vscode.TextLine> {
  const doc = editor.document
  const visibleRanges = copySortRanges(getVisibleRanges(editor))

  if (editor.selection.isEmpty) {
    let lastLineNumber: number = -1
    for (let i = 0; i < visibleRanges.length; i++) {
      const sel = visibleRanges[i]
      for (let j = sel.start.line; j <= sel.end.line; j++) {
        if (j > lastLineNumber) {
          yield doc.lineAt(j)
          lastLineNumber = j
        }
      }
    }
    return
  }

  const selections = copySortRanges(editor.selections)

  let lastLineNumber: number = -1
  for (let i = 0; i < selections.length; i++) {
    const sel = visibleRanges[0].intersection(selections[i])
    if (sel != null) {
      for (let j = sel.start.line; j <= sel.end.line; j++) {
        if (j > lastLineNumber) {
          yield doc.lineAt(j)
          lastLineNumber = j
        }
      }
    }
  }
}

const copySortRanges = <T extends vscode.Range>(ranges: T[]): T[] => {
  const copy = [...ranges]
  copy.sort((a, b) => a.start.line === b.start.line
    ? a.start.character - b.start.character
    : a.start.line - b.start.line)
  return copy
}
