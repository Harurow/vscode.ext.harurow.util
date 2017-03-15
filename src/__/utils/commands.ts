import * as vscode from 'vscode'

export const regEditor = (name: string, cmd: (editor: vscode.TextEditor) => any) => {
    let callback = () => {
        let editor = vscode.window.activeTextEditor
        if (!editor) {
            return
        }
        cmd(editor)
    }

    return vscode.commands.registerCommand(name, callback)
}

export const regReplace = (name: string, cmd: (str: string) => string) => {
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

export const regForEach = (name: string, cmd: (str: string, i: number) => void) => {
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
