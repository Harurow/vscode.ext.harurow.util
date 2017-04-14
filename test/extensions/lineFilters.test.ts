import * as assert from 'assert'
import * as vscode from 'vscode'

import TextEditor from '../utils/textEditor'

suite('extensions lineFilters', () => {

    test('commands.lineFilters.match', async () => {
        let editor = await TextEditor.init()

        let command = 'commands.lineFilters.match'
        let before = ''
        let after = ''
        await editor.clearText()
        await editor.setText(before)
        assert.equal(before, editor.getText())
        // editor.execCommand(command)
        //     .then(_ => assert.equal(after, editor.getText()))
    })

    test('commands.lineFilters.unmatch', async () => {
        let editor = await TextEditor.init()

        let command = 'commands.lineFilters.unmatch'
        let before = ''
        let after = ''
        await editor.clearText()
        await editor.setText(before)
        assert.equal(before, editor.getText())
        // editor.execCommand(command)
        //     .then(_ => assert.equal(after, editor.getText()))
    })

    test('commands.lineFilters.contains', async () => {
        let editor = await TextEditor.init()

        let command = 'commands.lineFilters.contains'
        let before = ''
        let after = ''
        await editor.clearText()
        await editor.setText(before)
        assert.equal(before, editor.getText())
        // editor.execCommand(command)
        //     .then(_ => assert.equal(after, editor.getText()))
    })

    test('commands.lineFilters.notContains', async () => {
        let editor = await TextEditor.init()

        let command = 'commands.lineFilters.notContains'
        let before = ''
        let after = ''
        await editor.clearText()
        await editor.setText(before)
        assert.equal(before, editor.getText())
        // editor.execCommand(command)
        //     .then(_ => assert.equal(after, editor.getText()))
    })
})
