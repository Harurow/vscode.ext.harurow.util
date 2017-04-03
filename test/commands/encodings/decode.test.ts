import * as assert from 'assert'
import * as vscode from 'vscode'

import {
    encodeRfc1866EucJp,
    encodeRfc1866ShiftJis,
    encodeRfc1866Utf8,
    encodeRfc3986EucJp,
    encodeRfc3986ShiftJis,
    encodeRfc3986Utf8,
} from '../../../src/__/commands/encodings/encode'

import {
    decodeRfc1866EucJp,
    decodeRfc1866ShiftJis,
    decodeRfc1866Utf8,
    decodeRfc3986EucJp,
    decodeRfc3986ShiftJis,
    decodeRfc3986Utf8,
} from '../../../src/__/commands/encodings/decode'

suite('commands/encodings/decode tests', () => {

    const eq = (str: string, enc: (str: string) => string, dec: (str: string) => string) =>
        assert.equal(str, dec(enc(str)))

    test('decodeRfc1866EucJp', () => {
        assert.equal(undefined, decodeRfc1866EucJp(undefined))
        assert.equal(null, decodeRfc1866EucJp(null))
        assert.equal('', decodeRfc1866EucJp(''))
        assert.equal(' ', decodeRfc1866EucJp('+'))
    })

    test('decodeRfc1866ShiftJis', () => {
        assert.equal(undefined, decodeRfc1866ShiftJis(undefined))
        assert.equal(null, decodeRfc1866ShiftJis(null))
        assert.equal('', decodeRfc1866ShiftJis(''))
        assert.equal(' ', decodeRfc1866ShiftJis('+'))
    })

    test('decodeRfc1866Utf8', () => {
        assert.equal(undefined, decodeRfc1866Utf8(undefined))
        assert.equal(null, decodeRfc1866Utf8(null))
        assert.equal('', decodeRfc1866Utf8(''))
        assert.equal('  ', decodeRfc1866Utf8('++'))
    })

    test('decodeRfc3986EucJp', () => {
        assert.equal(undefined, decodeRfc3986EucJp(undefined))
        assert.equal(null, decodeRfc3986EucJp(null))
        assert.equal('', decodeRfc3986EucJp(''))
        assert.equal(' ', decodeRfc3986EucJp('%20'))
    })

    test('decodeRfc3986ShiftJis', () => {
        assert.equal(undefined, decodeRfc3986ShiftJis(undefined))
        assert.equal(null, decodeRfc3986ShiftJis(null))
        assert.equal('', decodeRfc3986ShiftJis(''))
        assert.equal(' ', decodeRfc3986ShiftJis('%20'))
    })

    test('decodeRfc3986Utf8', () => {
        assert.equal(undefined, decodeRfc3986Utf8(undefined))
        assert.equal(null, decodeRfc3986Utf8(null))
        assert.equal('', decodeRfc3986Utf8(''))
        assert.equal(' ', decodeRfc3986Utf8('%20'))
    })

    let funcs = [
        { enc: encodeRfc1866EucJp, dec: decodeRfc1866EucJp },
        { enc: encodeRfc3986EucJp, dec: decodeRfc3986EucJp },
        { enc: encodeRfc1866ShiftJis, dec: decodeRfc1866ShiftJis },
        { enc: encodeRfc3986ShiftJis, dec: decodeRfc3986ShiftJis },
    ]
    let funcsForUnicode = [
        { enc: encodeRfc1866Utf8, dec: decodeRfc1866Utf8 },
        { enc: encodeRfc3986Utf8, dec: decodeRfc3986Utf8 },
    ]

    let strings = [
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLNOPQRSUTVWXYZ0123456789-._~',
        '%3a%2f%3f%23%5b%5d%40%21%24%26%27%28%29%2a%2b%2c%3b%3d', ':/?#[]@!$&\'()*+,;=',
        '+%21%22%23%24%25%26%27%28%29%2a%2b%2c-.%2f', ' !"#$%&\'()*+,-./',
        '0123456789%3a%3b%3c%3d%3e%3f', '0123456789:;<=>?',
        '%40ABCDEFGHIJKLMNO', '@ABCDEFGHIJKLMNO',
        'PQRSTUVWXYZ%5b%5c%5d%5e_', 'PQRSTUVWXYZ[\\]^_',
        '%60abcdefghijklmno', '`abcdefghijklmno',
        'pqrstuvwxyz%7b%7c%7d~', 'pqrstuvwxyz{|}~',
        '%a5%a6%a5%a3%a5%ad%a5%da%a5%c7%a5%a3%a5%a2', 'ウィキペディア',
        '%20%21%22%23%24%25%26%27%28%29%2a%2b%2c-.%2f', ' !"#$%&\'()*+,-./',
    ]

    let unicode = [
        '%f0%a9%b8%bd+%f0%a9%b8%bd+%f0%a9%b8%bd', '\u{29e3d} 𩸽 \ud867\ude3d',
        '%f0%a0%ae%9f+%f0%a0%ae%9f+%f0%a0%ae%9f', '\u{20b9f} 𠮟 \ud842\udf9f',
    ]

    funcs.forEach(f => strings.forEach(s => eq(s, f.enc, f.dec)))

    funcsForUnicode.forEach(f => {
        strings.forEach(s => eq(s, f.enc, f.dec))
        unicode.forEach(s => eq(s, f.enc, f.dec))
    })

})
