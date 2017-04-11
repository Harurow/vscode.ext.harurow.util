import * as assert from 'assert'
import * as vscode from 'vscode'

import TextEditor from '../utils/textEditor'

suite('extensions swaps', () => {
    test('commands.swaps.swapLr', async () => {
        let editor = await TextEditor.init()

        let command = 'commands.swaps.swapLr'
        let before = 'left = right'
        let after = 'right = left'
        console.log('0')
        await editor.clearText()
        await editor.setText(before)
        assert.equal(before, editor.getText())
        console.log('1')

        vscode.commands.executeCommand(command)
            .then(_ => {
                console.log('3')
                assert.equal(after, editor.getText())
            }, reason => {
                console.log('4')
            })

        console.log('2')
    })
})

suite('extensions swaps', () => {
    test('test', done => {
        assert.equal(true, true)



        done()
    })
})
