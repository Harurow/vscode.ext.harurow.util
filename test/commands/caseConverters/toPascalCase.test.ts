import * as assert from 'assert'
import * as vscode from 'vscode'

import {
    toPascalCase,
    toPascalWord,
} from '../../../src/commands/caseConverters/toPascalCase'

suite('commands/caseConverters/toPascalCase', () => {
    test('toPascalCase', () => {
        assert.equal(undefined, toPascalCase(undefined))
        assert.equal(null, toPascalCase(null))
        assert.equal('', toPascalCase(''))
        assert.equal(' ', toPascalCase(' '))
        assert.equal('0', toPascalCase('0'))

        assert.equal('ThisIsPascal', toPascalCase('ThisIsPascal'))
        assert.equal('ThisIsPascal', toPascalCase('thisIsPascal'))
        assert.equal('ThisIsPascal', toPascalCase('this_is_pascal'))
        assert.equal('ThisIsPascal', toPascalCase('THIS_IS_PASCAL'))

        assert.equal('Pascal', toPascalCase('Pascal'))
        assert.equal('Pascal', toPascalCase('PASCAL'))
        assert.equal('Pascal', toPascalCase('pascal'))
        assert.equal('', toPascalCase('_'))
        assert.equal('', toPascalCase('__'))
    })

    test('toPascalWord', () => {
        assert.equal(undefined, toPascalWord(undefined))
        assert.equal(null, toPascalWord(null))
        assert.equal('', toPascalWord(''))
        assert.equal(' ', toPascalWord(' '))
        assert.equal('0', toPascalWord('0'))

        assert.equal('Pascal', toPascalWord('Pascal'))
        assert.equal('Pascal', toPascalWord('PASCAL'))
        assert.equal('Pascal', toPascalWord('pascal'))
        assert.equal('', toPascalWord('_'))
        assert.equal('', toPascalWord('__'))
    })
})
