import * as vscode from 'vscode'

export type editorCommand = (editor: vscode.TextEditor) => any
export type replaceCommand = (str: string) => string
export type forEachCommand = (str: string, i: number) => void

export const regEditor = (name: string, cmd: editorCommand) => {
    let callback = () => {
        let editor = vscode.window.activeTextEditor
        if (!editor) {
            return
        }
        cmd(editor)
    }

    return vscode.commands.registerCommand(name, callback)
}

export const regReplace = (name: string, cmd: replaceCommand) => {
    let callback = () => {
        let editor = vscode.window.activeTextEditor
        if (!editor) {
            return
        }

        let getText = (range?: vscode.Range) => editor.document.getText(range)

        editor.edit(eb => {
            
            let rep = (sel: vscode.Selection) =>
                eb.replace(sel, cmd(getText(sel)))

            editor.selections
                  .forEach(rep)
        })
    }

    return vscode.commands.registerCommand(name, callback)
}

export const regForEach = (name: string, cmd: forEachCommand) => {
    let callback = () => {
        let editor = vscode.window.activeTextEditor
        if (!editor) {
            return
        }

        let getText = (range?: vscode.Range) => editor.document.getText(range)

        editor.selections
                .forEach((sel, i) => cmd(getText(sel), i))
    }

    return vscode.commands.registerCommand(name, callback)
}
