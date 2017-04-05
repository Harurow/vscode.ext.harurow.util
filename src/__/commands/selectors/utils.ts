import * as vscode from 'vscode'

export const clearSelection = (editor: vscode.TextEditor) => {
    let startLine = getStartLine(editor)
    editor.selection = new vscode.Selection (
        startLine.rangeIncludingLineBreak.start,
        startLine.rangeIncludingLineBreak.start
    )
}

export const getSelections = (editor: vscode.TextEditor, emptyIsAll = true) => {
    let selections: vscode.Selection[] = []

    if (editor.selection.isEmpty) {
        if (emptyIsAll) {
            selections.push(getAllRange(editor))
        }
    } else {
        editor.selections.forEach(sel => selections.push(sel))
    }
    return selections
}

export const getStartLine = (editor: vscode.TextEditor) => editor.document.lineAt(0)

export const getEndLine = (editor: vscode.TextEditor) => editor.document.lineAt(editor.document.lineCount - 1)

export const getAllRange = (editor: vscode.TextEditor) =>
    new vscode.Selection(getStartLine(editor).rangeIncludingLineBreak.start, getEndLine(editor).rangeIncludingLineBreak.end)
