import * as assert from 'assert'
import * as vscode from 'vscode'

import * as $ from '../src/__/extensions'

export default class TextEditor {
    editor: vscode.TextEditor

    constructor(editor: vscode.TextEditor) {
        this.editor = editor
    }

    getAllSelection = () =>
        new vscode.Selection(0, 0, this.editor.document.lineCount -1, 100000)

    selectAll = () =>
        this.editor.selection = this.getAllSelection()

    getText = () =>
        this.editor.document.getText(this.editor.selection)

    setTextAsync = (str: string) =>
        this.editor.edit(eb => eb.replace(this.editor.selection, str))
    
    clearTextAsync = async () => {
        this.selectAll()
        await this.setTextAsync('')
        this.selectAll()
    }

    static initAsync = () =>
        new Promise<TextEditor>(async (resolve, reject) => {
            let editor = vscode.window.activeTextEditor
            if (editor) {
                resolve(new TextEditor(editor))
            } else {
                let doc = await vscode.workspace.openTextDocument(null)
                resolve(new TextEditor(await vscode.window.showTextDocument(doc)))
            }
        })
}
