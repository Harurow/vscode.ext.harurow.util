import * as assert from 'assert'
import { encodeUnicode, decodeUnicode } from '../../../../../commands/editor/encoding/unicode'

suite('unicode Test Suite', () => {
  test('unicode enc - part', () => {
    assert.deepStrictEqual(encodeUnicode(false)('&<> 012 abc ,;: ｱｲｳ アイウ あいう 亜以宇 ㋿ 𩸽 ✌️ 🇯🇵'),
      {
        result: '&<> 012 abc ,;: \\uff71\\uff72\\uff73 \\u30a2\\u30a4\\u30a6 \\u3042\\u3044\\u3046 \\u4e9c\\u4ee5\\u5b87 \\u32ff \\ud867\\ude3d \\u270c\\ufe0f \\ud83c\\uddef\\ud83c\\uddf5',
        failed: 0,
      })
  })

  test('unicode enc - all', () => {
    assert.deepStrictEqual(encodeUnicode(true)('&<> 012 abc ,;: ｱｲｳ アイウ あいう 亜以宇 ㋿ 𩸽 ✌️ 🇯🇵'),
      {
        result: '\\u0026\\u003c\\u003e\\u0020\\u0030\\u0031\\u0032\\u0020\\u0061\\u0062\\u0063\\u0020\\u002c\\u003b\\u003a\\u0020\\uff71\\uff72\\uff73\\u0020\\u30a2\\u30a4\\u30a6\\u0020\\u3042\\u3044\\u3046\\u0020\\u4e9c\\u4ee5\\u5b87\\u0020\\u32ff\\u0020\\ud867\\ude3d\\u0020\\u270c\\ufe0f\\u0020\\ud83c\\uddef\\ud83c\\uddf5',
        failed: 0,
      })
  })

  test('unicode desc', () => {
    assert.deepStrictEqual(decodeUnicode()('\\u0026\\u003c\\u003e\\u0020\\u0030\\u0031\\u0032\\u0020\\u0061\\u0062\\u0063\\u0020\\u002c\\u003b\\u003a\\u0020\\uff71\\uff72\\uff73\\u0020\\u30a2\\u30a4\\u30a6\\u0020\\u3042\\u3044\\u3046\\u0020\\u4e9c\\u4ee5\\u5b87\\u0020\\u32ff\\u0020\\ud867\\ude3d\\u0020\\u270c\\ufe0f\\u0020\\ud83c\\uddef\\ud83c\\uddf5'),
      '&<> 012 abc ,;: ｱｲｳ アイウ あいう 亜以宇 ㋿ 𩸽 ✌️ 🇯🇵')
  })
})
