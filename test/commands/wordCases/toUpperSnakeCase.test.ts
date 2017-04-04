import * as assert from 'assert'
import * as vscode from 'vscode'

import $ from '../../../src/__/commands/wordCases/toUpperSnakeCase'

suite('commands/wordCases/toUpperSnakeCase', () => {
    test('toUpperSnakeCase', () => {
        assert.equal(undefined, $(undefined))
        assert.equal(null, $(null))
        assert.equal('', $(''))
        assert.equal(' ', $(' '))
        assert.equal('0', $('0'))

        assert.equal('UPPER', $('Upper'))
        assert.equal('UPPER', $('UPPER'))
        assert.equal('UPPER', $('upper'))
        assert.equal('', $('_'))
        assert.equal('', $('__'))

        assert.equal('THIS_IS_SNAKE', $('ThisIsSnake'))
        assert.equal('THIS_IS_SNAKE', $('thisIsSnake'))
        assert.equal('THIS_IS_SNAKE', $('this_is_Snake'))
        assert.equal('THIS_IS_SNAKE', $('THIS_IS_Snake'))
    })
})
