import * as assert from 'assert'
import * as vscode from 'vscode'

export default class TextEditor {
    editor: vscode.TextEditor

    constructor(editor: vscode.TextEditor) {
        this.editor = editor
    }

    getAllSelection = () =>
        new vscode.Selection(0, 0, this.editor.document.lineCount - 1, Number.MAX_VALUE)

    selectAll = () =>
        this.editor.selection = this.getAllSelection()

    getText = () =>
        this.editor.document.getText(this.editor.selection)

    setText = (str: string) =>
        new Promise<void>((resolve, reject) => {
            this.editor.edit(eb => eb.replace(this.editor.selection, str))
                .then(_ => {
                    resolve()
                })
        })

    clearText = () =>
        this.replaceAll('')

    replaceAll = (text: string) =>
        new Promise<void>((resolve, reject) => {
            this.editor.edit(async eb => {
                this.selectAll()
                await this.setText(text)
                resolve()
            })
        })

    execCommand = (command: string) =>
        new Promise<void>((resolve, reject) => {
            vscode.commands.executeCommand(command)
                .then(_ => resolve(), f => reject(f))
        })

    static init = () =>
        new Promise<TextEditor>(async (resolve, reject) => {
            let textEditor = vscode.window.activeTextEditor
            if (!textEditor) {
                let doc = await vscode.workspace.openTextDocument(null)
                textEditor = await vscode.window.showTextDocument(doc)
            }
            resolve(new TextEditor(textEditor))
       })
}
