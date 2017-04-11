import * as assert from 'assert'
import * as vscode from 'vscode'

import TextEditor from '../utils/textEditor'

suite('extensions escapes', () => {
    test('commands.escapes.escapeHtml', async () => {
        let editor = await TextEditor.initAsync()

        let command = 'commands.escapes.escapeHtml'
        let before = ''
        let after = ''
        await editor.clearTextAsync()
        await editor.setTextAsync(before)
        assert.equal(before, editor.getText())
        editor
            .execCommandAsync(command)
            .then( _ => assert.equal(after, editor.getText()))
    })

    test('commands.escapes.escapeHtmlAll', async () => {
        let editor = await TextEditor.initAsync()

        let command = 'commands.escapes.escapeHtmlAll'
        let before = ''
        let after = ''
        await editor.clearTextAsync()
        await editor.setTextAsync(before)
        assert.equal(before, editor.getText())
        editor
            .execCommandAsync(command)
            .then( _ => assert.equal(after, editor.getText()))
    })

    test('commands.escapes.unescapeHtml', async () => {
        let editor = await TextEditor.initAsync()

        let command = 'commands.escapes.unescapeHtml'
        let before = ''
        let after = ''
        await editor.clearTextAsync()
        await editor.setTextAsync(before)
        assert.equal(before, editor.getText())
        editor
            .execCommandAsync(command)
            .then( _ => assert.equal(after, editor.getText()))
    })

    test('commands.escapes.escapeUnicode', async () => {
        let editor = await TextEditor.initAsync()

        let command = 'commands.escapes.escapeUnicode'
        let before = ''
        let after = ''
        await editor.clearTextAsync()
        await editor.setTextAsync(before)
        assert.equal(before, editor.getText())
        editor
            .execCommandAsync(command)
            .then( _ => assert.equal(after, editor.getText()))
    })

    test('commands.escapes.escapeUnicodeAll', async () => {
        let editor = await TextEditor.initAsync()

        let command = 'commands.escapes.escapeUnicodeAll'
        let before = ''
        let after = ''
        await editor.clearTextAsync()
        await editor.setTextAsync(before)
        assert.equal(before, editor.getText())
        editor
            .execCommandAsync(command)
            .then( _ => assert.equal(after, editor.getText()))
    })

    test('commands.escapes.unescapeUnicode', async () => {
        let editor = await TextEditor.initAsync()

        let command = 'commands.escapes.unescapeUnicode'
        let before = ''
        let after = ''
        await editor.clearTextAsync()
        await editor.setTextAsync(before)
        assert.equal(before, editor.getText())
        editor
            .execCommandAsync(command)
            .then( _ => assert.equal(after, editor.getText()))
    })
})
