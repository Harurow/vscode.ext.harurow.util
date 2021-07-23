import * as assert from 'assert'
import { encodeSgml, decodeSgml } from '../../../../../commands/editor/encoding/sgml'

suite('sgml Test Suite', () => {
  test('sgml enc - part - num', () => {
    assert.deepEqual(encodeSgml(false, false, false)('&<> 012 abc ,;: ｱｲｳ アイウ あいう 亜以宇 ㋿ 𩸽 ✌️ 🇯🇵'),
      {
        result: '&#38;&#60;&#62; 012 abc ,;: ｱｲｳ アイウ あいう 亜以宇 ㋿ 𩸽 ✌️ 🇯🇵',
        failed: 0,
      })
  })

  test('sgml enc - part - ent', () => {
    assert.deepEqual(encodeSgml(false, false, true)('&<> 012 abc ,;: ｱｲｳ アイウ あいう 亜以宇 ㋿ 𩸽 ✌️ 🇯🇵'),
      {
        result: '&amp;&lt;&gt; 012 abc ,;: ｱｲｳ アイウ あいう 亜以宇 ㋿ 𩸽 ✌️ 🇯🇵',
        failed: 0,
      })
  })

  test('sgml enc - all - num', () => {
    assert.deepEqual(encodeSgml(true, true, false)('&<> 012 abc ,;: ｱｲｳ アイウ あいう 亜以宇 ㋿ 𩸽 ✌️ 🇯🇵'),
      {
        result: '&#x26;&#x3c;&#x3e;&#x20;&#x30;&#x31;&#x32;&#x20;&#x61;&#x62;&#x63;&#x20;&#x2c;&#x3b;&#x3a;&#x20;&#xff71;&#xff72;&#xff73;&#x20;&#x30a2;&#x30a4;&#x30a6;&#x20;&#x3042;&#x3044;&#x3046;&#x20;&#x4e9c;&#x4ee5;&#x5b87;&#x20;&#x32ff;&#x20;&#x29e3d;&#x20;&#x270c;&#xfe0f;&#x20;&#x1f1ef;&#x1f1f5;',
        failed: 0,
      })
  })

  test('sgml dec - all - num', () => {
    assert.deepEqual(decodeSgml()('&#x26;&#x3c;&#x3e;&#x20;&#x30;&#x31;&#x32;&#x20;&#x61;&#x62;&#x63;&#x20;&#x2c;&#x3b;&#x3a;&#x20;&#xff71;&#xff72;&#xff73;&#x20;&#x30a2;&#x30a4;&#x30a6;&#x20;&#x3042;&#x3044;&#x3046;&#x20;&#x4e9c;&#x4ee5;&#x5b87;&#x20;&#x32ff;&#x20;&#x29e3d;&#x20;&#x270c;&#xfe0f;&#x20;&#x1f1ef;&#x1f1f5;'),
      '&<> 012 abc ,;: ｱｲｳ アイウ あいう 亜以宇 ㋿ 𩸽 ✌️ 🇯🇵')
  })
})
