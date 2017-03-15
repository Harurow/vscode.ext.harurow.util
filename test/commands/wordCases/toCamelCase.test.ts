import * as assert from 'assert'
import * as vscode from 'vscode'

import $ from '../../../src/__/commands/wordCases/toCamelCase'

suite('commands/wordCases/toCamelCase', () =>{
    test('toCamelCase', () => {
        assert.equal(undefined, $(undefined))
        assert.equal(null, $(null))
        assert.equal('', $(''))
        assert.equal(' ', $(' '))
        assert.equal('0', $('0'))

        assert.equal('thisIsCamel', $('ThisIsCamel'))
        assert.equal('thisIsCamel', $('thisIsCamel'))
        assert.equal('thisIsCamel', $('this_is_camel'))
        assert.equal('thisIsCamel', $('THIS_IS_CAMEL'))
    })
})
