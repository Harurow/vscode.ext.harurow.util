import assert from 'assert'
import './CharInfo'

const ascii = '\t\r\n !"#$%&\'()*+,-./0123456789:;<=>?' +
  '@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_' +
  '`abcdefghijklmnopqrstuvwxyz{|}~'

const latin = ' ¡¢£¤¥¦§¨©ª«¬­®¯' +
  '°±²³´µ¶·¸¹º»¼½¾¿' +
  'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏ' +
  'ÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞß' +
  'àáâãäåæçèéêëìíîï' +
  'ðñòóôõö÷øùúûüýþÿ'

const surrogatePair = '𩸽𠀋𡈽𡌛𡑮'
const hiragana = 'がぎぐげご'
const hiraganaGouji = 'がぎぐげご'
const emoji1 = '😀👺📸🍙🎌'
const emoji2 = '👍🏻🇯🇵🧑🏻'
const emoji3 = '👨🏻‍💻'
const emoji4 = '👨‍👩‍👧‍👦'

describe('CharInfo', () => {
  it('charInfos', () => {
    assert.strictEqual(''.charInfos().length, 0)
    assert.strictEqual(ascii.charInfos().length, 98)
    assert.strictEqual(latin.charInfos().length, 96)
    assert.strictEqual(surrogatePair.charInfos().length, 5)
    assert.strictEqual(hiragana.charInfos().length, 5)
    assert.strictEqual(hiraganaGouji.charInfos().length, 10)
    assert.strictEqual(emoji1.charInfos().length, 5)
    assert.strictEqual(emoji2.charInfos().length, 6)
    assert.strictEqual(emoji3.charInfos().length, 4)
    assert.strictEqual(emoji4.charInfos().length, 7)
  })

  it('isSpace', () => {
    '    '
      .charInfos()
      .forEach(ci => {
        assert.strictEqual(ci.isSpace, true)
      })
    ascii
      .charInfos()
      .filter(ci => ci.code !== 0x20)
      .forEach(ci => {
        assert.strictEqual(ci.isSpace, false)
      })
    latin
      .charInfos()
      .forEach(ci => assert.strictEqual(ci.isSpace, false))
    surrogatePair
      .charInfos()
      .forEach(ci => assert.strictEqual(ci.isSpace, false))
    hiragana
      .charInfos()
      .forEach(ci => assert.strictEqual(ci.isSpace, false))
    hiraganaGouji
      .charInfos()
      .forEach(ci => assert.strictEqual(ci.isSpace, false))
    emoji1
      .charInfos()
      .forEach(ci => assert.strictEqual(ci.isSpace, false))
  })

  it('isNewLine', () => {
    `\r\n
`
      .charInfos()
      .forEach(ci => {
        assert.strictEqual(ci.isNewLine, true)
      })
    ascii
      .charInfos()
      .filter(ci => ci.char !== '\r' && ci.char !== '\n')
      .forEach(ci => {
        assert.strictEqual(ci.isNewLine, false)
      })
    latin
      .charInfos()
      .forEach(ci => assert.strictEqual(ci.isNewLine, false))
    surrogatePair
      .charInfos()
      .forEach(ci => assert.strictEqual(ci.isNewLine, false))
    hiragana
      .charInfos()
      .forEach(ci => assert.strictEqual(ci.isNewLine, false))
    hiraganaGouji
      .charInfos()
      .forEach(ci => assert.strictEqual(ci.isNewLine, false))
    emoji1
      .charInfos()
      .forEach(ci => assert.strictEqual(ci.isNewLine, false))
  })

  it('isAscii', () => {
    ascii
      .charInfos()
      .forEach(ci => assert.strictEqual(ci.isAscii, true))
    latin
      .charInfos()
      .forEach(ci => assert.strictEqual(ci.isAscii, false))
    surrogatePair
      .charInfos()
      .forEach(ci => assert.strictEqual(ci.isAscii, false))
    hiragana
      .charInfos()
      .forEach(ci => assert.strictEqual(ci.isAscii, false))
    hiraganaGouji
      .charInfos()
      .forEach(ci => assert.strictEqual(ci.isAscii, false))
    emoji1
      .charInfos()
      .forEach(ci => assert.strictEqual(ci.isAscii, false))
  })

  it('isLatin', () => {
    ascii
      .charInfos()
      .forEach(ci => assert.strictEqual(ci.isLatin, true))
    latin
      .charInfos()
      .forEach(ci => assert.strictEqual(ci.isLatin, true))
    surrogatePair
      .charInfos()
      .forEach(ci => assert.strictEqual(ci.isLatin, false))
    hiragana
      .charInfos()
      .forEach(ci => assert.strictEqual(ci.isLatin, false))
    hiraganaGouji
      .charInfos()
      .forEach(ci => assert.strictEqual(ci.isLatin, false))
    emoji1
      .charInfos()
      .forEach(ci => assert.strictEqual(ci.isLatin, false))
  })

  it('isSurrogatePair', () => {
    ascii
      .charInfos()
      .forEach(ci => assert.strictEqual(ci.isSurrogatePair, false))
    latin
      .charInfos()
      .forEach(ci => assert.strictEqual(ci.isSurrogatePair, false))
    surrogatePair
      .charInfos()
      .forEach(ci => assert.strictEqual(ci.isSurrogatePair, true))
    hiragana
      .charInfos()
      .forEach(ci => assert.strictEqual(ci.isSurrogatePair, false))
    hiraganaGouji
      .charInfos()
      .forEach(ci => assert.strictEqual(ci.isSurrogatePair, false))
    emoji1
      .charInfos()
      .forEach(ci => assert.strictEqual(ci.isSurrogatePair, true))
  })

  it('toSurrogatePair', () => {
    assert.throws(() => {
      'A'.charInfos()[0].toSurrogatePair()
    }, new Error('invalid operation'))

    assert.doesNotThrow(() => {
      const sp = '𩸽'.charInfos()[0].toSurrogatePair()
      assert.strictEqual(sp.hi, 0xD867)
      assert.strictEqual(sp.lo, 0xDE3D)
    })
  })
})
