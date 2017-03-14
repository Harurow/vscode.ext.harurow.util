import * as assert from 'assert'
import * as vscode from 'vscode'

import TextEditor from './textEditor'
import * as $ from '../src/__/extensions'

suite("extensions tests", () => {
    test('replace', async () => {
        let editor = await TextEditor.initAsync()
        await editor.clearTextAsync()

        await editor.setTextAsync("abc ABC 123")
        assert.equal("abc ABC 123", editor.getText())
        
        await $.replaceAsync(str => str.replace('ABC', 'xyz'))
        assert.equal("abc xyz 123", editor.getText())
    })
})
