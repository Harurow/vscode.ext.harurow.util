import * as assert from 'assert'
import * as vscode from 'vscode'

import { toUpperSnakeCase } from '../../../src/__/commands/wordCases/toUpperSnakeCase'

suite('commands/wordCases/toUpperSnakeCase', () => {
    test('toUpperSnakeCase', () => {
        assert.equal(undefined, toUpperSnakeCase(undefined))
        assert.equal(null, toUpperSnakeCase(null))
        assert.equal('', toUpperSnakeCase(''))
        assert.equal(' ', toUpperSnakeCase(' '))
        assert.equal('0', toUpperSnakeCase('0'))

        assert.equal('UPPER', toUpperSnakeCase('Upper'))
        assert.equal('UPPER', toUpperSnakeCase('UPPER'))
        assert.equal('UPPER', toUpperSnakeCase('upper'))
        assert.equal('', toUpperSnakeCase('_'))
        assert.equal('', toUpperSnakeCase('__'))

        assert.equal('THIS_IS_SNAKE', toUpperSnakeCase('ThisIsSnake'))
        assert.equal('THIS_IS_SNAKE', toUpperSnakeCase('thisIsSnake'))
        assert.equal('THIS_IS_SNAKE', toUpperSnakeCase('this_is_Snake'))
        assert.equal('THIS_IS_SNAKE', toUpperSnakeCase('THIS_IS_Snake'))
    })
})
