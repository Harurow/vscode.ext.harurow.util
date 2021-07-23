import * as assert from 'assert'
import { encodeRfc, decodeRfc } from '../../../../../commands/editor/encoding/rfc'

suite('rfc Test Suite', () => {
  test('rfc 3986 - part - utf8', () => {
    assert.deepEqual(encodeRfc(false, false, 'UTF8')('012 abc ,;: ｱｲｳ アイウ あいう 亜以宇 ㋿ 𩸽 ✌️ 🇯🇵'),
      {
        result: '012%20abc%20%2c%3b%3a%20%ef%bd%b1%ef%bd%b2%ef%bd%b3%20%e3%82%a2%e3%82%a4%e3%82%a6%20%e3%81%82%e3%81%84%e3%81%86%20%e4%ba%9c%e4%bb%a5%e5%ae%87%20%e3%8b%bf%20%f0%a9%b8%bd%20%e2%9c%8c%ef%b8%8f%20%f0%9f%87%af%f0%9f%87%b5',
        failed: 0,
      })
  })

  test('rfc 3986 - all - utf8', () => {
    assert.deepEqual(encodeRfc(false, true, 'UTF8')('012 abc ,;: ｱｲｳ アイウ あいう 亜以宇 ㋿ 𩸽 ✌️ 🇯🇵'),
      {
        result: '%30%31%32%20%61%62%63%20%2c%3b%3a%20%ef%bd%b1%ef%bd%b2%ef%bd%b3%20%e3%82%a2%e3%82%a4%e3%82%a6%20%e3%81%82%e3%81%84%e3%81%86%20%e4%ba%9c%e4%bb%a5%e5%ae%87%20%e3%8b%bf%20%f0%a9%b8%bd%20%e2%9c%8c%ef%b8%8f%20%f0%9f%87%af%f0%9f%87%b5',
        failed: 0,
      })
  })

  test('rfc 1866 - part - utf8', () => {
    assert.deepEqual(encodeRfc(true, false, 'UTF8')('012 abc ,;: ｱｲｳ アイウ あいう 亜以宇 ㋿ 𩸽 ✌️ 🇯🇵'),
      {
        result: '012+abc+%2c%3b%3a+%ef%bd%b1%ef%bd%b2%ef%bd%b3+%e3%82%a2%e3%82%a4%e3%82%a6+%e3%81%82%e3%81%84%e3%81%86+%e4%ba%9c%e4%bb%a5%e5%ae%87+%e3%8b%bf+%f0%a9%b8%bd+%e2%9c%8c%ef%b8%8f+%f0%9f%87%af%f0%9f%87%b5',
        failed: 0,
      })
  })

  test('rfc 1866 - all - utf8', () => {
    assert.deepEqual(encodeRfc(true, true, 'UTF8')('012 abc ,;: ｱｲｳ アイウ あいう 亜以宇 ㋿ 𩸽 ✌️ 🇯🇵'),
      {
        result: '%30%31%32+%61%62%63+%2c%3b%3a+%ef%bd%b1%ef%bd%b2%ef%bd%b3+%e3%82%a2%e3%82%a4%e3%82%a6+%e3%81%82%e3%81%84%e3%81%86+%e4%ba%9c%e4%bb%a5%e5%ae%87+%e3%8b%bf+%f0%a9%b8%bd+%e2%9c%8c%ef%b8%8f+%f0%9f%87%af%f0%9f%87%b5',
        failed: 0,
      })
  })

  test('rfc 3986 - all - utf8', () => {
    assert.deepEqual(encodeRfc(false, false, 'UTF8')('あいう 亜以宇 ㋿ 𩸽'),
      {
        result: '%e3%81%82%e3%81%84%e3%81%86%20%e4%ba%9c%e4%bb%a5%e5%ae%87%20%e3%8b%bf%20%f0%a9%b8%bd',
        failed: 0,
      })
  })

  test('rfc 3986 - all - shift-jis', () => {
    assert.deepEqual(encodeRfc(false, false, 'SJIS')('あいう 亜以宇 ㋿ 𩸽'),
      {
        result: '%82%a0%82%a2%82%a4%20%88%9f%88%c8%89%46%20%3f%20%3f%3f',
        failed: 2,
      })
  })

  test('rfc 1866 - all - euc-jp', () => {
    assert.deepEqual(encodeRfc(true, false, 'EUCJP')('あいう 亜以宇 ㋿ 𩸽'),
      {
        result: '%a4%a2%a4%a4%a4%a6+%b0%a1%b0%ca%b1%a7+%3f+%3f%3f',
        failed: 2,
      })
  })

  test('decode - utf8', () => {
    assert.deepEqual(decodeRfc('UTF8')('012%20abc%20%2c%3b%3a%20%ef%bd%b1%ef%bd%b2%ef%bd%b3%20%e3%82%a2%e3%82%a4%e3%82%a6%20%e3%81%82%e3%81%84%e3%81%86%20%e4%ba%9c%e4%bb%a5%e5%ae%87%20%e3%8b%bf%20%f0%a9%b8%bd%20%e2%9c%8c%ef%b8%8f%20%f0%9f%87%af%f0%9f%87%b5'),
      '012 abc ,;: ｱｲｳ アイウ あいう 亜以宇 ㋿ 𩸽 ✌️ 🇯🇵')
  })

  test('decode - utf8', () => {
    assert.deepEqual(decodeRfc('UTF8')('012+abc+%2c%3b%3a+%ef%bd%b1%ef%bd%b2%ef%bd%b3+%e3%82%a2%e3%82%a4%e3%82%a6+%e3%81%82%e3%81%84%e3%81%86+%e4%ba%9c%e4%bb%a5%e5%ae%87+%e3%8b%bf+%f0%a9%b8%bd+%e2%9c%8c%ef%b8%8f+%f0%9f%87%af%f0%9f%87%b5'),
      '012 abc ,;: ｱｲｳ アイウ あいう 亜以宇 ㋿ 𩸽 ✌️ 🇯🇵')
  })

  test('decode - shift-jis', () => {
    assert.deepEqual(decodeRfc('SJIS')('%82%a0%82%a2%82%a4%20%88%9f%88%c8%89%46%20%3f%20%3f%3f'),
      'あいう 亜以宇 ? ??')
  })

  test('decode - euc-jp', () => {
    assert.deepEqual(decodeRfc('EUCJP')('%a4%a2%a4%a4%a4%a6+%b0%a1%b0%ca%b1%a7+%3f+%3f%3f'),
      'あいう 亜以宇 ? ??')
  })
})
