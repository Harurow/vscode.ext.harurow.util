import * as vscode from 'vscode'

export const getTextEditorOrThrowIfNotExistsTextEditor = () =>
    new Promise<vscode.TextEditor>((resolve, reject) => {
        try {
            let editor = vscode.window.activeTextEditor
            if (!editor) {
                reject(undefined)
            } else {
                resolve(editor)
            }
        } catch (error) {
            // suppress
        }
    })

export const showWarningIfHasNoMultiCursors = (message: string = 'Has no multiple cursors.') =>
    new Promise<vscode.TextEditor>((resolve, reject) => {
        try {
            let editor = vscode.window.activeTextEditor
            if (!editor) {
                reject(undefined)
            } else if (!editor.selections || editor.selections.length < 2) {
                reject(message)
            } else {
                resolve(editor)
            }
        } catch (error) {
            // suppress
        }
    })

export const showWarningIfHasNoSelection = (message: string = 'Must be select target range.') =>
    new Promise<vscode.TextEditor>((resolve, reject) => {
        try {
            let editor = vscode.window.activeTextEditor
            if (!editor) {
                reject(undefined)
            } else if (editor.selection.isEmpty) {
                vscode.window.showWarningMessage(message)
                reject(message)
            } else {
                resolve(editor)
            }
        } catch (error) {
            // surpress
        }
    })

export const getNormalizedLineSelection = (selection: vscode.Selection) =>
    new vscode.Selection(
        selection.anchor.line, 0,
        getNormalizedActiveLine(selection), Number.MAX_VALUE)

export const getReplaceFunc = (replacer: (str: string) => string) =>
    () => new Promise<Thenable<boolean>>((resolve, reject) => {
        try {
            let editor = vscode.window.activeTextEditor
            if (!editor) {
                reject(undefined)
            } else {
                let getText = (range?: vscode.Range) =>
                    editor.document.getText(range)

                return editor.edit(eb => {
                    let replace = (sel: vscode.Selection) =>
                        eb.replace(sel, replacer(getText(sel)))

                    editor.selections
                        .forEach(replace)
                })
            }
        } catch (error) {
            // suppress
        }
    })

export const getWholeFunc = (func: () => any) =>
    () => {
        func()
    }

export const execFunc = (func: () => any) =>
    () => func()

export interface InputBoxOptionsEx extends vscode.InputBoxOptions {
    emptyMessage: string
}

export const showInputBox = (options: vscode.InputBoxOptions | InputBoxOptionsEx) =>
    new Promise<string>((resolve, reject) => {
        vscode.window.showInputBox(options)
            .then(input => {
                try {
                    if (input === undefined) {
                        reject(undefined)
                        return
                    }
                    if (!input) {
                        let op = options as InputBoxOptionsEx
                        if (op && op.emptyMessage) {
                            vscode.window.showWarningMessage(op.emptyMessage)
                            reject(op.emptyMessage)
                            return
                        }
                    }
                    resolve(input)
                } catch (error) {
                    // surppress
                }
            })
    })


const getNormalizedActiveLine = (selection: vscode.Selection) =>
    (selection.anchor.line < selection.active.line && selection.active.character === 0)
        ? selection.active.line - 1
        : selection.active.line
