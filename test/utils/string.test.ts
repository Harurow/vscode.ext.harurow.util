import * as assert from 'assert'
import * as vscode from 'vscode'

import * as $ from '../../src/utils/string'

suite('utils/string tests', () => {

    test('isValidStr', () => {
        assert.equal(false, $.isValidStr(undefined))
        assert.equal(false, $.isValidStr(null))
        assert.equal(false, $.isValidStr(''))
        assert.equal(true, $.isValidStr(' '))
        assert.equal(true, $.isValidStr('_'))
        assert.equal(true, $.isValidStr('0'))
        assert.equal(true, $.isValidStr('a'))
    })

    test('hasChar', () => {
        assert.equal(false, $.hasChar(undefined))
        assert.equal(false, $.hasChar(null))
        assert.equal(false, $.hasChar(''))
        assert.equal(true, $.hasChar('0'))
        assert.equal(true, $.hasChar(' '))
    })

    test('isUnderscore', () => {
        assert.equal(false, $.isUnderscore(undefined))
        assert.equal(false, $.isUnderscore(null))
        assert.equal(false, $.isUnderscore(''))
        assert.equal(false, $.isUnderscore('0'))
        assert.equal(false, $.isUnderscore(' '))
        assert.equal(false, $.isUnderscore('a__'))
        assert.equal(false, $.isUnderscore('_a_'))
        assert.equal(false, $.isUnderscore('__a'))
        assert.equal(true, $.isUnderscore('_'))
        assert.equal(true, $.isUnderscore('__'))
    })

    test('isValidIdentifier', () => {
        assert.equal(false, $.isValidIdentifier(undefined))
        assert.equal(false, $.isValidIdentifier(null))
        assert.equal(false, $.isValidIdentifier(''))
        assert.equal(false, $.isValidIdentifier(' '))
        assert.equal(false, $.isValidIdentifier('0'))
        assert.equal(false, $.isValidIdentifier('9'))
        assert.equal(true, $.isValidIdentifier('_'))
        assert.equal(true, $.isValidIdentifier('a'))
        assert.equal(true, $.isValidIdentifier('z'))
        assert.equal(true, $.isValidIdentifier('A'))
        assert.equal(true, $.isValidIdentifier('Z'))
        assert.equal(true, $.isValidIdentifier('word'))
        assert.equal(true, $.isValidIdentifier('Word'))
        assert.equal(true, $.isValidIdentifier('IdentifierWord'))
        assert.equal(true, $.isValidIdentifier('identifier0_word'))
        assert.equal(false, $.isValidIdentifier(' invalid'))
        assert.equal(false, $.isValidIdentifier('invalid '))
        assert.equal(false, $.isValidIdentifier(' invalid '))
    })

    test('words', () => {
        assert.equal(undefined, $.words('0'))
        assert.equal(undefined, $.words(undefined))
        assert.deepEqual(['_'], $.words('_'))
        assert.deepEqual(['__'], $.words('__'))
        assert.deepEqual(['a'], $.words('a'))
        assert.deepEqual(['aa'], $.words('aa'))
        assert.deepEqual(['_', '0'], $.words('_0'))
        assert.deepEqual(['aa', '09'], $.words('aa09'))
        assert.deepEqual(['This', 'Is', 'Word'], $.words('ThisIsWord'))
        assert.deepEqual(['this', 'Is', 'Word'], $.words('thisIsWord'))
        assert.deepEqual(['THIS', '_', 'IS', '_', 'WORD'], $.words('THIS_IS_WORD'))
        assert.deepEqual(['DBConnect'], $.words('DBConnect'))
        assert.deepEqual(['This', 'Is', 'Pascal'], $.words('ThisIsPascal'))
        assert.deepEqual(['this', 'Is', 'Pascal'], $.words('thisIsPascal'))
        assert.deepEqual(['this', '_', 'is', '_', 'pascal'], $.words('this_is_pascal'))
        assert.deepEqual(['THIS', '_', 'IS', '_', 'PASCAL'], $.words('THIS_IS_PASCAL'))
        assert.deepEqual(['This', 'Is', 'Pascal', '99'], $.words('ThisIsPascal99'))
        assert.deepEqual(['this', 'Is', 'Pascal', '99'], $.words('thisIsPascal99'))
        assert.deepEqual(['this', '_', 'is', '_', 'pascal', '99'], $.words('this_is_pascal99'))
        assert.deepEqual(['THIS', '_', 'IS', '_', 'PASCAL', '99'], $.words('THIS_IS_PASCAL99'))
        assert.deepEqual(['this', '_', 'is', '_', 'pascal', '_', '99'], $.words('this_is_pascal_99'))
        assert.deepEqual(['THIS', '_', 'IS', '_', 'PASCAL', '_', '99'], $.words('THIS_IS_PASCAL_99'))
        assert.deepEqual(['this', '_', 'is', '_', '99', 'pascal'], $.words('this_is_99pascal'))
        assert.deepEqual(['THIS', '_', 'IS', '_', '99', 'PASCAL'], $.words('THIS_IS_99PASCAL'))
        assert.deepEqual(['this', '_', 'is', '_', '99', '_', 'pascal'], $.words('this_is_99_pascal'))
        assert.deepEqual(['THIS', '_', 'IS', '_', '99', '_', 'PASCAL'], $.words('THIS_IS_99_PASCAL'))
    })

    test('lines', () => {
        assert.equal(undefined, $.lines(undefined))
        assert.equal(undefined, $.lines(null))

        assert.deepEqual([''], $.lines(''))

        assert.deepEqual([''], $.lines('\r'))
        assert.deepEqual([''], $.lines('\n'))
        assert.deepEqual([''], $.lines('\r\n'))

        assert.deepEqual(['a'], $.lines('a'))
        assert.deepEqual(['a'], $.lines('a'))
        assert.deepEqual(['a'], $.lines('a'))

        assert.deepEqual(['a'], $.lines('a\r'))
        assert.deepEqual(['a'], $.lines('a\n'))
        assert.deepEqual(['a'], $.lines('a\r\n'))

        assert.deepEqual(['', 'a'], $.lines('\ra'))
        assert.deepEqual(['', 'a'], $.lines('\na'))
        assert.deepEqual(['', 'a'], $.lines('\r\na'))

        assert.deepEqual(['c', 'a'], $.lines('c\ra'))
        assert.deepEqual(['c', 'a'], $.lines('c\na'))
        assert.deepEqual(['c', 'a'], $.lines('c\r\na'))
    })

    test('chars', () => {
        assert.deepEqual([], $.chars(undefined))
        assert.deepEqual([], $.chars(null))
        assert.deepEqual([], $.chars(''))

        assert.deepEqual(['0'], $.chars('0'))
        assert.deepEqual([' '], $.chars(' '))
        assert.deepEqual(['_'], $.chars('_'))
        assert.deepEqual([' ', ' '], $.chars('  '))
        assert.deepEqual(['a', 'b', 'c'], $.chars('abc'))
        assert.deepEqual(['あ', 'い', 'う'], $.chars('あいう'))
        assert.deepEqual(['𠮟', ' ', '𠮟', ' ', '𠮟'], $.chars('\u{20b9f} 𠮟 \ud842\udf9f'))
        assert.deepEqual(['\u{20b9f}', ' ', '\u{20b9f}', ' ', '\u{20b9f}'], $.chars('\u{20b9f} 𠮟 \ud842\udf9f'))
        assert.deepEqual(['\ud842\udf9f', ' ', '\ud842\udf9f', ' ', '\ud842\udf9f'], $.chars('\u{20b9f} 𠮟 \ud842\udf9f'))
        assert.deepEqual(['0', '%', '2', '0'], $.chars('0%20'))
        assert.deepEqual(['\u{20b9f}', ' ', '\u{20b9f}', ' ', '%', '7', 'e',  '\u{20b9f}'], $.chars('\u{20b9f} 𠮟 %7e\ud842\udf9f'))
    })

    test('codePoints', () => {
        assert.deepEqual([], $.codePoints(undefined))
        assert.deepEqual([], $.codePoints(null))
        assert.deepEqual([], $.codePoints(''))

        assert.deepEqual([{char: '0', code: 0x30}], $.codePoints('0'))
        assert.deepEqual([{char: ' ', code: 0x20}], $.codePoints(' '))
        assert.deepEqual([{char: '_', code: 0x5f}], $.codePoints('_'))
        assert.deepEqual([{char: ' ', code: 0x20}, {char: ' ', code: 0x20}], $.codePoints('  '))
        assert.deepEqual([{char: 'a', code: 0x61}, {char: 'b', code: 0x62}, {char: 'c', code: 0x63}], $.codePoints('abc'))
        assert.deepEqual([{char: 'あ', code: 0x3042}, {char: 'い', code: 0x3044}, {char: 'う', code: 0x3046}], $.codePoints('あいう'))
        assert.deepEqual([{char: '𠮟', code: 0x20b9f}], $.codePoints('\u{20b9f}'))
        assert.deepEqual([{char: '𠮟', code: 0x20b9f}], $.codePoints('𠮟'))
        assert.deepEqual([{char: '𩸽', code: 0x29e3d}], $.codePoints('𩸽'))

        assert.deepEqual([{char: '%', code: 0x25}, {char: '2', code: 0x32}, {char: '0', code: 0x30}], $.codePoints('%20'))
        assert.deepEqual([{char: '%', code: 0x25}, {char: '3', code: 0x33}, {char: '0', code: 0x30}, {char: 'a', code: 0x61}], $.codePoints('%30a'))
    })

    test('hex', () => {
        assert.equal(undefined, $.hex(null))
        assert.equal(undefined, $.hex(undefined))
        assert.equal(undefined, $.hex(-1))
        assert.equal('00', $.hex(0))
        assert.equal('ff', $.hex(255))
        assert.equal('100', $.hex(256))
    })

    test('surrogatePair', () => {
        assert.equal(undefined, $.surrogatePair(null))
        assert.equal(undefined, $.surrogatePair(undefined))
        assert.equal(undefined, $.surrogatePair(-1))
        assert.deepEqual({hi: 0xd842, lo: 0xdf9f}, $.surrogatePair(0x20b9f))
    })
})
