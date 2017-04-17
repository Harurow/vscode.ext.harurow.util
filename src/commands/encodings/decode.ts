import * as ej from 'encoding-japanese'
import { isUnreserved, isSpace, isAscii, mapCode } from './utils'
import { CharInfo, hex } from '../../utils'

export const decodeRfc1866EucJp = (str: string) => decodeString(rfc1866(str), encodingEucJp)
export const decodeRfc1866ShiftJis = (str: string) => decodeString(rfc1866(str), encodingShiftJis)
export const decodeRfc1866Utf8 = (str: string) => decodeString(rfc1866(str), encodingUtf8)

export const decodeRfc3986EucJp = (str: string) => decodeString(rfc3986(str), encodingEucJp)
export const decodeRfc3986ShiftJis = (str: string) => decodeString(rfc3986(str), encodingShiftJis)
export const decodeRfc3986Utf8 = (str: string) => decodeString(rfc3986(str), encodingUtf8)

const decodeEncoding = (encoding: ej.Encoding) =>
    (code: number[]) =>
        ej.codeToString(ej.convert(code, 'UNICODE', encoding))

const encodingEucJp = decodeEncoding('EUCJP')
const encodingShiftJis = decodeEncoding('SJIS')
const encodingUtf8 = decodeEncoding('UTF8')

const rfc1866 = (str: string) => str ? str.replace(/[+]/g, ' ') : str
const rfc3986 = (str: string) => str

const decodePercentEncode = (str: string) =>
    (str.length === 3 && str.startsWith('%'))
        ? String.fromCodePoint(Number.parseInt(str.substr(1), 16))
        : str

const percentEncodedChars = (str: string) =>
    str.match(/%[0-9a-fA-F]{2}|[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g)

const percentEncodedCodePoints = (str: string) =>
    percentEncodedChars(str)
        .map(char => decodePercentEncode(char))
        .map(char => <CharInfo>({
            char,
            code: char.codePointAt(0)
        }))

const decodeString = (str: string, dec: (code: number[]) => string) =>
    (!str)
        ? str
        : dec(percentEncodedCodePoints(str)
            .map(info => info.code))
