import * as ej from 'encoding-japanese'
import { isUnreserved, isSpace, isAscii, mapCode } from './utils'
import { codePoints, CharInfo, hex } from '../../utils'

const encodeEncoding = (encoding: ej.Encoding) =>
    (char: string) =>
        (char == null)
            ? char
            : ej.convert(ej.stringToCode(char), encoding, 'UNICODE')
                .map(mapCode)
                .join('')

const encodeChar = (space: string, enc: (char: string) => string) =>
    (info: CharInfo) =>
        isSpace(info.code)        ? space
        : isUnreserved(info.code) ? info.char
        : isAscii(info.code)      ? '%' + hex(info.code)
        : enc(info.char)

const encodingEucJp = encodeEncoding('EUCJP')
const encodingShiftJis = encodeEncoding('SJIS')
const encodingUtf8 = encodeEncoding('UTF8')

const rfc3986 = (enc: (char: string) => string) => encodeChar('%20', enc)
const rfc1866 = (enc: (char: string) => string) => encodeChar('+', enc)

const encodeString = (str: string, encode: (info: CharInfo) => string) =>
    (!str)
        ? str
        : codePoints(str).map(encode).join('')

export const encodeRfc1866EucJp = (str: string) => encodeString(str, rfc1866(encodingEucJp))
export const encodeRfc1866ShiftJis = (str: string) => encodeString(str, rfc1866(encodingShiftJis))
export const encodeRfc1866Utf8 = (str: string) => encodeString(str, rfc1866(encodingUtf8))

export const encodeRfc3986EucJp = (str: string) => encodeString(str, rfc3986(encodingEucJp))
export const encodeRfc3986ShiftJis = (str: string) => encodeString(str, rfc3986(encodingShiftJis))
export const encodeRfc3986Utf8 = (str: string) => encodeString(str, rfc3986(encodingUtf8))
