import * as vscode from 'vscode'

export const lineNoToRange = (doc: vscode.TextDocument, lineNo: number): vscode.Range => {
  const line = doc.lineAt(lineNo)
  return new vscode.Range(line.range.end, line.range.end)
}
