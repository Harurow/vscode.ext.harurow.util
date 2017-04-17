import * as assert from 'assert'
import * as vscode from 'vscode'

import {
    encodeRfc1866EucJp,
    encodeRfc1866ShiftJis,
    encodeRfc1866Utf8,
    encodeRfc3986EucJp,
    encodeRfc3986ShiftJis,
    encodeRfc3986Utf8,
} from '../../../src/commands/encodings/encode'

suite('commands/encodings/encode tests', () => {

    test('encodeRfc1866EucJp', () => {
        assert.equal(undefined, encodeRfc1866EucJp(undefined))
        assert.equal(null, encodeRfc1866EucJp(null))
        assert.equal('', encodeRfc1866EucJp(''))
        assert.equal('%00', encodeRfc1866EucJp('\x00'))
        assert.equal('+', encodeRfc1866EucJp(' '))
        assert.equal('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLNOPQRSUTVWXYZ0123456789-._~',
                     encodeRfc1866EucJp('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLNOPQRSUTVWXYZ0123456789-._~'))

        assert.equal('%3a%2f%3f%23%5b%5d%40%21%24%26%27%28%29%2a%2b%2c%3b%3d', encodeRfc1866EucJp(':/?#[]@!$&\'()*+,;='))
        assert.equal('+%21%22%23%24%25%26%27%28%29%2a%2b%2c-.%2f', encodeRfc1866EucJp(' !"#$%&\'()*+,-./'))
        assert.equal('0123456789%3a%3b%3c%3d%3e%3f', encodeRfc1866EucJp('0123456789:;<=>?'))
        assert.equal('%40ABCDEFGHIJKLMNO', encodeRfc1866EucJp('@ABCDEFGHIJKLMNO'))
        assert.equal('PQRSTUVWXYZ%5b%5c%5d%5e_', encodeRfc1866EucJp('PQRSTUVWXYZ[\\]^_'))
        assert.equal('%60abcdefghijklmno', encodeRfc1866EucJp('`abcdefghijklmno'))
        assert.equal('pqrstuvwxyz%7b%7c%7d~', encodeRfc1866EucJp('pqrstuvwxyz{|}~'))

        assert.equal('%a5%a6%a5%a3%a5%ad%a5%da%a5%c7%a5%a3%a5%a2', encodeRfc1866EucJp('ウィキペディア'))
    })

    test('encodeRfc1866ShiftJis', () => {
        assert.equal(undefined, encodeRfc1866ShiftJis(undefined))
        assert.equal(null, encodeRfc1866ShiftJis(null))
        assert.equal('', encodeRfc1866ShiftJis(''))
        assert.equal('%00', encodeRfc1866ShiftJis('\x00'))
        assert.equal('+', encodeRfc1866ShiftJis(' '))
        assert.equal('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLNOPQRSUTVWXYZ0123456789-._~',
                     encodeRfc1866ShiftJis('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLNOPQRSUTVWXYZ0123456789-._~'))

        assert.equal('%3a%2f%3f%23%5b%5d%40%21%24%26%27%28%29%2a%2b%2c%3b%3d', encodeRfc1866ShiftJis(':/?#[]@!$&\'()*+,;='))
        assert.equal('+%21%22%23%24%25%26%27%28%29%2a%2b%2c-.%2f', encodeRfc1866ShiftJis(' !"#$%&\'()*+,-./'))
        assert.equal('0123456789%3a%3b%3c%3d%3e%3f', encodeRfc1866ShiftJis('0123456789:;<=>?'))
        assert.equal('%40ABCDEFGHIJKLMNO', encodeRfc1866ShiftJis('@ABCDEFGHIJKLMNO'))
        assert.equal('PQRSTUVWXYZ%5b%5c%5d%5e_', encodeRfc1866ShiftJis('PQRSTUVWXYZ[\\]^_'))
        assert.equal('%60abcdefghijklmno', encodeRfc1866ShiftJis('`abcdefghijklmno'))
        assert.equal('pqrstuvwxyz%7b%7c%7d~', encodeRfc1866ShiftJis('pqrstuvwxyz{|}~'))

        assert.equal('%83E%83B%83L%83y%83f%83B%83A', encodeRfc1866ShiftJis('ウィキペディア'))
    })

    test('encodeRfc1866Utf8', () => {
        assert.equal(undefined, encodeRfc1866Utf8(undefined))
        assert.equal(null, encodeRfc1866Utf8(null))
        assert.equal('', encodeRfc1866Utf8(''))
        assert.equal('%00', encodeRfc1866Utf8('\x00'))
        assert.equal('+', encodeRfc1866Utf8(' '))
        assert.equal('++', encodeRfc1866Utf8('  '))
        assert.equal('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLNOPQRSUTVWXYZ0123456789-._~',
                     encodeRfc1866Utf8('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLNOPQRSUTVWXYZ0123456789-._~'))

        assert.equal('%3a%2f%3f%23%5b%5d%40%21%24%26%27%28%29%2a%2b%2c%3b%3d', encodeRfc1866Utf8(':/?#[]@!$&\'()*+,;='))
        assert.equal('+%21%22%23%24%25%26%27%28%29%2a%2b%2c-.%2f', encodeRfc1866Utf8(' !"#$%&\'()*+,-./'))
        assert.equal('0123456789%3a%3b%3c%3d%3e%3f', encodeRfc1866Utf8('0123456789:;<=>?'))
        assert.equal('%40ABCDEFGHIJKLMNO', encodeRfc1866Utf8('@ABCDEFGHIJKLMNO'))
        assert.equal('PQRSTUVWXYZ%5b%5c%5d%5e_', encodeRfc1866Utf8('PQRSTUVWXYZ[\\]^_'))
        assert.equal('%60abcdefghijklmno', encodeRfc1866Utf8('`abcdefghijklmno'))
        assert.equal('pqrstuvwxyz%7b%7c%7d~', encodeRfc1866Utf8('pqrstuvwxyz{|}~'))

        assert.equal('%e3%82%a6%e3%82%a3%e3%82%ad%e3%83%9a%e3%83%87%e3%82%a3%e3%82%a2', encodeRfc1866Utf8('ウィキペディア'))

        assert.equal('%f0%a9%b8%bd+%f0%a9%b8%bd+%f0%a9%b8%bd', encodeRfc1866Utf8('\u{29e3d} 𩸽 \ud867\ude3d'))
        assert.equal('%f0%a0%ae%9f+%f0%a0%ae%9f+%f0%a0%ae%9f', encodeRfc1866Utf8('\u{20b9f} 𠮟 \ud842\udf9f'))
    })

    test('encodeRfc3986EucJp', () => {
        assert.equal(undefined, encodeRfc3986EucJp(undefined))
        assert.equal(null, encodeRfc3986EucJp(null))
        assert.equal('', encodeRfc3986EucJp(''))
        assert.equal('%00', encodeRfc3986EucJp('\x00'))
        assert.equal('%20', encodeRfc3986EucJp(' '))
        assert.equal('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLNOPQRSUTVWXYZ0123456789-._~',
                     encodeRfc3986EucJp('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLNOPQRSUTVWXYZ0123456789-._~'))

        assert.equal('%3a%2f%3f%23%5b%5d%40%21%24%26%27%28%29%2a%2b%2c%3b%3d', encodeRfc3986EucJp(':/?#[]@!$&\'()*+,;='))
        assert.equal('%20%21%22%23%24%25%26%27%28%29%2a%2b%2c-.%2f', encodeRfc3986EucJp(' !"#$%&\'()*+,-./'))
        assert.equal('0123456789%3a%3b%3c%3d%3e%3f', encodeRfc3986EucJp('0123456789:;<=>?'))
        assert.equal('%40ABCDEFGHIJKLMNO', encodeRfc3986EucJp('@ABCDEFGHIJKLMNO'))
        assert.equal('PQRSTUVWXYZ%5b%5c%5d%5e_', encodeRfc3986EucJp('PQRSTUVWXYZ[\\]^_'))
        assert.equal('%60abcdefghijklmno', encodeRfc3986EucJp('`abcdefghijklmno'))
        assert.equal('pqrstuvwxyz%7b%7c%7d~', encodeRfc3986EucJp('pqrstuvwxyz{|}~'))

        assert.equal('%a5%a6%a5%a3%a5%ad%a5%da%a5%c7%a5%a3%a5%a2', encodeRfc3986EucJp('ウィキペディア'))
    })

    test('encodeRfc3986ShiftJis', () => {
        assert.equal(undefined, encodeRfc3986ShiftJis(undefined))
        assert.equal(null, encodeRfc3986ShiftJis(null))
        assert.equal('', encodeRfc3986ShiftJis(''))
        assert.equal('%00', encodeRfc3986ShiftJis('\x00'))
        assert.equal('%20', encodeRfc3986ShiftJis(' '))
        assert.equal('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLNOPQRSUTVWXYZ0123456789-._~',
                     encodeRfc3986ShiftJis('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLNOPQRSUTVWXYZ0123456789-._~'))

        assert.equal('%3a%2f%3f%23%5b%5d%40%21%24%26%27%28%29%2a%2b%2c%3b%3d', encodeRfc3986ShiftJis(':/?#[]@!$&\'()*+,;='))
        assert.equal('%20%21%22%23%24%25%26%27%28%29%2a%2b%2c-.%2f', encodeRfc3986ShiftJis(' !"#$%&\'()*+,-./'))
        assert.equal('0123456789%3a%3b%3c%3d%3e%3f', encodeRfc3986ShiftJis('0123456789:;<=>?'))
        assert.equal('%40ABCDEFGHIJKLMNO', encodeRfc3986ShiftJis('@ABCDEFGHIJKLMNO'))
        assert.equal('PQRSTUVWXYZ%5b%5c%5d%5e_', encodeRfc3986ShiftJis('PQRSTUVWXYZ[\\]^_'))
        assert.equal('%60abcdefghijklmno', encodeRfc3986ShiftJis('`abcdefghijklmno'))
        assert.equal('pqrstuvwxyz%7b%7c%7d~', encodeRfc3986ShiftJis('pqrstuvwxyz{|}~'))

        assert.equal('%83E%83B%83L%83y%83f%83B%83A', encodeRfc3986ShiftJis('ウィキペディア'))
    })

    test('encodeRfc3986Utf8', () => {
        assert.equal(undefined, encodeRfc3986Utf8(undefined))
        assert.equal(null, encodeRfc3986Utf8(null))
        assert.equal('', encodeRfc3986Utf8(''))
        assert.equal('%00', encodeRfc3986Utf8('\x00'))
        assert.equal('%20', encodeRfc3986Utf8(' '))
        assert.equal('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLNOPQRSUTVWXYZ0123456789-._~',
                     encodeRfc3986Utf8('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLNOPQRSUTVWXYZ0123456789-._~'))

        assert.equal('%3a%2f%3f%23%5b%5d%40%21%24%26%27%28%29%2a%2b%2c%3b%3d', encodeRfc3986Utf8(':/?#[]@!$&\'()*+,;='))
        assert.equal('%20%21%22%23%24%25%26%27%28%29%2a%2b%2c-.%2f', encodeRfc3986Utf8(' !"#$%&\'()*+,-./'))
        assert.equal('0123456789%3a%3b%3c%3d%3e%3f', encodeRfc3986Utf8('0123456789:;<=>?'))
        assert.equal('%40ABCDEFGHIJKLMNO', encodeRfc3986Utf8('@ABCDEFGHIJKLMNO'))
        assert.equal('PQRSTUVWXYZ%5b%5c%5d%5e_', encodeRfc3986Utf8('PQRSTUVWXYZ[\\]^_'))
        assert.equal('%60abcdefghijklmno', encodeRfc3986Utf8('`abcdefghijklmno'))
        assert.equal('pqrstuvwxyz%7b%7c%7d~', encodeRfc3986Utf8('pqrstuvwxyz{|}~'))

        assert.equal('%e3%82%a6%e3%82%a3%e3%82%ad%e3%83%9a%e3%83%87%e3%82%a3%e3%82%a2', encodeRfc3986Utf8('ウィキペディア'))

        assert.equal('%f0%a9%b8%bd%20%f0%a9%b8%bd%20%f0%a9%b8%bd', encodeRfc3986Utf8('\u{29e3d} 𩸽 \ud867\ude3d'))
        assert.equal('%f0%a0%ae%9f%20%f0%a0%ae%9f%20%f0%a0%ae%9f', encodeRfc3986Utf8('\u{20b9f} 𠮟 \ud842\udf9f'))
    })

})
