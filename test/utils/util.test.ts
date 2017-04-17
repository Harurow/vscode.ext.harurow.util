import * as assert from 'assert'
import * as vscode from 'vscode'

import * as $ from '../../src/utils/util'

suite('utils/util tests', () => {
    test('throwIf', () => {
        assert.doesNotThrow(() => $.throwIf(undefined, undefined))
        assert.doesNotThrow(() => $.throwIf(null, undefined))
        assert.doesNotThrow(() => $.throwIf(false, undefined))
        assert.throws(() => $.throwIf(true, 'throw'))
    })
})
