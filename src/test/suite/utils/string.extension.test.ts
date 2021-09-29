import * as assert from 'assert'
import '../../../utils/string.extension'

describe('string.extension Test Suite', () => {
  console.log('start string.extension tests.')

  it('isValid', () => {
    assert.strictEqual(''.hasCharactors(), false)

    assert.strictEqual(' '.hasCharactors(), true)
  })

  it('isVariable', () => {
    assert.strictEqual(''.isVariable(), false)
    assert.strictEqual(' '.isVariable(), false)
    assert.strictEqual('-'.isVariable(), false)
    assert.strictEqual('0'.isVariable(), false)
    assert.strictEqual('0l'.isVariable(), false)
    assert.strictEqual('a.b'.isVariable(), false)

    assert.strictEqual('a-b'.isVariable(), false)

    assert.strictEqual('_'.isVariable(), true)
    assert.strictEqual('a'.isVariable(), true)
    assert.strictEqual('this'.isVariable(), true)
    assert.strictEqual('thisIs'.isVariable(), true)
    assert.strictEqual('this_Is'.isVariable(), true)
    assert.strictEqual('thisIsVariable'.isVariable(), true)
    assert.strictEqual('thisIsVariable2'.isVariable(), true)
  })

  it('isVariableLoose', () => {
    assert.strictEqual(''.isVariableLoose(), false)
    assert.strictEqual(' '.isVariableLoose(), false)
    assert.strictEqual('-'.isVariableLoose(), false)
    assert.strictEqual('0'.isVariableLoose(), false)
    assert.strictEqual('0l'.isVariableLoose(), false)
    assert.strictEqual('a.b'.isVariableLoose(), false)

    assert.strictEqual('a-b'.isVariableLoose(), true)

    assert.strictEqual('_'.isVariableLoose(), true)
    assert.strictEqual('a'.isVariableLoose(), true)
    assert.strictEqual('this'.isVariableLoose(), true)
    assert.strictEqual('thisIs'.isVariableLoose(), true)
    assert.strictEqual('this_Is'.isVariableLoose(), true)
    assert.strictEqual('thisIsVariable'.isVariableLoose(), true)
    assert.strictEqual('thisIsVariable2'.isVariableLoose(), true)
  })

  it('words', () => {
    assert.deepStrictEqual(''.words(), [])

    assert.deepStrictEqual(' '.words(), [' '], "input: ' '")
    assert.deepStrictEqual('_'.words(), ['_'], "input: '_'")
    assert.deepStrictEqual('-'.words(), ['-'], "input: '-'")
    assert.deepStrictEqual('.'.words(), ['.'], "input: '.'")
    assert.deepStrictEqual('A'.words(), ['A'], "input: 'A'")
    assert.deepStrictEqual('0'.words(), ['0'], "input: '0'")
    assert.deepStrictEqual('a'.words(), ['a'], "input: 'a'")

    assert.deepStrictEqual('  '.words(), ['  '], "input: '  '")
    assert.deepStrictEqual('__'.words(), ['__'], "input: '__'")
    assert.deepStrictEqual('--'.words(), ['--'], "input: '--'")
    assert.deepStrictEqual('..'.words(), ['..'], "input: '..'")
    assert.deepStrictEqual('AA'.words(), ['AA'], "input: 'AA'")
    assert.deepStrictEqual('10'.words(), ['10'], "input: '10'")
    assert.deepStrictEqual('aa'.words(), ['aa'], "input: 'aa'")
    assert.deepStrictEqual('Aa'.words(), ['Aa'], "input: 'Aa'")

    assert.deepStrictEqual('Aa Bb'.words(), ['Aa', ' ', 'Bb'], "input: 'Aa Bb'")
    assert.deepStrictEqual('aa bb'.words(), ['aa', ' ', 'bb'], "input: 'aa bb'")

    assert.deepStrictEqual('AaBb'.words(), ['Aa', 'Bb'], "input: 'AaBb'")
    assert.deepStrictEqual('DB'.words(), ['DB'], "input: 'DB'")
    assert.deepStrictEqual('DB3'.words(), ['DB', '3'], "input: 'DB', '3'")
    assert.deepStrictEqual('DataBase'.words(), ['Data', 'Base'], "input: 'DataBase'")
    assert.deepStrictEqual('DBStore'.words(), ['DB', 'Store'], "input: 'DBStore'")
    assert.deepStrictEqual('SuperDB3Store'.words(), ['Super', 'DB', '3', 'Store'], "input: 'SuperDB3Store'")

    assert.deepStrictEqual('this is a pen'.words(), ['this', ' ', 'is', ' ', 'a', ' ', 'pen'])
    assert.deepStrictEqual('this_is_a_pen'.words(), ['this', '_', 'is', '_', 'a', '_', 'pen'])
    assert.deepStrictEqual('this-is-a-pen'.words(), ['this', '-', 'is', '-', 'a', '-', 'pen'])
    assert.deepStrictEqual('this.is.a.pen'.words(), ['this', '.', 'is', '.', 'a', '.', 'pen'])

    assert.deepStrictEqual('THIS IS A PEN'.words(), ['THIS', ' ', 'IS', ' ', 'A', ' ', 'PEN'])
    assert.deepStrictEqual('THIS_IS_A_PEN'.words(), ['THIS', '_', 'IS', '_', 'A', '_', 'PEN'])
    assert.deepStrictEqual('THIS-IS-A-PEN'.words(), ['THIS', '-', 'IS', '-', 'A', '-', 'PEN'])
    assert.deepStrictEqual('THIS.IS.A.PEN'.words(), ['THIS', '.', 'IS', '.', 'A', '.', 'PEN'])

    assert.deepStrictEqual('thisIsAPen'.words(), ['this', 'Is', 'A', 'Pen'])
  })

  it('lines', () => {
    assert.deepStrictEqual(''.lines(), [])

    assert.deepStrictEqual(' '.lines(), [' '])
    assert.deepStrictEqual('a'.lines(), ['a'])

    assert.deepStrictEqual('a\r'.lines(), ['a'])
    assert.deepStrictEqual('a\n'.lines(), ['a'])
    assert.deepStrictEqual('a\r\n'.lines(), ['a'])

    assert.deepStrictEqual('a\rb'.lines(), ['a', 'b'])
    assert.deepStrictEqual('a\nb'.lines(), ['a', 'b'])
    assert.deepStrictEqual('a\r\nb'.lines(), ['a', 'b'])

    assert.deepStrictEqual('a\rb\n'.lines(), ['a', 'b'])
    assert.deepStrictEqual('a\nb\n'.lines(), ['a', 'b'])
    assert.deepStrictEqual('a\r\nb\n'.lines(), ['a', 'b'])

    assert.deepStrictEqual('a\n\nb'.lines(), ['a', '', 'b'])

    assert.deepStrictEqual('a\n\n'.lines(), ['a', ''])
    assert.deepStrictEqual('a\r\r'.lines(), ['a', ''])
    assert.deepStrictEqual('a\r\n\r\n'.lines(), ['a', ''])
  })
})
