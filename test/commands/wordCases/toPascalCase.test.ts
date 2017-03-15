import * as assert from 'assert'
import * as vscode from 'vscode'

import $ from '../../../src/__/commands/wordCases/toPascalCase'

suite('commands/wordCases/toPascalCase', () =>{
    test('toPascalCase', () => {
        assert.equal(undefined, $(undefined))
        assert.equal(null, $(null))
        assert.equal('', $(''))
        assert.equal(' ', $(' '))
        assert.equal('0', $('0'))

        assert.equal('ThisIsPascal', $('ThisIsPascal'))
        assert.equal('ThisIsPascal', $('thisIsPascal'))
        assert.equal('ThisIsPascal', $('this_is_pascal'))
        assert.equal('ThisIsPascal', $('THIS_IS_PASCAL'))
    })
})
