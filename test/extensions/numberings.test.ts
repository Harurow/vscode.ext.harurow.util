import * as assert from 'assert'
import * as vscode from 'vscode'

import TextEditor from '../utils/textEditor'

suite('extensions numberings', () => {
    test('commands.numberings.numbering', async () => {
        let editor = await TextEditor.init()

        let command = 'commands.numberings.numbering'
        let before = ''
        let after = ''
        await editor.clearText()
        await editor.setText(before)
        assert.equal(before, editor.getText())
        //await editor.execCommandAsync(command)
        assert.equal(after, editor.getText())
    })
})
