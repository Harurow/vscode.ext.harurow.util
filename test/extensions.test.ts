import * as assert from 'assert'
import * as vscode from 'vscode'

import * as $ from '../src/__/extensions'

const getEditorSelectAll = (editor: vscode.TextEditor) => 
    new vscode.Selection(0, 0, editor.document.lineCount-1, 1)

const setEditorText = (editor: vscode.TextEditor, str: string) =>
    editor.edit(eb => eb.replace(getEditorSelectAll(editor), str))
        .then(() => editor.selection = getEditorSelectAll(editor))

const getTextEditor = (): Thenable<vscode.TextEditor> =>
    new Promise((res, rej) => {
        let editor = vscode.window.activeTextEditor
        if (editor) {
            res(editor)
            return
        }
        vscode.workspace.openTextDocument(null)
            .then(doc => vscode.window.showTextDocument(doc)
                        .then(editor => res(editor), r => rej(r)),
                  r => rej(r))
    })

const getEditorText = (editor: vscode.TextEditor) =>
    editor.document.getText()

const setSelectAll = (editor: vscode.TextEditor) =>
    editor.selection = getEditorSelectAll(editor)

suite("extensions tests", () => {
    test("replace", (done) => {

    getTextEditor()
        .then(async (editor) => {

            assert.equal(false, editor === null)
            assert.equal(false, editor === undefined)

            let setText = async (str: string) => await setEditorText(editor, str)
            let getText = () => getEditorText(editor)

            await setText("abc ABC 123")
            assert.equal("abc ABC 123", getText())
            
            $.replace(str => str.replace('ABC', 'xyz'))
            assert.equal("abc xyz 123", getText())

            done()
        }, res => {
            test("replace failed", () => assert(false, res))
        })
    })
})
