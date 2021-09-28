import * as assert from 'assert'
import { toIso, toCSharp } from '../../../../../commands/editor/edit/convertDate'

suite('datetime Test Suite', () => {
  test('toIso', () => {
    assert.strictEqual(toIso(''), '')
    assert.strictEqual(toIso('0'), '0')
    assert.strictEqual(toIso('asdfg'), 'asdfg')

    assert.strictEqual(toIso('\\/Date(1493305200000)\\/'), '2017-04-27T15:00:00.000Z')
    assert.strictEqual(toIso('\\/Date(1493305200000+0900)\\/'), '2017-04-28T00:00:00.000+0900')
    assert.strictEqual(toIso('\\/Date(1493305200000-0900)\\/'), '2017-04-27T06:00:00.000-0900')

    assert.strictEqual(toIso('\\/Date(1493305200321)\\/'), '2017-04-27T15:00:00.321Z')
  })

  test('C#', () => {
    assert.strictEqual(toCSharp(''), '')
    assert.strictEqual(toCSharp('0'), '0')
    assert.strictEqual(toCSharp('asdfg'), 'asdfg')

    assert.strictEqual(toCSharp('2017-04-27T15:00:00.000Z'), '\\/Date(1493305200000)\\/')
    assert.strictEqual(toCSharp('2017-04-28T00:00:00.000+0900'), '\\/Date(1493305200000+0900)\\/')
    assert.strictEqual(toCSharp('2017-04-27T06:00:00.000-0900'), '\\/Date(1493305200000-0900)\\/')

    assert.strictEqual(toCSharp('2017-04-27T15:00:00.321Z'), '\\/Date(1493305200321)\\/')
  })
})
