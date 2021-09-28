/* eslint-disable no-irregular-whitespace */
import * as assert from 'assert'
import { CharConvertResult, isJsEncodeUriComponentPassChar, isJsEncodeUriPassChar, toJsEncodeCore, toRotEncodeCore } from '../../../../../commands/editor/encoding/encodingInternal'
import { CharInfo } from '../../../../../utils'

const text = `
!"#$%&'()*+,-./
0123456789:;<=>?
@ABCDEFGHIJKLMNO
PQRSTUVWXYZ[\\]^_
\`abcdefghijklmno
pqrstuvwxyz{|}~ 
 ¡¢£¤¥¦§¨©ª«¬­®¯
°±²³´µ¶·¸¹º»¼½¾¿
ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏ
ÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞß
àáâãäåæçèéêëìíîï
ðñòóôõö÷øùúûüýþÿ

 ｡｢｣､･ｦｧｨｩｪｫｬｭｮｯ
ｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿ
ﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏ
ﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝﾞﾟ

あいうえお かきくけこ
がぎぐげご がぎぐげご
𩸽𠀋𡈽𡌛𡑮 𡢽𠮟𡚴𡸴𣇄
😀👺👍🏻👨🏻‍💻🧑🏻 📸👨‍👩‍👧‍👦🍙🇯🇵🎌
﷽

 áÁâÂ´ÆæÀàℵΑα&∧∠
\`Åå≈ãÃÄä„Ββ¦•∩çÇ
¸¢Χχˆ♣≅©↵∪¤†‡↓⇓°
Δδ♦÷éÉêÊèÈ∅εΕ≡ηΗ
ÐðëË€∃ƒ∀½¼¾⁄γΓ≥>
↔⇔♥…íÍîÎ¡Ììℑ∞∫ιΙ
¿∈ÏïΚκΛλ〈«←⇐⌈“≤⌊
∗◊‹‘<¯—µ·−Μμ∇–≠∋
¬∉⊄ñÑΝνÓóôÔœŒÒò‾
ωΩΟο⊕∨ªºøØÕõ⊗Öö¶
∂‰⊥ΦφπΠϖ±£′″∏∝Ψψ
"√〉»→⇒⌉”ℜ®⌋Ρρ›’‚
Šš⋅§σΣς∼♠⊂⊆∑⊃¹²³
⊇ßτΤ∴θΘϑÞþ˜×™úÚ↑
⇑ÛûÙù¨ϒΥυÜü℘ξΞÝý
¥ŸÿζΖ
`

const lines = text.split('\n')

const encodeLine = (core: ((charInfo: CharInfo) => CharConvertResult), line: string): string => {
  let lineText = ''
  line
    .charInfos()
    .forEach(ci => {
      const result = core(ci)
      if (result.status) {
        lineText += result.text
      } else {
        assert.fail()
      }
    })
  return lineText
}

suite('encoding Test Suite', () => {
  test('encoding: encodeURI', () => {
    const core = toJsEncodeCore({
      isPassChar: isJsEncodeUriPassChar,
      isSkipNewLine: false,
    })
    lines.forEach(line => {
      const lineText = encodeLine(core, line)
      assert.strictEqual(lineText, encodeURI(line))
    })
  })

  test('encoding: encodeURIComponent', () => {
    const core = toJsEncodeCore({
      isPassChar: isJsEncodeUriComponentPassChar,
      isSkipNewLine: false,
    })
    lines.forEach(line => {
      const lineText = encodeLine(core, line)
      assert.strictEqual(lineText, encodeURIComponent(line))
    })
  })

  test('encoding: toRotEncode16', () => {
    const core = toRotEncodeCore({
      type: '16',
    })

    const testText = `
     !"#$%&'()*+,-./
    0123456789:;<=>?
    @ABCDEFGHIJKLMNO
    PQRSTUVWXYZ[\\]^_
    \`abcdefghijklmno
    pqrstuvwxyz{|}~ 
     ¡¢£¤¥¦§¨©ª«¬­®¯
    °±²³´µ¶·¸¹º»¼½¾¿
    ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏ
    ÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞß
    àáâãäåæçèéêëìíîï
    ðñòóôõö÷øùúûüýþÿ
    `.split('\n')

    const expectedText = `
     !"#$%&'()*+,-./
    0123456789:;<=>?
    @NOPQRSTUVWXYZAB
    CDEFGHIJKLM[\\]^_
    \`nopqrstuvwxyzab
    cdefghijklm{|}~ 
     ¡¢£¤¥¦§¨©ª«¬­®¯
    °±²³´µ¶·¸¹º»¼½¾¿
    ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏ
    ÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞß
    àáâãäåæçèéêëìíîï
    ðñòóôõö÷øùúûüýþÿ
    `.split('\n')

    for (let i = 0; i < testText.length; i++) {
      const testLine = testText[i]
      const expectedLine = expectedText[i]
      const actualLine = encodeLine(core, testLine)
      assert.strictEqual(actualLine, expectedLine)
    }
  })

  test('encoding: toRotEncode47', () => {
    const core = toRotEncodeCore({
      type: '47',
    })

    const testText = `
     !"#$%&'()*+,-./
    0123456789:;<=>?
    @ABCDEFGHIJKLMNO
    PQRSTUVWXYZ[\\]^_
    \`abcdefghijklmno
    pqrstuvwxyz{|}~ 
     ¡¢£¤¥¦§¨©ª«¬­®¯
    °±²³´µ¶·¸¹º»¼½¾¿
    ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏ
    ÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞß
    àáâãäåæçèéêëìíîï
    ðñòóôõö÷øùúûüýþÿ
    `.split('\n')

    const expectedText = `
     PQRSTUVWXYZ[\\]^
    _\`abcdefghijklmn
    opqrstuvwxyz{|}~
    !"#$%&'()*+,-./0
    123456789:;<=>?@
    ABCDEFGHIJKLMNO 
     ¡¢£¤¥¦§¨©ª«¬­®¯
    °±²³´µ¶·¸¹º»¼½¾¿
    ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏ
    ÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞß
    àáâãäåæçèéêëìíîï
    ðñòóôõö÷øùúûüýþÿ
    `.split('\n')

    for (let i = 0; i < testText.length; i++) {
      const testLine = testText[i]
      const expectedLine = expectedText[i]
      const actualLine = encodeLine(core, testLine)
      assert.strictEqual(actualLine, expectedLine)
    }
  })
})
