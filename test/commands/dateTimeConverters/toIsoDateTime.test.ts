import * as assert from 'assert'
import * as vscode from 'vscode'

import { toIsoDateTime } from '../../../src/commands/dateTimeConverters/toIsoDateTime'

suite('commands/dateTimeConverters/toIsoDateTime', () => {
    test('toIsoDateTime', () => {
        assert.equal(undefined, toIsoDateTime(undefined))
        assert.equal(null, toIsoDateTime(null))
        assert.equal('', toIsoDateTime(''))
        assert.equal(' ', toIsoDateTime(' '))
        assert.equal('0', toIsoDateTime('0'))

        assert.equal('2017-04-27T15:00:00.000Z', toIsoDateTime('\\/Date(1493305200000)\\/'))
        assert.equal('2017-04-28T00:00:00.000+0900', toIsoDateTime('\\/Date(1493305200000+0900)\\/'))
        assert.equal('2017-04-27T06:00:00.000-0900', toIsoDateTime('\\/Date(1493305200000-0900)\\/'))

        assert.equal('2017-04-27T15:00:00.321Z', toIsoDateTime('\\/Date(1493305200321)\\/'))
    })
})
