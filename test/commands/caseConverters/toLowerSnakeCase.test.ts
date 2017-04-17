import * as assert from 'assert'
import * as vscode from 'vscode'

import {
    toLowerSnakeCase,
    toLowerWord,
} from '../../../src/commands/caseConverters/toLowerSnakeCase'

suite('commands/caseConverters/toLowerSnakeCase', () => {
    test('toLowerSnakeCase', () => {
        assert.equal(undefined, toLowerSnakeCase(undefined))
        assert.equal(null, toLowerSnakeCase(null))
        assert.equal('', toLowerSnakeCase(''))
        assert.equal(' ', toLowerSnakeCase(' '))
        assert.equal('0', toLowerSnakeCase('0'))

        assert.equal('this_is_snake', toLowerSnakeCase('ThisIsSnake'))
        assert.equal('this_is_snake', toLowerSnakeCase('thisIsSnake'))
        assert.equal('this_is_snake', toLowerSnakeCase('this_is_Snake'))
        assert.equal('this_is_snake', toLowerSnakeCase('THIS_IS_Snake'))

        assert.equal('lower', toLowerSnakeCase('Lower'))
        assert.equal('lower', toLowerSnakeCase('LOWER'))
        assert.equal('lower', toLowerSnakeCase('lower'))
        assert.equal('', toLowerSnakeCase('_'))
        assert.equal('', toLowerSnakeCase('__'))
    })

    test('toLowerWord', () => {
        assert.equal(undefined, toLowerWord(undefined))
        assert.equal(null, toLowerWord(null))
        assert.equal('', toLowerWord(''))
        assert.equal(' ', toLowerWord(' '))
        assert.equal('0', toLowerWord('0'))
        assert.equal('abc', toLowerWord('ABC'))
        assert.equal('', toLowerWord('__'))
        assert.equal('', toLowerWord('_'))
    })
})
