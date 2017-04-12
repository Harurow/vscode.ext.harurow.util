import * as assert from 'assert'
import * as vscode from 'vscode'

import TextEditor from './textEditor'

suite('TextEditor tests', () => {
    test('init', async () => {
        let editor = await TextEditor.init()
        assert.equal(false, editor.editor === null)

        await editor.clearText()

        await editor.replaceTextAll('abc xyz')
        assert.equal('abc xyz', editor.getTextAll())

        await editor.clearText()
    })
})
