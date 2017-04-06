import * as vscode from 'vscode'

export const getTextEditorOrThrowIfNotExistsTextEditor = () => {
    let editor = vscode.window.activeTextEditor
    if (!editor) {
        throw undefined
    }
    return editor
}

export const showWarningIfHasNoMultiCursorsAsync = async (message: string = 'Has no multiple cursors.') => {
    let editor = vscode.window.activeTextEditor
    if (!editor) {
        throw undefined
    }

    if (!editor.selections || editor.selections.length < 2) {
        await vscode.window.showWarningMessage(message)
        throw message
    }

    return editor
}

export const showWarningIfHasNoSelectionAsync = async (message: string = 'Must be select target range.') => {
    let editor = vscode.window.activeTextEditor
    if (!editor) {
        throw undefined
    }

    if (editor.selection.isEmpty) {
        await vscode.window.showWarningMessage(message)
        throw message
    }

    return editor
}

export const getNormalizedLineSelection = (selection: vscode.Selection) =>
    new vscode.Selection(
        selection.anchor.line, 0,
        getNormalizedActiveLine(selection), Number.MAX_VALUE)

export const getReplaceFunc = (replacer: (str: string) => string) =>
    () => {
        let editor = vscode.window.activeTextEditor
        if (!editor) {
            return
        }

        let getText = (range?: vscode.Range) =>
            editor.document.getText(range)

        editor.edit(eb => {
            let replace = (sel: vscode.Selection) =>
                eb.replace(sel, replacer(getText(sel)))

            editor.selections
                  .forEach(replace)
        })
    }

export const getWholeFunc = (func: () => any) =>
    () => {
        func()
    }

export interface InputBoxOptionsEx extends vscode.InputBoxOptions {
    emptyMessage: string
}

export const showInputBoxAsync = async (options: vscode.InputBoxOptions | InputBoxOptionsEx) => {
    let input = await vscode.window.showInputBox(options)
    if (input === undefined) {
        throw undefined
    }
    if (!input) {
        let op = options as InputBoxOptionsEx
        if (op && op.emptyMessage) {
            vscode.window.showWarningMessage(op.emptyMessage)
            throw op.emptyMessage
        }
    }
    return input
}

const getNormalizedActiveLine = (selection: vscode.Selection) =>
    (selection.anchor.line < selection.active.line && selection.active.character === 0)
        ? selection.active.line - 1
        : selection.active.line
