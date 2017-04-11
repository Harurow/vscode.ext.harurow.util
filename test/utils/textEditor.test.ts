import * as assert from 'assert'
import * as vscode from 'vscode'

import TextEditor from './textEditor'

suite('TextEditor tests', () => {
    test('init', async () => {
        let editor = await TextEditor.initAsync()
        await editor.clearTextAsync()

        assert.equal(false, editor.editor == null)

        editor.selectAll()
        await editor.setTextAsync('abc xyz')
        assert.equal('abc xyz', editor.getText())
    })
})
