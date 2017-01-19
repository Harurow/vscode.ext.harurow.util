'use strict'

import * as vscode from 'vscode'
import * as clipboard from 'copy-paste'

import * as util from './util'
import * as htmlchars from './htmlchars'


function toHtmlInternal(value: string, undefFunc: (ch: string)=>string) :string {
    if (!value) {
        return value
    }

    let result = ''

    util.strToChars(value).forEach(ch => {
        let tmp = htmlchars.SpecialChars[ch]
        if (tmp === undefined) {
            result += undefFunc(ch)
        } else {
            result += tmp
        }
    })

    return result
}

export function toHtml(value: string): string {
    return toHtmlInternal(value, ch => ch)
}

export function toHtmlAll(value: string): string {
    return toHtmlInternal(value, ch => `&#x${ch.codePointAt(0).toString(16)};`)
}

var toUni = (code: number) => `\\u${util.toHex(code, 4)}`
var toChr = (c: number) => String.fromCodePoint(c)

function toUnicodeInternal(value: string, funcAscii: (c: number) => string) : string {
    if (!value) {
        return value
    }

    let result = ''

    util.strToChars(value).forEach(ch => {
        var code = ch.codePointAt(0)
        if (code <= 0x7f) {
            result += funcAscii(code)
        } else if (code <= 0xffff) {
            result += toUni(code)
        } else {
            var sur = util.toSurrogatePair(code)
            result += `\\u${sur.hi.toString(16)}\\u${sur.lo.toString(16)}`
        }
    })

    return result
}

export function toUnicode(value: string): string {
    return toUnicodeInternal(value, toChr)
}

export function toUnicodeAll(value: string): string {
    return toUnicodeInternal(value, toUni)
}

function parseHtmlSymbol(value: string): string {
    if (value.match(/^&#x([0-9A-Fa-f]+);$/g)) {
        let hex = value.substr(3, value.length - 4)
        let code = Number.parseInt(hex, 16)
        return String.fromCodePoint(code)
    }

    if (value.match(/^&#([0-9]+);$/g)) {
        let dec = value.substr(2, value.length - 3)
        let code = Number.parseInt(dec, 10)
        return String.fromCodePoint(code)
    }

    let symb = htmlchars.SpecialCharsRev[value]
    return symb === undefined
        ? value
        : symb
}

type HtmlDecodeMode = 'NORMAL' | 'AMP' | 'AMP_DATA' | 'ABORT'

export function fromHtmlAll(value: string): string {
    if (!value) {
        return value
    }

    let results = ''
    let buf = ''
    let mode = 'NORMAL'

    util.strToChars(value).forEach(ch => {
        switch (mode) {
        case 'NORMAL':
            if (ch === '&') {
                buf = ch
                mode = 'AMP'
            } else {
                results += ch
            }
            break
        case 'AMP':
            if (ch === ';') {
                results += '&;'
                buf = ''
                mode = 'NORMAL'
            } else {
                buf += ch
                mode = 'AMP_DATA'
            }
            break
        case 'AMP_DATA':
            if (ch === ';') {
                buf += ch
                results += parseHtmlSymbol(buf)
                buf = ''
                mode = 'NORMAL'
            } else {
                buf += ch
                mode = 'AMP_DATA'
            }
            break
        }
    })

    results += buf

    return results
}

export function fromUnicode(value: string): string {
    // hi = U+D800 〜 U+DBFF
    // lo = U+DC00 〜 U+DFFF
    return value
}

export async function getContent(): Promise<string> {
    return await new Promise<string>((resolve, reject) => {
        clipboard.paste((err, content) => {
            if (err) {
                reject(err)
            } else {
                resolve(content)
            }
        })
    })
}
