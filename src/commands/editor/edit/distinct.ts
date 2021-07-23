import * as vscode from 'vscode'
import { enumTargetLines } from '../../../utils'

export const distinct = async (): Promise<void> => {
  const editor = vscode.window.activeTextEditor
  if (editor == null) {
    return
  }

  await editor.edit((eb) => {
    const removeLines: number[] = []
    const set = new Set<string>()

    for (const line of enumTargetLines(editor)) {
      if (set.has(line.text)) {
        removeLines.push(line.lineNumber)
      } else {
        set.add(line.text)
      }
    }

    removeLines.reverse().forEach((i) => {
      eb.delete(editor.document.lineAt(i).rangeIncludingLineBreak)
    })
  })
}

export const cmdTable = [
  { name: 'edit.distinct', func: distinct },
]
