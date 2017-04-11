import * as assert from 'assert'
import * as vscode from 'vscode'

import TextEditor from '../utils/textEditor'

suite('extensions swaps', () => {
    test('commands.swaps.swapLr', async () => {
        let editor = await TextEditor.initAsync()

        let command = 'commands.swaps.swapLr'
        let before = 'left = right'
        let after = 'right = left'
        console.log("0")
        await editor.clearTextAsync()
        await editor.setTextAsync(before)
        assert.equal(before, editor.getText())
        console.log("1")
        vscode.commands.executeCommand(command)
            .then(_ => {
                console.log("3")
                assert.equal(after, editor.getText())
            })
        console.log("2")
        for (let i = 0; i < 10000; i++) {
            console.log(editor.getText())
        }
    })
})
