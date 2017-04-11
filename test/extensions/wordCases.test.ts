import * as assert from 'assert'
import * as vscode from 'vscode'

import TextEditor from '../utils/textEditor'

suite('extensions wordCases', () => {
    test('commands.wordCases.toPascalCase', async () => {
        let editor = await TextEditor.initAsync()

        await editor.clearTextAsync()
        await editor.setTextAsync('PascalCase camelCase lower_snake UPPER_SNAKE')
        assert.equal('PascalCase camelCase lower_snake UPPER_SNAKE', editor.getText())
        editor
            .execCommandAsync('commands.caseConverters.toPascalCase')
            .then( _ => assert.equal('PascalCase CamelCase LowerSnake UpperSnake', editor.getText()))
    })

    test('commands.wordCases.toCamelCase', async () => {
        let editor = await TextEditor.initAsync()

        await editor.clearTextAsync()
        await editor.setTextAsync('PascalCase camelCase lower_snake UPPER_SNAKE')
        assert.equal('PascalCase camelCase lower_snake UPPER_SNAKE', editor.getText())
        editor
            .execCommandAsync('commands.caseConverters.toCamelCase')
            .then( _ => assert.equal('pascalCase camelCase lowerSnake upperSnake', editor.getText()))
    })

    test('commands.wordCases.toUpperSnakeCase', async () => {
        let editor = await TextEditor.initAsync()

        await editor.clearTextAsync()
        await editor.setTextAsync('PascalCase camelCase lower_snake UPPER_SNAKE')
        assert.equal('PascalCase camelCase lower_snake UPPER_SNAKE', editor.getText())
        editor
            .execCommandAsync('commands.caseConverters.toUpperSnakeCase')
            .then( _ => assert.equal('PASCAL_CASE CAMEL_CASE LOWER_SNAKE UPPER_SNAKE', editor.getText()))
    })

    test('commands.wordCases.toLowerSnakeCase', async () => {
        let editor = await TextEditor.initAsync()

        await editor.clearTextAsync()
        await editor.setTextAsync('PascalCase camelCase lower_snake UPPER_SNAKE')
        assert.equal('PascalCase camelCase lower_snake UPPER_SNAKE', editor.getText())
        editor
            .execCommandAsync('commands.caseConverters.toLowerSnakeCase')
            .then( _ => assert.equal('pascal_case camel_case lower_snake upper_snake', editor.getText()))
    })
})
