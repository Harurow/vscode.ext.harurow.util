import * as assert from 'assert'
import * as vscode from 'vscode'

import { toPascalCase } from '../../../src/__/commands/wordCases/toPascalCase'

suite('commands/wordCases/toPascalCase', () => {
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
})
