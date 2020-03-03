import * as assert from 'assert'
import '../../../utils/string.extension'

suite('string.extension Test Suite', () => {
  console.log('start string.extension tests.')

  test('isValid', () => {
    assert.equal(''.hasCharactors(), false)

    assert.equal(' '.hasCharactors(), true)
  })

  test('isVariable', () => {
    assert.equal(''.isVariable(), false)
    assert.equal(' '.isVariable(), false)
    assert.equal('-'.isVariable(), false)
    assert.equal('0'.isVariable(), false)
    assert.equal('0l'.isVariable(), false)
    assert.equal('a.b'.isVariable(), false)

    assert.equal('a-b'.isVariable(), false)

    assert.equal('_'.isVariable(), true)
    assert.equal('a'.isVariable(), true)
    assert.equal('this'.isVariable(), true)
    assert.equal('thisIs'.isVariable(), true)
    assert.equal('this_Is'.isVariable(), true)
    assert.equal('thisIsVariable'.isVariable(), true)
    assert.equal('thisIsVariable2'.isVariable(), true)
  })

  test('isVariableLoose', () => {
    assert.equal(''.isVariableLoose(), false)
    assert.equal(' '.isVariableLoose(), false)
    assert.equal('-'.isVariableLoose(), false)
    assert.equal('0'.isVariableLoose(), false)
    assert.equal('0l'.isVariableLoose(), false)
    assert.equal('a.b'.isVariableLoose(), false)

    assert.equal('a-b'.isVariableLoose(), true)

    assert.equal('_'.isVariableLoose(), true)
    assert.equal('a'.isVariableLoose(), true)
    assert.equal('this'.isVariableLoose(), true)
    assert.equal('thisIs'.isVariableLoose(), true)
    assert.equal('this_Is'.isVariableLoose(), true)
    assert.equal('thisIsVariable'.isVariableLoose(), true)
    assert.equal('thisIsVariable2'.isVariableLoose(), true)
  })

  test('words', () => {
    assert.deepEqual(''.words(), [])

    assert.deepEqual(' '.words(), [' '], "input: ' '")
    assert.deepEqual('_'.words(), ['_'], "input: '_'")
    assert.deepEqual('-'.words(), ['-'], "input: '-'")
    assert.deepEqual('.'.words(), ['.'], "input: '.'")
    assert.deepEqual('A'.words(), ['A'], "input: 'A'")
    assert.deepEqual('0'.words(), ['0'], "input: '0'")
    assert.deepEqual('a'.words(), ['a'], "input: 'a'")

    assert.deepEqual('  '.words(), ['  '], "input: '  '")
    assert.deepEqual('__'.words(), ['__'], "input: '__'")
    assert.deepEqual('--'.words(), ['--'], "input: '--'")
    assert.deepEqual('..'.words(), ['..'], "input: '..'")
    assert.deepEqual('AA'.words(), ['AA'], "input: 'AA'")
    assert.deepEqual('10'.words(), ['10'], "input: '10'")
    assert.deepEqual('aa'.words(), ['aa'], "input: 'aa'")
    assert.deepEqual('Aa'.words(), ['Aa'], "input: 'Aa'")

    assert.deepEqual('Aa Bb'.words(), ['Aa', ' ', 'Bb'], "input: 'Aa Bb'")
    assert.deepEqual('aa bb'.words(), ['aa', ' ', 'bb'], "input: 'aa bb'")

    assert.deepEqual('AaBb'.words(), ['Aa', 'Bb'], "input: 'AaBb'")
    assert.deepEqual('DB'.words(), ['DB'], "input: 'DB'")
    assert.deepEqual('DB3'.words(), ['DB', '3'], "input: 'DB', '3'")
    assert.deepEqual('DataBase'.words(), ['Data', 'Base'], "input: 'DataBase'")
    assert.deepEqual('DBStore'.words(), ['DB', 'Store'], "input: 'DBStore'")
    assert.deepEqual('SuperDB3Store'.words(), ['Super', 'DB', '3', 'Store'], "input: 'SuperDB3Store'")

    assert.deepEqual('this is a pen'.words(), ['this', ' ', 'is', ' ', 'a', ' ', 'pen'])
    assert.deepEqual('this_is_a_pen'.words(), ['this', '_', 'is', '_', 'a', '_', 'pen'])
    assert.deepEqual('this-is-a-pen'.words(), ['this', '-', 'is', '-', 'a', '-', 'pen'])
    assert.deepEqual('this.is.a.pen'.words(), ['this', '.', 'is', '.', 'a', '.', 'pen'])

    assert.deepEqual('THIS IS A PEN'.words(), ['THIS', ' ', 'IS', ' ', 'A', ' ', 'PEN'])
    assert.deepEqual('THIS_IS_A_PEN'.words(), ['THIS', '_', 'IS', '_', 'A', '_', 'PEN'])
    assert.deepEqual('THIS-IS-A-PEN'.words(), ['THIS', '-', 'IS', '-', 'A', '-', 'PEN'])
    assert.deepEqual('THIS.IS.A.PEN'.words(), ['THIS', '.', 'IS', '.', 'A', '.', 'PEN'])

    assert.deepEqual('thisIsAPen'.words(), ['this', 'Is', 'A', 'Pen'])
  })

  test('lines', () => {
    assert.deepEqual(''.lines(), [])

    assert.deepEqual(' '.lines(), [' '])
    assert.deepEqual('a'.lines(), ['a'])

    assert.deepEqual('a\r'.lines(), ['a'])
    assert.deepEqual('a\n'.lines(), ['a'])
    assert.deepEqual('a\r\n'.lines(), ['a'])

    assert.deepEqual('a\rb'.lines(), ['a', 'b'])
    assert.deepEqual('a\nb'.lines(), ['a', 'b'])
    assert.deepEqual('a\r\nb'.lines(), ['a', 'b'])

    assert.deepEqual('a\rb\n'.lines(), ['a', 'b'])
    assert.deepEqual('a\nb\n'.lines(), ['a', 'b'])
    assert.deepEqual('a\r\nb\n'.lines(), ['a', 'b'])

    assert.deepEqual('a\n\nb'.lines(), ['a', '', 'b'])

    assert.deepEqual('a\n\n'.lines(), ['a', ''])
    assert.deepEqual('a\r\r'.lines(), ['a', ''])
    assert.deepEqual('a\r\n\r\n'.lines(), ['a', ''])
  })
})
