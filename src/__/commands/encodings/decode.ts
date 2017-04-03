import * as ej from 'encoding-japanese'
import { isUnreserved, isSpace, isAscii, mapCode } from './util'
import { percentEncodedCodePoints, CharInfo, hex } from '../../utils/string'

const encodeEncoding = (encoding: ej.Encoding) =>
    (char: string) =>
        (char == null)
            ? char
            : ej.convert(ej.stringToCode(char), encoding, 'UNICODE')
                .map(mapCode)
                .join('')

const decodeEncoding = (encoding: ej.Encoding) =>
    (code: number[]) =>
        ej.codeToString(ej.convert(code, 'UNICODE', encoding))

const encodingEucJp = decodeEncoding('EUCJP')
const encodingShiftJis = decodeEncoding('SJIS')
const encodingUtf8 = decodeEncoding('UTF8')

const rfc1866 = (str: string) =>
    str ? str.replace(/[+]/g, ' ') : str

const rfc3986 = (str: string) =>
    str

const decodeString = (str: string, dec: (code: number[]) => string) =>
    (!str)
        ? str
        : dec(percentEncodedCodePoints(str).map(info => info.code))

export const decodeRfc1866EucJp = (str: string) => decodeString(rfc1866(str), encodingEucJp)
export const decodeRfc1866ShiftJis = (str: string) => decodeString(rfc1866(str), encodingShiftJis)
export const decodeRfc1866Utf8 = (str: string) => decodeString(rfc1866(str), encodingUtf8)

export const decodeRfc3986EucJp = (str: string) => decodeString(rfc3986(str), encodingEucJp)
export const decodeRfc3986ShiftJis = (str: string) => decodeString(rfc3986(str), encodingShiftJis)
export const decodeRfc3986Utf8 = (str: string) => decodeString(rfc3986(str), encodingUtf8)
