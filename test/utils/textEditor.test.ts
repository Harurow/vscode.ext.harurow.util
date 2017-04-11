import * as assert from 'assert'
import * as vscode from 'vscode'

import TextEditor from './textEditor'

suite('TextEditor tests', () => {
    test('init', async () => {
        let editor = await TextEditor.init()
        await editor.clearText()

        assert.equal(false, editor.editor == null)

        editor.selectAll()
        await editor.setText('abc xyz')
        assert.equal('abc xyz', editor.getText())
        await editor.clearText()
    })
})
