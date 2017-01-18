'use strict'

import * as vscode from 'vscode'
import * as clipboard from 'copy-paste'
import * as htmlchars from './htmlchars'

function stringToChars(value: string) : string[] {
    return value.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) || []
}

export function toHtml(value: string): string {
    let result = ''

    stringToChars(value).forEach(ch => {
        let tmp = htmlchars.SpecialChars[ch]
        if (tmp === undefined) {
            result += ch
        } else {
            result += tmp
        }
    })

    return result
}

export function toHtmlAll(value: string): string {
    let result = ''

    stringToChars(value).forEach(ch => {
        let tmp = htmlchars.SpecialChars[ch]
        if (tmp === undefined) {
            result += `&#x${ch.codePointAt(0).toString(16)};`
        } else {
            result += tmp
        }
    })

    return result
}

export function toUnicode(value: string): string {
    let result = ''

    stringToChars(value).forEach(ch => {
        var code = ch.codePointAt(0)
        if (code > 0xffff) {
            let un = code - 0x10000
            let hi = Math.floor(un / 0x400) + 0xd800
            let lo = un % 0x400 + 0xdc00
            result += `\\u${hi.toString(16)}\\u${lo.toString(16)}`
        } else {
            var codestr = ('000' + code.toString(16)).slice(-4)
            result += `\\u${codestr}`
        }
    })

    return result
}

export function fromHtmlAll(value: string): string {
    return value
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
