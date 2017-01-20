'use strict'

import * as vscode from 'vscode'
import * as encja from 'encoding-japanese'
import * as util from './util'

function isUnReservedChar(c: number): boolean {
    return 0x41 <= c && c <= 0x5A   // A-Z
        || 0x61 <= c && c <= 0x7A   // a-z
        || 0x30 <= c && c <= 0x39   // 0-9
        || c == 0x2D                // -
        || c == 0x2E                // .
        || c == 0x5F                // _
        || c == 0x7E                // ~
}

function encode(value: string, sp: string, enc: (ch: string) => string): string {
    if (!value) {
        return value
    }

    let result = ""

    util.strToChars(value).forEach(ch => {
        let c = ch.codePointAt(0)
        if (c <= 0xFF) {
            if (isUnReservedChar(c)) {
                result += ch;
            } else if (c == 0x20) {
                result += sp
            } else {
                result += "%" + util.toHex(c)
            }
        } else {
            result += enc(ch)
        }
    })

    return result
}

function decodeUrlString(value: string, encoding: encja.Encoding): string {
    let code = encja.urlDecode(value)
    let decoded = encja.convert(code, "UNICODE", encoding)
    return encja.codeToString(decoded)
}

type DecodeMode = 'NORMAL' | 'NORMAL_BUF' | 'PERCENT1' | 'PERCENT2' | 'ABORT'

function decode(value: string, encoding: encja.Encoding): string {
    if (!value) {
        return value
    }

    let results = ''
    let buf: string = ''
    let bufChunk: string = ''
    let mode: DecodeMode = 'NORMAL'

    util.strToChars(value).forEach(ch => {
        switch (mode) {
        case 'NORMAL':
            if (ch === '%') {
                mode = 'PERCENT1'
                buf = ch
            } else {
                results += ch
            }
            break
        case 'NORMAL_BUF':
            if (ch === '%') {
                mode = 'PERCENT1'
                buf = ch
            } else if (isUnReservedChar(ch.codePointAt(0))) {
                bufChunk += ch
            } else {
                results += decodeUrlString(bufChunk, encoding)
                bufChunk = ''
                results += ch
                mode = 'NORMAL'
            }
            break
        case 'PERCENT1':
            buf += ch
            if (util.isHexChar(ch)) {
                mode = 'PERCENT2'
            } else {
                mode = 'ABORT'
            }
            break
        case 'PERCENT2':
            buf += ch
            if (util.isHexChar(ch)) {
                mode = 'NORMAL_BUF'
                bufChunk += buf
                buf = ''
            } else {
                mode = 'ABORT'
            }
            break
        }

        if (mode === 'ABORT') {
            if (bufChunk !== '') {
                results += decodeUrlString(bufChunk, encoding)
                bufChunk = ''
            }
            results += buf
            buf = ''
            mode = 'NORMAL'
        }
    })

    if (bufChunk !== '') {
        results += decodeUrlString(bufChunk, encoding)
        bufChunk = ''
    }
    results += buf

    return results
}

function encodeUnicode(ch: string, encoding: encja.Encoding) {
    let result = ""
    let code = encja.stringToCode(ch)

    encja.convert(code, encoding, "UNICODE").forEach((c) => {
        result += isUnReservedChar(c)
            ? String.fromCharCode(c)
            : "%" + util.toHex(c)
    })

    return result
}

function encShiftJis(ch: string): string {
    return encodeUnicode(ch, "SJIS")
}

function encEucJp(ch: string): string {
    return encodeUnicode(ch, "EUCJP")
}

function encUtf8(ch: string): string {
    return encodeUnicode(ch, "UTF8")
}

export function toRfc3986ShiftJis(value: string): string {
    return encode(value, "%20", encShiftJis)
}

export function toRfc3986EucJp(value: string): string {
    return encode(value, "%20", encEucJp)
}

export function toRfc3986Utf8(value: string): string {
    return encode(value, "%20", encUtf8)
}

export function toRfc1866ShiftJis(value: string): string {
    return encode(value, "+", encShiftJis)
}

export function toRfc1866EucJp(value: string): string {
    return encode(value, "+", encEucJp)
}

export function toRfc1866Utf8(value: string): string {
    return encode(value, "+", encUtf8)
}

export function fromRfc3986ShiftJis(value: string): string {
    return decode(util.safeReplace(value, "+", "%20"), "SJIS")
}

export function fromRfc3986EucJp(value: string): string {
    return decode(util.safeReplace(value, "+", "%20"), "EUCJP")
}

export function fromRfc3986Utf8(value: string): string {
    return decode(util.safeReplace(value, "+", "%20"), "UTF8")
}
