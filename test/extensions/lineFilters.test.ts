import * as assert from 'assert'
import * as vscode from 'vscode'

import TextEditor from '../utils/textEditor'

suite('extensions lineFilters', () => {
    test('commands.lineFilters', async () => {
        let command = 'commands.lineFilters.match'

        let editor = await TextEditor.initAsync()
        await editor.clearTextAsync()

        //await editor.execCommandAsync(command)

/*
        TextEditor.initAsync()
            .then(editor => {
                editor.clearTextAsync()
                    .then(() => {

                    })
            })

        editor
            .execCommandAsync(command)
            .then( _ => assert.equal('HOGE', editor.getText()),
                 reason => {
                     assert.equal(false, false)
                 })
                 */
    })

    test('commands.lineFilters.match', async () => {
        let editor = await TextEditor.initAsync()

        let command = 'commands.lineFilters.match'
        let before = ''
        let after = ''
        await editor.clearTextAsync()
        await editor.setTextAsync(before)
        assert.equal(before, editor.getText())
        //await editor.execCommandAsync(command)
        assert.equal(after, editor.getText())
    })

    test('commands.lineFilters.unmatch', async () => {
        let editor = await TextEditor.initAsync()

        let command = 'commands.lineFilters.unmatch'
        let before = ''
        let after = ''
        await editor.clearTextAsync()
        await editor.setTextAsync(before)
        assert.equal(before, editor.getText())
        //await editor.execCommandAsync(command)
        assert.equal(after, editor.getText())
    })

    test('commands.lineFilters.contains', async () => {
        let editor = await TextEditor.initAsync()

        let command = 'commands.lineFilters.contains'
        let before = ''
        let after = ''
        await editor.clearTextAsync()
        await editor.setTextAsync(before)
        assert.equal(before, editor.getText())
        //await editor.execCommandAsync(command)
        assert.equal(after, editor.getText())
    })

    test('commands.lineFilters.notContains', async () => {
        let editor = await TextEditor.initAsync()

        let command = 'commands.lineFilters.notContains'
        let before = ''
        let after = ''
        await editor.clearTextAsync()
        await editor.setTextAsync(before)
        assert.equal(before, editor.getText())
        //await editor.execCommandAsync(command)
        assert.equal(after, editor.getText())
    })
})
