import * as assert from 'assert'
import * as vscode from 'vscode'

import $ from '../../../src/__/commands/wordCases/toLowerSnakeCase'

suite('commands/wordCases/toLowerSnakeCase', () => {
    test('toLowerSnakeCase', () => {
        assert.equal(undefined, $(undefined))
        assert.equal(null, $(null))
        assert.equal('', $(''))
        assert.equal(' ', $(' '))
        assert.equal('0', $('0'))

        assert.equal('this_is_snake', $('ThisIsSnake'))
        assert.equal('this_is_snake', $('thisIsSnake'))
        assert.equal('this_is_snake', $('this_is_Snake'))
        assert.equal('this_is_snake', $('THIS_IS_Snake'))
    })
})
