import {
    isValidStr,
    chars,
    hex,
    SurrogatePair,
    surrogatePair,
} from '../../utils'

export const escapeUnicode = (str: string) =>
    escapeInternal(str, thru)

export const escapeUnicodeAll = (str: string) =>
    escapeInternal(str, toUnicode)

export const unescapeUnicode = (str: string) =>
    !isValidStr(str)
        ? str
        : escapedChars(str).map(unescapeChar)
                           .join('')

const formatUnicode = (cp: number) =>
    cp <= 0xffff
        ? `\\u${hex(cp, 4)}`
        : formatSurrogate(toSurrogate(cp))

const toSurrogate = (code: number) =>
    surrogatePair(code)

const formatSurrogate = (sp: SurrogatePair) =>
    `\\u${hex(sp.hi, 4)}\\u${hex(sp.lo, 4)}`

const toCodePoint = (ch: string) =>
    ch.codePointAt(0)

const escapeChar = (ch: string, asciiConverter: (ch: string) => string) =>
    toCodePoint(ch) < 0x7f
        ? asciiConverter(ch)
        : formatUnicode(toCodePoint(ch))

const thru = (ch: string) => ch

const toUnicode = (ch: string) =>
    formatUnicode(toCodePoint(ch))

const escapeInternal = (str: string, asciiConverter: (ch: string) => string) =>
    !isValidStr(str)
        ? str
        : chars(str).map(ch => escapeChar(ch, asciiConverter))
                    .join('')

const escapedChars = (str: string) =>
    str.match(/\\u[0-9A-Fa-f]{4}|[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g)

const unescapeHex = (ch: string) =>
    String.fromCodePoint(Number.parseInt(ch.slice(2), 16))

const unescapeChar = (ch: string) =>
    ch.startsWith('\\u')
        ? unescapeHex(ch)
        : ch
