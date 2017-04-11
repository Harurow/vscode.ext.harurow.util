import * as assert from 'assert'
import * as vscode from 'vscode'

import TextEditor from '../utils/textEditor'

suite('extensions encodings', () => {
    test('commands.encodings.encodeRfc1866EucJp', async () => {
        let editor = await TextEditor.init()

        let command = 'commands.encodings.encodeRfc1866EucJp'
        let before = ''
        let after = ''
        await editor.clearText()
        await editor.setText(before)
        assert.equal(before, editor.getText())
        editor
            .execCommand(command)
            .then( _ => assert.equal(after, editor.getText()))
    })

    test('commands.encodings.encodeRfc1866ShiftJis', async () => {
        let editor = await TextEditor.init()

        let command = 'commands.encodings.encodeRfc1866ShiftJis'
        let before = ''
        let after = ''
        await editor.clearText()
        await editor.setText(before)
        assert.equal(before, editor.getText())
        editor
            .execCommand(command)
            .then( _ => assert.equal(after, editor.getText()))
    })

    test('commands.encodings.encodeRfc1866Utf8', async () => {
        let editor = await TextEditor.init()

        let command = 'commands.encodings.encodeRfc1866Utf8'
        let before = ''
        let after = ''
        await editor.clearText()
        await editor.setText(before)
        assert.equal(before, editor.getText())
        editor
            .execCommand(command)
            .then( _ => assert.equal(after, editor.getText()))
    })

    test('commands.encodings.encodeRfc3986EucJp', async () => {
        let editor = await TextEditor.init()

        let command = 'commands.encodings.encodeRfc3986EucJp'
        let before = ''
        let after = ''
        await editor.clearText()
        await editor.setText(before)
        assert.equal(before, editor.getText())
        editor
            .execCommand(command)
            .then( _ => assert.equal(after, editor.getText()))
    })

    test('commands.encodings.encodeRfc3986ShiftJis', async () => {
        let editor = await TextEditor.init()

        let command = 'commands.encodings.encodeRfc3986ShiftJis'
        let before = ''
        let after = ''
        await editor.clearText()
        await editor.setText(before)
        assert.equal(before, editor.getText())
        editor
            .execCommand(command)
            .then( _ => assert.equal(after, editor.getText()))
    })

    test('commands.encodings.encodeRfc3986Utf8', async () => {
        let editor = await TextEditor.init()

        let command = 'commands.encodings.encodeRfc3986Utf8'
        let before = ''
        let after = ''
        await editor.clearText()
        await editor.setText(before)
        assert.equal(before, editor.getText())
        editor
            .execCommand(command)
            .then( _ => assert.equal(after, editor.getText()))
    })

    test('commands.encodings.decodeRfc1866EucJp', async () => {
        let editor = await TextEditor.init()

        let command = 'commands.encodings.decodeRfc1866EucJp'
        let before = ''
        let after = ''
        await editor.clearText()
        await editor.setText(before)
        assert.equal(before, editor.getText())
        editor
            .execCommand(command)
            .then( _ => assert.equal(after, editor.getText()))
    })

    test('commands.encodings.decodeRfc1866ShiftJis', async () => {
        let editor = await TextEditor.init()

        let command = 'commands.encodings.decodeRfc1866ShiftJis'
        let before = ''
        let after = ''
        await editor.clearText()
        await editor.setText(before)
        assert.equal(before, editor.getText())
        editor
            .execCommand(command)
            .then( _ => assert.equal(after, editor.getText()))
    })

    test('commands.encodings.decodeRfc1866Utf8', async () => {
        let editor = await TextEditor.init()

        let command = 'commands.encodings.decodeRfc1866Utf8'
        let before = ''
        let after = ''
        await editor.clearText()
        await editor.setText(before)
        assert.equal(before, editor.getText())
        editor
            .execCommand(command)
            .then( _ => assert.equal(after, editor.getText()))
    })


    test('commands.encodings.decodeRfc3986EucJp', async () => {
        let editor = await TextEditor.init()

        let command = 'commands.encodings.decodeRfc3986EucJp'
        let before = ''
        let after = ''
        await editor.clearText()
        await editor.setText(before)
        assert.equal(before, editor.getText())
        editor
            .execCommand(command)
            .then( _ => assert.equal(after, editor.getText()))
    })

    test('commands.encodings.decodeRfc3986ShiftJis', async () => {
        let editor = await TextEditor.init()

        let command = 'commands.encodings.decodeRfc3986ShiftJis'
        let before = ''
        let after = ''
        await editor.clearText()
        await editor.setText(before)
        assert.equal(before, editor.getText())
        editor
            .execCommand(command)
            .then( _ => assert.equal(after, editor.getText()))
    })

    test('commands.encodings.decodeRfc3986Utf8', async () => {
        let editor = await TextEditor.init()

        let command = 'commands.encodings.decodeRfc3986Utf8'
        let before = ''
        let after = ''
        await editor.clearText()
        await editor.setText(before)
        assert.equal(before, editor.getText())
        editor
            .execCommand(command)
            .then( _ => assert.equal(after, editor.getText()))
    })

})
