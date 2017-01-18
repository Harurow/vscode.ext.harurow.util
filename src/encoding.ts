'use strict'

import * as vscode from 'vscode'
import * as encja from 'encoding-japanese'

function isUnReservedChar(c: number): boolean {
    return 0x41 <= c && c <= 0x5A   // A-Z
        || 0x61 <= c && c <= 0x7A   // a-z
        || 0x30 <= c && c <= 0x39   // 0-9
        || c == 0x2D                // -
        || c == 0x2E                // .
        || c == 0x5F                // _
        || c == 0x7E                // ~
}

function hex(c: number): string {
    return "%" + ("0" + c.toString(16)).slice(-2)
}

function encode(value: string, sp: string, enc: (ch: string) => string): string {
    let result = ""

    value.split('').forEach(ch => {
        let c = ch.charCodeAt(0)
        if (c <= 0xFF) {
            if (isUnReservedChar(c)) {
                result += ch;
            } else if (c == 0x20) {
                result += sp
            } else {
                result += hex(c)
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

function isHexChar(ch: string) {
    var num = ch.charCodeAt(0)
    return 0x30 <= num && num <= 0x39
        || 0x41 <= num && num <= 0x46
        || 0x61 <= num && num <= 0x66
}
function toHexFromChar(ch: string) {
    var num = ch.charCodeAt(0)
    if (0x30 <= num && num <= 0x39) {
        return num - 0x30;
    } else if (0x41 <= num && num <= 0x46) {
        return 10 + (num - 0x41);
    } else if (0x61 <= num && num <= 0x66) {
        return 10 + (num - 0x61);
    }
}

type DecodeMode = 'NORMAL' | 'NORMAL_BUF' | 'PERCENT1' | 'PERCENT2' | 'ABORT'

function decode(value: string, encoding: encja.Encoding): string {
    let results = ''
    let buf: string = ''
    let bufChunk: string = ''
    let mode: DecodeMode = 'NORMAL'

    value.split('').forEach(ch => {
        switch (mode) {
            case 'NORMAL':
                if (ch === '%') {
                    mode = 'PERCENT1'
                    buf = ch
                } else {
                    console.log(ch)
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
                if (isHexChar(ch)) {
                    mode = 'PERCENT2'
                } else {
                    mode = 'ABORT'
                }
                break
            case 'PERCENT2':
                buf += ch
                if (isHexChar(ch)) {
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
                console.log(bufChunk)
                results += decodeUrlString(bufChunk, encoding)
                bufChunk = ''
            }
            console.log(buf)
            results += buf
            buf = ''
            mode = 'NORMAL'
        }
    })

    if (bufChunk !== '') {
        console.log(bufChunk)
        results += decodeUrlString(bufChunk, encoding)
        bufChunk = ''
    }
    console.log(buf)
    results += buf

    return results
}

function encodeUnicode(ch: string, encoding: encja.Encoding) {
    let result = ""
    let arr = []
    arr.push(ch.charCodeAt(0))

    encja.convert(arr, encoding, "UNICODE").forEach((c) => {
        result += isUnReservedChar(c)
            ? String.fromCharCode(c)
            : hex(c)
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
    return decode(value.replace("+", "%20"), "SJIS")
}

export function fromRfc3986EucJp(value: string): string {
    return decode(value.replace("+", "%20"), "EUCJP")
}

export function fromRfc3986Utf8(value: string): string {
    return decode(value.replace("+", "%20"), "UTF8")
}
