import * as assert from 'assert'
import * as vscode from 'vscode'

import { toCamelCase } from '../../../src/commands/caseConverters/toCamelCase'

suite('commands/caseConverters/toCamelCase', () => {
    test('toCamelCase', () => {
        assert.equal(undefined, toCamelCase(undefined))
        assert.equal(null, toCamelCase(null))
        assert.equal('', toCamelCase(''))
        assert.equal(' ', toCamelCase(' '))
        assert.equal('0', toCamelCase('0'))

        assert.equal('thisIsCamel', toCamelCase('ThisIsCamel'))
        assert.equal('thisIsCamel', toCamelCase('thisIsCamel'))
        assert.equal('thisIsCamel', toCamelCase('this_is_camel'))
        assert.equal('thisIsCamel', toCamelCase('THIS_IS_CAMEL'))
    })
})
