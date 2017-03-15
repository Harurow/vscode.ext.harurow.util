import * as assert from 'assert'
import * as vscode from 'vscode'

import TextEditor from './textEditor'

suite('TextEditor tests', async () => {
    test('init', async () => {
        let editor = await TextEditor.initAsync()
        await editor.clearTextAsync()

        assert.equal(false, editor.editor == null)

        editor.selectAll()
        await editor.setTextAsync('abc xyz')
        assert.equal('abc xyz', editor.getText())
    })

/*
    test('newline', async () => {
        let editor = await TextEditor.initAsync()
        await editor.clearTextAsync()

        editor.selectAll()
        await editor.setTextAsync('abc\r\nxyz')
        assert.equal('abc\nxyz', editor.getText())

        editor.selectAll()
        await editor.setTextAsync('abc\nxyz')
        assert.equal('abc\nxyz', editor.getText())

        editor.selectAll()
        await editor.setTextAsync('abc\rxyz')
        assert.equal('abc\nxyz', editor.getText())
    })
*/
})
