import * as assert from 'assert'
import * as vscode from 'vscode'

import TextEditor from '../utils/textEditor'

suite('extensions swaps', () => {
    test('commands.swaps.swapLr', async () => {
        let editor = await TextEditor.init()

        let command = 'commands.swaps.swapLr'
        let before = 'left = right'
        let after = 'right = left'

        await editor.clearText()
        await editor.setText(before)

        editor.selectAll()
        assert.equal(before, editor.getText())
        editor.execCommand(command)
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                assert.equal(after, editor.getText())
                resolve()
            }, 200)
        })
    })
})
