import * as assert from 'assert'
import * as vscode from 'vscode'

import TextEditor from './textEditor'
import * as $ from '../../src/utils/editor'

suite('extensions tests', () => {
    test('replace', async () => {
        let editor = await TextEditor.initAsync()
        await editor.clearTextAsync()

        await editor.setTextAsync('abc ABC 123')
        assert.equal('abc ABC 123', editor.getText())

        let func = $.getReplaceFunc(str => str.replace('ABC', 'xyz'))
        await func()

        assert.equal('abc xyz 123', editor.getText())
    })
})
