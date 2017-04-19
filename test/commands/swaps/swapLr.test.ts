import * as assert from 'assert'
import * as vscode from 'vscode'

import {
    swapLr
} from '../../../src/commands/swaps/lr'

suite('Swaps Tests', () => {

    test('swapLr', () => {
        assert.equal('v2=v1', swapLr('v1=v2'))
        assert.equal('v2:v1', swapLr('v1:v2'))
        assert.equal('    v2 = v1;', swapLr('    v1 = v2;'))
        assert.equal('    v2  = v1;', swapLr('    v1  = v2;'))
        assert.equal('    v2 =  v1;', swapLr('    v1 =  v2;'))

        assert.equal('    v2 =  v1;', swapLr('    v1 =  v2;'))
        assert.equal('    C2.v2 =  C1.v1;', swapLr('    C1.v1 =  C2.v2;'))

        assert.equal('    v2 =  v1,', swapLr('    v1 =  v2,'))
        assert.equal('    C2.v2 =  C1.v1,', swapLr('    C1.v1 =  C2.v2,'))
    })
})
