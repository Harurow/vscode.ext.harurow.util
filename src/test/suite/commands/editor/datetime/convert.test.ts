import * as assert from 'assert'
import { toIso, toCSharp } from '../../../../../commands/editor/edit/convertDate'

suite('datetime Test Suite', () => {
  test('toIso', () => {
    assert.equal(toIso(''), '')
    assert.equal(toIso('0'), '0')
    assert.equal(toIso('asdfg'), 'asdfg')

    assert.equal(toIso('\\/Date(1493305200000)\\/'), '2017-04-27T15:00:00.000Z')
    assert.equal(toIso('\\/Date(1493305200000+0900)\\/'), '2017-04-28T00:00:00.000+0900')
    assert.equal(toIso('\\/Date(1493305200000-0900)\\/'), '2017-04-27T06:00:00.000-0900')

    assert.equal(toIso('\\/Date(1493305200321)\\/'), '2017-04-27T15:00:00.321Z')
  })

  test('C#', () => {
    assert.equal(toCSharp(''), '')
    assert.equal(toCSharp('0'), '0')
    assert.equal(toCSharp('asdfg'), 'asdfg')

    assert.equal(toCSharp('2017-04-27T15:00:00.000Z'), '\\/Date(1493305200000)\\/')
    assert.equal(toCSharp('2017-04-28T00:00:00.000+0900'), '\\/Date(1493305200000+0900)\\/')
    assert.equal(toCSharp('2017-04-27T06:00:00.000-0900'), '\\/Date(1493305200000-0900)\\/')

    assert.equal(toCSharp('2017-04-27T15:00:00.321Z'), '\\/Date(1493305200321)\\/')
  })
})
