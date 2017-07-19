import * as assert from 'assert'
import * as vscode from 'vscode'

import TextEditor from '../utils/textEditor'

suite('extensions caseConverters', () => {
    test('commands.caseConverters.toPascalCase', async () => {
        let command = 'commands.caseConverters.toPascalCase'
        let before = 'PascalCase camelCase lower_snake UPPER_SNAKE'
        let after = 'PascalCase CamelCase LowerSnake UpperSnake'

        let editor = await TextEditor.init()

        await editor.clearText()
        await editor.setText(before)
        assert.equal(before, editor.getText())
        editor.execCommand(command)
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                assert.equal(after, editor.getText())
                resolve()
            }, 300)
        })
    })

    test('commands.caseConverters.toCamelCase', async () => {
        let editor = await TextEditor.init()

        let command = 'commands.caseConverters.toCamelCase'
        let before = 'PascalCase camelCase lower_snake UPPER_SNAKE'
        let after = 'pascalCase camelCase lowerSnake upperSnake'
        await editor.clearText()
        await editor.setText(before)
        assert.equal(before, editor.getText())
        editor.execCommand(command)
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                assert.equal(after, editor.getText())
                resolve()
            }, 300)
        })
    })

    test('commands.caseConverters.toUpperSnakeCase', async () => {
        let editor = await TextEditor.init()

        let command = 'commands.caseConverters.toUpperSnakeCase'
        let before = 'PascalCase camelCase lower_snake UPPER_SNAKE'
        let after = 'PASCAL_CASE CAMEL_CASE LOWER_SNAKE UPPER_SNAKE'
        await editor.clearText()
        await editor.setText(before)
        assert.equal(before, editor.getText())
        editor.execCommand(command)
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                assert.equal(after, editor.getText())
                resolve()
            }, 300)
        })
    })

    test('commands.caseConverters.toLowerSnakeCase', async () => {
        let editor = await TextEditor.init()

        let command = 'commands.caseConverters.toLowerSnakeCase'
        let before = 'PascalCase camelCase lower_snake UPPER_SNAKE'
        let after = 'pascal_case camel_case lower_snake upper_snake'
        await editor.clearText()
        await editor.setText(before)
        assert.equal(before, editor.getText())
        editor.execCommand(command)
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                assert.equal(after, editor.getText())
                resolve()
            }, 300)
        })
    })
})
