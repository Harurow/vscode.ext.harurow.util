import * as vscode from 'vscode'

export const showWarningIfHasNoSelection = async (warn: string = 'Must be select target range.') => {
    let editor = vscode.window.activeTextEditor
    if (!editor) {
        return <vscode.TextEditor>null
    }

    if (editor.selection.isEmpty) {
        await vscode.window.showWarningMessage(warn)
        return <vscode.TextEditor>null
    }

    return editor
}

export const showWarningIfHasNoInputAsync = async (input: string, warn: string = 'Must be input text.') => {
    if (input === undefined) {
        return false;
    } else if (!input) {
        vscode.window.showWarningMessage(warn)
        return false;
    }
    return true;
}

const getNormalizedActiveLine = (selection: vscode.Selection) =>
    (selection.anchor.line < selection.active.line && selection.active.character == 0)
        ? selection.active.line - 1
        : selection.active.line

export const getNormalizedLineSelection = (selection: vscode.Selection) =>
    new vscode.Selection(
        selection.anchor.line, 0,
        getNormalizedActiveLine(selection), Number.MAX_VALUE)

export const getReplaceFunc = (replacer: (str: string) => string) =>
    async () => {
        let editor = vscode.window.activeTextEditor
        if (!editor) {
            return
        }

        let getText = (range?: vscode.Range) => editor.document.getText(range)

        await editor.edit(eb => {
            let replace = (sel: vscode.Selection) =>
                eb.replace(sel, replacer(getText(sel)))

            editor.selections
                  .forEach(replace)
        })
    }

export const getForEachFunc = (each: (str: string, index: number) => void) =>
    () => {
        let editor = vscode.window.activeTextEditor
        if (!editor) {
            return
        }

        let getText = (range?: vscode.Range) => editor.document.getText(range)

        editor.selections
              .forEach((sel, i) => each(getText(sel), i))
    }
