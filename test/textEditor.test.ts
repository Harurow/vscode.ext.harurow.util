import * as assert from 'assert'
import * as vscode from 'vscode'

import TextEditor from './textEditor'

suite('TextEditor tests', async () => {
    test('init', async () => {
        let editor = await TextEditor.initAsync()
        await editor.clearTextAsync()

        assert.equal(false, editor.editor === null)
        assert.equal(false, editor.editor === undefined)

        editor.selectAll()
        await editor.setTextAsync('abc xyz')
        assert.equal('abc xyz', editor.getText())
    })
})
