import * as assert from 'assert'
import * as vscode from 'vscode'

import { toCSharpDateTime } from '../../../src/commands/dateTimeConverters/toCSharpDateTime'

suite('commands/dateTimeConverters/toCSharpDateTime', () => {
    test('toCSharpDateTime', () => {
        assert.equal(undefined, toCSharpDateTime(undefined))
        assert.equal(null, toCSharpDateTime(null))
        assert.equal('', toCSharpDateTime(''))
        assert.equal(' ', toCSharpDateTime(' '))
        assert.equal('0', toCSharpDateTime('0'))

        assert.equal('\\/Date(1493305200000)\\/', toCSharpDateTime('2017-04-27T15:00:00.000Z'))
        assert.equal('\\/Date(1493305200000+0900)\\/', toCSharpDateTime('2017-04-28T00:00:00.000+0900'))
        assert.equal('\\/Date(1493305200000-0900)\\/', toCSharpDateTime('2017-04-27T06:00:00.000-0900'))

        assert.equal('\\/Date(1493305200321)\\/', toCSharpDateTime('2017-04-27T15:00:00.321Z'))
    })
})

