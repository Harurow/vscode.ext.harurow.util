import * as vscode from 'vscode'

export const getVisibleRanges = (editor: vscode.TextEditor): vscode.Range[] => {
  return editor.visibleRanges.map((r) => new vscode.Range(
    r.start.line > 0
      ? new vscode.Position(r.start.line - 1, 0)
      : r.start,
    r.end.line < editor.document.lineCount - 1
      ? editor.document.lineAt(r.end.line + 1).range.end
      : r.end)
  )
}
