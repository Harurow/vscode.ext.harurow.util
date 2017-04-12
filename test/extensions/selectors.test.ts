import * as assert from 'assert'
import * as vscode from 'vscode'

import TextEditor from '../utils/textEditor'

suite('extensions selectors', () => {
    test('commands.selectors.substring', async () => {
        let editor = await TextEditor.init()

        let command = 'commands.selectors.substring'
        let before = ''
        let after = ''
        await editor.clearText()
        await editor.setText(before)
        assert.equal(before, editor.getText())
        editor.execCommand(command)
            .then(_ => assert.equal(after, editor.getText()))
    })

    test('commands.selectors.pattern', async () => {
        let editor = await TextEditor.init()

        let command = 'commands.selectors.pattern'
        let before = ''
        let after = ''
        await editor.clearText()
        await editor.setText(before)
        assert.equal(before, editor.getText())
        editor.execCommand(command)
            .then(_ => assert.equal(after, editor.getText()))
    })

    test('commands.selectors.patternIgnoreCase', async () => {
        let editor = await TextEditor.init()

        let command = 'commands.selectors.patternIgnoreCase'
        let before = ''
        let after = ''
        await editor.clearText()
        await editor.setText(before)
        assert.equal(before, editor.getText())
        editor.execCommand(command)
            .then(_ => assert.equal(after, editor.getText()))
    })
})
